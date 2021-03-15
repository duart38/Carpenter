export default interface Builder<I> {
  do: (run: () => void) => I;
  else: (run: () => void) => I;
}
