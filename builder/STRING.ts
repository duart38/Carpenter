class STR {
    private value: string;
    private lastStackMatched;
    constructor(value: string){
        this.value = value;
        this.lastStackMatched = true;
    }

    /**
     * checks if the string includes a given.
     * @param match 
     * @returns 
     */
    public has(match: string | RegExp): this {
        if((typeof match == "string" && this.value.includes(match)) || (match instanceof RegExp && this.value.match(match))){
            this.lastStackMatched = true;
        }else{
            this.lastStackMatched = false;
        }
        return this;
    }

    /**
     * Executes run if the last check stack is true.
     * @example STRING("test").has("est").do((v)=>{...})
     * @param run 
     * @returns 
     */
    public do(run: (stored: string)=>void): this {
        if(this.lastStackMatched) run(this.value);
        return this;
    }

    /**
     * Executes run if the last check stack is false.
     * @example STRING("test").has("x").do((v)=>{...}).else(()=>{...})
     * @param run 
     * @returns 
     */
    public else(run: (stored: string)=>void): this {
        if(!this.lastStackMatched) run(this.value);
        return this;
    }
}
export const STRING = (value: string) => new STR(value);