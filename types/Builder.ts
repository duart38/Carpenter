export interface Builder<I> {
  do: (run: () => void) => I;
  else: (run: () => void) => I;
}

export interface WritableBuilder<A, B> {
  do: (run: () => void | A) => B;
  else: (run: () => void | A) => B;
}
