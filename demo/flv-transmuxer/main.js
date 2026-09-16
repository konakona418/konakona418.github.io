import init, { FlvTransmuxer } from './pkg/flv_wasm.js';

const CHUNK_SIZE = 1 << 20;
const BATCH_SIZE = 1 << 20;
const END_OF_SEQUENCE = 15;

const fileInput = document.getElementById('file');
const downloadButton = document.getElementById('download');
const statusLabel = document.getElementById('status');
const player = document.getElementById('player');

let packets = [];

await init();

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0];
  if (file) {
    await run(file);
  }
});

downloadButton.addEventListener('click', () => downloadMp4());

async function run(file) {
  setStatus(`Reading ${file.name} …`);
  const transmuxer = new FlvTransmuxer();
  const bytes = new Uint8Array(await file.arrayBuffer());

  packets = [];
  for (let offset = 0; offset < bytes.length; offset += CHUNK_SIZE) {
    transmuxer.push_data(bytes.subarray(offset, offset + CHUNK_SIZE));
    transmuxer.process();
    drain(transmuxer);
    setStatus(
      `Transmuxing ${Math.min(offset + CHUNK_SIZE, bytes.length)} / ${bytes.length} bytes, ` +
        `${packets.length} packets produced`,
    );
    await nextFrame();
  }

  transmuxer.finish();
  drain(transmuxer);

  const codec = transmuxer.codec_config();
  const codecs = [codec.video, codec.audio].filter(Boolean).join(', ');
  downloadButton.disabled = packets.length === 0;
  setStatus(`Done: ${packets.length} packets, codecs="${codecs}"`);

  await play(codecs);
}

function drain(transmuxer) {
  for (;;) {
    const packet = transmuxer.consume();
    if (packet === undefined) {
      return;
    }
    packets.push({ type: packet[0], data: packet[1] });
  }
}

async function play(codecs) {
  if (!('MediaSource' in window) || codecs.length === 0) {
    setStatus('MSE is not available here; use "Download MP4" instead.');
    return;
  }

  const mediaSource = new MediaSource();
  player.src = URL.createObjectURL(mediaSource);
  await new Promise((resolve) =>
    mediaSource.addEventListener('sourceopen', resolve, { once: true }),
  );

  const sourceBuffer = mediaSource.addSourceBuffer(
    `video/mp4; codecs="${codecs}"`,
  );
  sourceBuffer.mode = 'segments';

  const queue = packets.slice();
  const pump = () => {
    if (sourceBuffer.updating || queue.length === 0) {
      return;
    }

    const packet = queue.shift();
    if (packet.type === END_OF_SEQUENCE) {
      if (mediaSource.readyState === 'open') {
        mediaSource.endOfStream();
      }
      return;
    }

    const chunks = [packet.data];
    let size = packet.data.length;
    while (
      queue.length > 0 &&
      queue[0].type === packet.type &&
      size < BATCH_SIZE
    ) {
      const next = queue.shift();
      chunks.push(next.data);
      size += next.data.length;
    }

    sourceBuffer.appendBuffer(concat(chunks, size));
  };

  sourceBuffer.addEventListener('updateend', pump);
  pump();
  player.play().catch(() => {});
}

function downloadMp4() {
  const chunks = packets
    .filter((packet) => packet.type !== END_OF_SEQUENCE)
    .map((packet) => packet.data);
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const url = URL.createObjectURL(
    new Blob([concat(chunks, total)], { type: 'video/mp4' }),
  );

  const link = document.createElement('a');
  link.href = url;
  link.download = 'output.mp4';
  link.click();
  URL.revokeObjectURL(url);
}

function concat(chunks, total) {
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged;
}

function setStatus(message) {
  statusLabel.textContent = message;
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}
