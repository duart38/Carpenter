import { ARR, ARRAY } from "../mod.ts";
import { WritableBuilder } from "../types/Builder.ts";
import { LOGICAL, Logical } from "../types/Logical.ts";
export class STR implements WritableBuilder<string, STR>, Logical {
  private value: string;
  private lastStackMatched;
  private previousLogical: LOGICAL;

  constructor(value: string) {
    this.value = value;
    this.lastStackMatched = true;
    this.previousLogical = LOGICAL.AND;
  }

  private computeWithPrevious(onCurrent: boolean): boolean {
    switch (this.previousLogical) {
      case LOGICAL.AND:
        return this.lastStackMatched && onCurrent;
      case LOGICAL.OR:
        return this.lastStackMatched || onCurrent;
    }
  }

  /**
     * checks if the string contains the given parameter.
     * @example STRING("hey").contains("h").do(...)
     * @param match 
     * @returns 
     */
  public contains(match: string | RegExp): this {
    this.lastStackMatched = this.computeWithPrevious(
      (
          (typeof match == "string" && this.value.includes(match)) ||
          (match instanceof RegExp && this.value.match(match))
        )
        ? true
        : false,
    );
    return this;
  }

  /**
     * Checks if a string is of a given size
     * @param size 
     * @returns 
     */
  public isOfSize(size: number): this {
    this.lastStackMatched = this.computeWithPrevious(this.value.length == size);
    return this;
  }

  public endsWith(value: string): this {
    this.lastStackMatched = this.computeWithPrevious(
      this.value.endsWith(value),
    );
    return this;
  }

  public startsWith(value: string): this {
    this.lastStackMatched = this.computeWithPrevious(
      this.value.startsWith(value),
    );
    return this;
  }

  /**
   * Splits the string into an array carpenter.
   * @param separator 
   * @param limit 
   * @returns ARR<string>
   * @see ARR
   */
  public split(
    separator: string | RegExp,
    limit?: number | undefined,
  ): ARR<string> {
    return ARRAY(this.value.split(separator, limit));
  }

  /**
     * Returns this objects value.
     */
  public getValue(): string {
    return this.value;
  }

  /**
     * Returns true or false based on the stack of calls.
     */
  public evaluate(): boolean {
    return this.lastStackMatched;
  }

  /**
     * Results in the next call having a logical AND (&&) applied to the result of the last check.
     * @returns itself
     */
  public and(): this {
    this.previousLogical = LOGICAL.AND;
    return this;
  }

  /**
     * Results in the next call having a logical OR (||) applied to the result of the last check.
     * @returns itself
     */
  public or(): this {
    this.previousLogical = LOGICAL.OR;
    return this;
  }

  /**
     * Executes run if the last check stack is true. updated the stored string if the method returns a string.
     * Unlike adapt ( @see adapt ), this method will update the string based on the conditions specified before it
     * @example STRING("test").contains("est").do((v)=>{...})
     * @param run 
     * @returns 
     */
  public do(run: (stored: string) => void | string): this {
    if (this.lastStackMatched) {
      const t = run(this.value);
      if (t) this.value = t;
    }
    return this;
  }

  /**
   * Adapts the internal string into whatever the provided method returns.
   * Unlike the do method, this method will always run regardless of the evaluation before it.
   * @param run {(prev: string)=>string} method that adapts the string
   */
  public adapt(run: (prev: string) => string): this {
    this.value = run(this.value);
    return this;
  }

  /**
     * Executes run if the last check stack is false. if the method returns a value it adapts the current string.
     * @example STRING("test").contains("x").do((v)=>{...}).else(()=>{...})
     * @param run 
     * @returns 
     */
  public else(run: (stored: string) => void | string): this {
    if (!this.lastStackMatched) {
      const t = run(this.value);
      if (t) this.value = t;
    }
    return this;
  }
}
/**
 * Helper method to initiate a STRING carpenter
 * @param value 
 * @returns 
 */
export function STRING(value: string): STR {return new STR(value)}
