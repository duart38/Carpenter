import type Builder from "../types/Builder.ts";
/**
 * Deno command line argument specific code builder.
 * @example ARGS.on("-x")
 *              .do(()=>console.log("-x"))
 *              .else(()=>console.log("-x not found"));
 */
export class ARGS implements Builder<ARGS> {
  private args: string[];
  private includesAll: boolean;
  private constructor(args: string[]) {
    this.args = args;
    this.includesAll = this.args.every((arg) => Deno.args.includes(arg));
  }

  /**
     * runs a function when all arguments provided are set
     * @example ARGS.on("-x")
     *              .do(()=>console.log("-x"))
     *              .else(()=>console.log("-x not found"));
     * @param run function to run
     * @returns this
     */
  public do(run: () => void): this {
    if (this.includesAll) run();
    return this;
  }

  /**
     * runs a function when one or more arguments provided are NOT set
     * @example ARGS.on("-x")
     *              .do(()=>console.log("-x"))
     *              .else(()=>console.log("-x not found"));
     * @param run function to run
     * @returns this
     */
  public else(run: () => void): this {
    if (!this.includesAll) run();
    return this;
  }

  /**
     * Helper method to facilitate declarative chaining
     * @example ARGS.on("-x")
     *               .do(()=>console.log("-x code"))
     *              .on("-a")
     *               .do(()=>console.log("-a code"));
     * @param name 
     * @returns new instance of ARGS
     */
  public on(...argument: string[]): ARGS {
    return new ARGS(argument);
  }

  /**
     * Helper method to start chaining
     * @example ARGS.on("-x")
     *              .do(()=>console.log("-x code"))
     * @param name 
     * @returns new instance of ARGS
     */
  static on(...argument: string[]): ARGS {
    return new ARGS(argument);
  }
}
