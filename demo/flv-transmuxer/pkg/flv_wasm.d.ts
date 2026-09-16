/* tslint:disable */
/* eslint-disable */

export class FlvTransmuxer {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Bytes waiting for a complete tag.
     */
    buffered_bytes(): number;
    /**
     * Returns `{ audio, video }` MIME codec strings, or `undefined` for
     * tracks that are not configured yet.
     */
    codec_config(): any;
    /**
     * Returns the next packet as `[media_type, Uint8Array]`, or `undefined`
     * when no packet is ready.
     *
     * Media types: `0` initialization segment, `1` video, `2` audio,
     * `15` end of sequence.
     */
    consume(): any;
    /**
     * Flushes pending samples and emits the end of sequence packet.
     */
    finish(): void;
    /**
     * `true` once the initialization segment has been produced.
     */
    is_header_sent(): boolean;
    constructor();
    /**
     * Decodes and remuxes everything buffered so far.
     *
     * Partial tags stay in the buffer until the next `push_data` call.
     */
    process(): void;
    /**
     * Appends a chunk of FLV data.
     */
    push_data(data: Uint8Array): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_flvtransmuxer_free: (a: number, b: number) => void;
    readonly flvtransmuxer_buffered_bytes: (a: number) => number;
    readonly flvtransmuxer_codec_config: (a: number) => [number, number, number];
    readonly flvtransmuxer_consume: (a: number) => any;
    readonly flvtransmuxer_finish: (a: number) => [number, number];
    readonly flvtransmuxer_is_header_sent: (a: number) => number;
    readonly flvtransmuxer_new: () => number;
    readonly flvtransmuxer_process: (a: number) => [number, number];
    readonly flvtransmuxer_push_data: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
