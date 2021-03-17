import { LOGICAL } from "../types/Logical.ts";
import { WritableBuilder } from "../types/Builder.ts";
import {ARRAY, ARR} from "../mod.ts";
import LogicalStack from "../types/LogicalStack.ts";
export class OBJ extends LogicalStack<OBJ> implements WritableBuilder<Record<string, unknown>, OBJ> {
    private value: Record<string, unknown>
    constructor(value: Record<string, unknown>) {
        super(true, LOGICAL.AND)
        this.value = value;
    }
    
    public do(run: (currentValue: Record<string,unknown>) => void | Record<string,unknown>){
        if (this.lastStackMatched) {
            this.value = run(this.value) || this.value;
        }
        return this;
    }
    public else(run: (currentValue: Record<string,unknown>) => void | Record<string,unknown>){
        if (!this.lastStackMatched) {
            this.value = run(this.value) || this.value;
        }
        return this;
    }

    /**
     * Gets keys at the first level of this object.
     * @returns ARR<string>
     * @see ARR
     */
    public keys(): ARR<string>{
        return ARRAY(Object.keys(this.value));
    }
    
    public isFrozen(): this{
        this.lastStackMatched = this.computeWithPrevious(Object.isFrozen(this.value));
        return this;
    }

    /**
     * Prevents further changes on this object
     * @returns 
     */
    public freeze(): this {
        Object.freeze(this.value);
        return this;
    }

    public includesKey(key: string): this{
        this.lastStackMatched = this.computeWithPrevious(Object.keys(this.value).includes(key));
        return this;
    }
    
}

/**
 * Helper method to create an OBJECT carpenter.
 * @param val 
 * @returns 
 */
export function OBJECT(val: Record<string, unknown>){
    return new OBJ(val);
}
