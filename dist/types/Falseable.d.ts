export type Falseable<T> = T | false | null | undefined;
export declare function isFalseable<T extends Falseable<unknown>>(value: Falseable<T>): value is Falseable<never>;
