/* tslint:disable */
/* eslint-disable */
export function greet(): void;
export function init_local(): void;
/**
 * @param {any} data
 */
export function push_data(data: any): void;
export function start(): void;
export function continue_decoding(): void;
export function stop(): void;
/**
 * Return the codec configuration
 * The result is an array of 2 elements:
 * - The first element is the audio codec configuration
 * - The second element is the video codec configuration
 * @returns {any}
 */
export function get_codec(): any;
/**
 * Return the next data to be sent to the player
 * An array of 2 elements is returned:
 * - The first element is the media type (0: header, 1: video, 2: audio, 15: end of sequence)
 * - The second element is the payload
 * @returns {any}
 */
export function consume(): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly greet: () => void;
  readonly init_local: (a: number) => void;
  readonly push_data: (a: number, b: number) => void;
  readonly start: (a: number) => void;
  readonly continue_decoding: (a: number) => void;
  readonly stop: (a: number) => void;
  readonly get_codec: (a: number) => void;
  readonly consume: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
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
