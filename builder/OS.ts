type OSName = "darwin" | "linux" | "windows";

/**
 * Deno operating system specific code builder.
 * @example OS.on("darwin")
 *            .do(()=>console.log("mac"))
 *            .else(()=>console.log("not mac"));
 */
export class OS {
    private name: OSName;
    private isOS: boolean;
    private constructor(name: OSName){
        this.name = name;
        this.isOS = Deno.build.os == this.name;
    }

    /**
     * Do something when the OS name is equals to the last provided name @see on
     * @example OS.on("darwin").do(()=>console.log("mac"));
     * @param run the function to run
     * @returns this
     */
    public do(run: ()=>void): this {
        if(this.isOS) run();
        return this;
    }

    /**
     * Do something when the OS name is NOT equals to the last provided name @see on
     * @example OS.on("darwin")
     *            .do(()=>console.log("mac"))
     *            .else(()=>console.log("not mac"));
     * @param run 
     * @returns this
     */
    public else(run: ()=>void): this {
        if(!this.isOS) run();
        return this;
    }

    /**
     * Updates the working OS name for further chain links.
     * @example OS.on("darwin")
     *             .do(()=>console.log("mac code"))
     *            .on("windows")
     *             .do(()=>console.log("windows code"));
     * @param name 
     * @returns new instance of OS
     */
    public on(name: OSName): OS {
        return new OS(name);
    }

    /**
     * Initializes the builder.
     * @example OS.on("darwin")
     * @param name name of the operating system to check against
     * @returns this
     */
    static on(name: OSName): OS {
        return new OS(name);
    }
}