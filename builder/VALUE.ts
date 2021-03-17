import { LOGICAL } from "../types/Logical.ts";
import { WritableBuilder } from "../types/Builder.ts";
import LogicalStack from "../types/LogicalStack.ts";
export class VAL extends LogicalStack implements WritableBuilder<unknown, VAL> {
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
}

export function VALUE(val: unknown) {}
