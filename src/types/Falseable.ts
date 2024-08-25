export type Falseable<T> = T | false | null | undefined;

export function isFalseable<T extends Falseable<unknown>>(
  value: Falseable<T>,
): value is Falseable<never> {
  return value === false || value === undefined || value === null;
}
