import { LOGICAL, Logical } from "../types/Logical.ts";
export default abstract class LogicalStack implements Logical {
  protected lastStackMatched: boolean;
  protected previousLogical: LOGICAL;

  constructor(lastStackMatched: boolean, previousLogical: LOGICAL) {
    this.lastStackMatched = lastStackMatched;
    this.previousLogical = previousLogical;
  }

  protected computeWithPrevious(onCurrent: boolean): boolean {
    switch (this.previousLogical) {
      case LOGICAL.AND:
        return this.lastStackMatched && onCurrent;
      case LOGICAL.OR:
        return this.lastStackMatched || onCurrent;
    }
  }

  /**
   * Results in the next call having a logical OR (||) applied to the result of the last check.
   * @returns itself
   */
  public and(): this {
    this.previousLogical = LOGICAL.AND;
    return this;
  }

  /**
   * Results in the next call having a logical AND (&&) applied to the result of the last check.
   * @returns itself
   */
  public or(): this {
    this.previousLogical = LOGICAL.OR;
    return this;
  }

    /**
     * Returns true or false based on the stack of calls.
     */
    public evaluate(): boolean {
        return this.lastStackMatched;
    }
}
