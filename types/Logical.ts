export enum LOGICAL {
  AND,
  OR,
}
export interface Logical {
  /**
     * Results in the next call having a logical AND (&&) applied to the result of the last check.
     * @returns itself
     */
  and(): this;
  /**
     * Results in the next call having a logical OR (||) applied to the result of the last check.
     * @returns itself
     */
  or(): this;
}
