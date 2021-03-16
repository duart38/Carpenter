import {WritableBuilder} from "../types/Builder.ts";
import {LOGICAL, Logical} from "../types/Logical.ts";

export class ARR<I> implements WritableBuilder<Array<I>, ARR<I>>, Logical{
    private value: I[]
    private lastStackMatched: boolean;
    private previousLogical: LOGICAL;
    constructor(val: I[]){
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
    public append(...toAdd: I[]): this{
        this.value.push(...toAdd);
        return this;
    }

    /**
     * Appends only if the previous chain items result in a "true".
     * @param toAdd 
     */
    public thenAppend(...toAdd: I[]): this{
        if(this.lastStackMatched) this.value.push(...toAdd);
        return this;
    }

    /**
     * Checks if the current array length is of size 'n'
     * @param n 
     */
    public isOfSize(n: number): this{
        this.lastStackMatched = this.computeWithPrevious(this.value.length == n);
        return this;
    }

    /**
     * Checks if the array includes all the provided parameters.
     * @param toCheck 
     * @returns 
     */
    public contains(...toCheck: I[]): this{
        this.lastStackMatched = this.computeWithPrevious(toCheck.every((x)=> this.value.includes(x)));
        return this;
    }

    public do(run: (currentValue: I[]) => void|I[]): this{
        if(this.lastStackMatched){
            this.value = run(this.value) || this.value;
        }
        return this;
    }

    public else(run: (currentValue: I[]) => void|I[]): this{
        if(!this.lastStackMatched){
            this.value = run(this.value) || this.value;
        }
        return this;
    }
    

}
export function ARRAY<I>(val: I[]): ARR<I>{
    return new ARR(val);
}