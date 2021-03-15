export class ARGS {
    private args: string[];
    private includesAll: boolean;
    private constructor(args: string[]){
        this.args = args;
        this.includesAll = this.args.every((arg)=>Deno.args.includes(arg));
    }
    
    public do(run: ()=>void): this {
        if(this.includesAll) run();
        return this;
    }

    public else(run: ()=>void): this {
        if(!this.includesAll) run();
        return this;
    }

    public on(...argument: string[]): ARGS {
        return new ARGS(argument);
    }

    static on(...argument: string[]): ARGS{
        return new ARGS(argument);
    }
}