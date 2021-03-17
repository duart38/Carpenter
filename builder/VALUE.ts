import { LOGICAL } from "../types/Logical.ts";
import { WritableBuilder } from "../types/Builder.ts";
import LogicalStack from "../types/LogicalStack.ts";
export class VAL extends LogicalStack<VAL> implements WritableBuilder<unknown, VAL> {
  private value: unknown;
  constructor(val: unknown) {
    super(true, LOGICAL.AND);
    this.value = val;
  }
  public do(run: (currentValue: unknown) => unknown): this {
    if (this.lastStackMatched) {
      const t = run(this.value);
      if (t) this.value = t;
    }
    return this;
  }
  public else(run: (currentValue: unknown) => unknown): this {
    if (!this.lastStackMatched) {
      const t = run(this.value);
      if (t) this.value = t;
    }
    return this;
  }

  /**
   * Checks if this objects value is an instance of the provided
   * @param c 
   * @returns 
   */
  public isInstanceOf(c: any): this {
    this.lastStackMatched = this.computeWithPrevious(this.value instanceof c);
    return this;
  }

}

/**
 * Helper method for VALUE
 * @param val 
 * @returns 
 */
export function VALUE(val: unknown): VAL {
  return new VAL(val);
}
