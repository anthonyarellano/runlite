export type RecursiveRecord<T> = {
  [key: string]: T | RecursiveRecord<T>;
};
