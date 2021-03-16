/**
 * Switch statement carpenter
 */
export class SWTC<I> {
    private value: I;
    private lastStackMatched: boolean;
    private everMatched: boolean;
    constructor(onValue: I){
        this.value = onValue;
        this.lastStackMatched = true;
        this.everMatched = false;
    }

    public case(val: I): this{
        this.lastStackMatched = val === this.value;
        if(this.lastStackMatched) this.everMatched = true;
        return this;
    }
    public do(run :()=>void): this{
        if(this.lastStackMatched) run();
        return this;
    }
    public default(run: ()=>void){
        if(!this.everMatched) run();
    }
}
/**
 * Helper method to create SWITCH statement carpenter
 * @param onValue 
 * @returns 
 */
export function SWITCH<I>(onValue: I): SWTC<I>{
    return new SWTC<I>(onValue);
}