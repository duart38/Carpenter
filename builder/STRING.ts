enum LOGICAL {
    AND, OR
}
class STR {
    private value: string;
    private lastStackMatched;
    private previousLogical: LOGICAL; 

    constructor(value: string){
        this.value = value;
        this.lastStackMatched = true;
        this.previousLogical = LOGICAL.AND
    }

    private computeWithPrevious(onCurrent: boolean): boolean{
        switch(this.previousLogical){
            case LOGICAL.AND: return this.lastStackMatched && onCurrent;
            case LOGICAL.OR:  return this.lastStackMatched || onCurrent;
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
            ) ? true : false
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
     * Executes run if the last check stack is true.
     * @example STRING("test").contains("est").do((v)=>{...})
     * @param run 
     * @returns 
     */
    public do(run: (stored: string)=>void): this {
        if(this.lastStackMatched) run(this.value);
        return this;
    }

    /**
     * Executes run if the last check stack is false.
     * @example STRING("test").contains("x").do((v)=>{...}).else(()=>{...})
     * @param run 
     * @returns 
     */
    public else(run: (stored: string)=>void): this {
        if(!this.lastStackMatched) run(this.value);
        return this;
    }
}
export const STRING = (value: string) => new STR(value);