import type { Falseable } from "../types/Falseable";
export declare function isFalseable<T extends Falseable<unknown>>(value: Falseable<T>): value is Falseable<never>;
