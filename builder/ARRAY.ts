export class ARR<I> {
    private value: I[]
    constructor(val: I[]){
        this.value = val;
    }

    

}
export function ARRAY<I>(val: I[]): ARR<I>{
    return new ARR(val);
}