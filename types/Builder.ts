export interface Builder<I> {
  do: (run: () => void) => I;
  else: (run: () => void) => I;
}

export interface WritableBuilder<A, B> {
  do: (run: (currentValue: A) => void | A) => B;
  else: (run: (currentValue: A) => void | A) => B;
}
