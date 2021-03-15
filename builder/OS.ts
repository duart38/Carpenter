type OSName = "darwin" | "linux" | "windows";
export class OS {
    private name: OSName;
    private isOS: boolean;
    private constructor(name: OSName){
        this.name = name;
        this.isOS = Deno.build.os == this.name;
    }

    public do(run: ()=>void): this {
        if(this.isOS) run();
        return this;
    }

    public else(run: ()=>void): this {
        if(!this.isOS) run();
        return this;
    }

    static on(name: OSName): OS {
        return new OS(name);
    }
}