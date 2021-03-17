import { STR, STRING } from "../mod.ts";
import { WritableBuilder } from "../types/Builder.ts";
import { LOGICAL } from "../types/Logical.ts";
import LogicalStack from "../types/LogicalStack.ts";
type predicate<K> = ((val: K, index?: number, arr?:K[])=>boolean);
type callBck<K> = ((val: K, index?: number, arr?:K[])=>K | any);

export class ARR<I> extends LogicalStack<ARR<I>>
  implements WritableBuilder<Array<I>, ARR<I>>, ArrayLike<I> {
  private value: I[];
  readonly [n: number]: I
  length: number;

  constructor(val: I[]) {
    super(true, LOGICAL.AND);
    this.value = val;
    this.length = val.length;
  }
  *[Symbol.iterator]() {
    for (const item of this.value) {
      yield item;
    }
  }
  /**
     * Appends regardless of result of the previous chain items.
     * @param toAdd 
     */
  public append(...toAdd: I[]): this {
    this.value.push(...toAdd);
    this.length = this.value.length;
    return this;
  }

  /**
     * Appends only if the previous chain items result in a "true".
     * @param toAdd 
     */
  public thenAppend(...toAdd: I[]): this {
    if (this.lastStackMatched) {
      this.value.push(...toAdd);
      this.length = this.value.length;
    }
    return this;
  }

  /**
   * Performs a filter on the inner value regardless if stack is true or false.
   * @param predicate 
   * @returns 
   */
  public filter(predicate: (val: I, index?: number, arr?:I[])=>boolean): this {
    this.value = this.value.filter(predicate);
    return this;
  }
    /**
   * Performs a filter if the previous chain items result in a "true".
   * @param predicate 
   * @returns 
   */
    public thenFilter(predicate: predicate<I>): this {
       if(this.lastStackMatched) this.filter(predicate);
      return this;
    }

    /**
     * Performs Map on the inner value regardless of conditions of previous calls.
     * @param predicate 
     * @returns 
     */
    public map(predicate: callBck<I>): this {
      this.value = this.value.map(predicate);
      return this;
    }
    /**
     * Performs map only if the previous calls result in a true value.
     * @param predicate 
     * @returns 
     */
    public thenMap(predicate: callBck<I>): this {
      if(this.lastStackMatched) this.map(predicate);
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

  public entries(): IterableIterator<[number, I]> {
    return this.value.entries();
  }

  /**
   * Attempts to remove an element in the array if found.
   * @param element 
   */
  public remove(element: I): this {
    const t = this.value.findIndex((x) => x === element);
    if (t != -1) {
      this.value.splice(t, 1);
      this.length = this.value.length;
    }
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
    this.length = this.value.length;
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
      this.length = this.value.length;
    }
    return this;
  }

  public else(run: (currentValue: I[]) => void | I[]): this {
    if (!this.lastStackMatched) {
      this.value = run(this.value) || this.value;
      this.length = this.value.length;
    }
    return this;
  }
}

/**
 * Helper method to initiate an ARRAY carpenter
 * @param value 
 * @returns 
 */
export function ARRAY<I>(val: I[]): ARR<I> {
  return new ARR(val);
}
