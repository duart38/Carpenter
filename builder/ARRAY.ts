import { STR, STRING } from "../mod.ts";
import { WritableBuilder } from "../types/Builder.ts";
import { LOGICAL, Logical } from "../types/Logical.ts";

export class ARR<I> implements WritableBuilder<Array<I>, ARR<I>>, Logical {
  private value: I[];
  private lastStackMatched: boolean;
  private previousLogical: LOGICAL;
  constructor(val: I[]) {
    this.value = val;
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

  and(): this {
    this.previousLogical = LOGICAL.AND;
    return this;
  }

  or(): this {
    this.previousLogical = LOGICAL.OR;
    return this;
  }

  /**
     * Appends regardless of result of the previous chain items.
     * @param toAdd 
     */
  public append(...toAdd: I[]): this {
    this.value.push(...toAdd);
    return this;
  }

  /**
     * Appends only if the previous chain items result in a "true".
     * @param toAdd 
     */
  public thenAppend(...toAdd: I[]): this {
    if (this.lastStackMatched) this.value.push(...toAdd);
    return this;
  }

  /**
     * Checks if the current array length is of size 'n'
     * @param n 
     */
  public isOfSize(n: number): this {
    this.lastStackMatched = this.computeWithPrevious(this.value.length == n);
    return this;
  }

  /**
     * Checks if the array includes all the provided parameters.
     * @param toCheck 
     * @returns 
     */
  public contains(...toCheck: I[]): this {
    this.lastStackMatched = this.computeWithPrevious(
      toCheck.every((x) => this.value.includes(x)),
    );
    return this;
  }

  public entries(): IterableIterator<[number, I]>{
    return this.value.entries();
  }

  /**
   * Attempts to remove an element in the array if found.
   * @param element 
   */
  public remove(element: I): this {
    const t = this.value.findIndex((x)=>x === element)
    if(t != -1) this.value.splice(t, 1);
    return this;
  }

  /**
   * Modifies the array to be a section of itself.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start 
   * @param end 
   */
  public getSection(start: number, end: number): this {
    this.value = this.value.slice(start, end);
    return this;
  }

  /**
     * join the array together into a string
     * @param separator 
     * @returns a string carpenter
     * @see STR
     */
  public join(separator: string | undefined): STR {
    return STRING(this.value.join(separator));
  }

  public do(run: (currentValue: I[]) => void | I[]): this {
    if (this.lastStackMatched) {
      this.value = run(this.value) || this.value;
    }
    return this;
  }

  public else(run: (currentValue: I[]) => void | I[]): this {
    if (!this.lastStackMatched) {
      this.value = run(this.value) || this.value;
    }
    return this;
  }
}
export function ARRAY<I>(val: I[]): ARR<I> {
  return new ARR(val);
}
