# Carpenter
Builder-like pattern applied for all things Deno.

## By example
### OS specific code
```JavaScript
import {OS} from "./mod.ts";

// basic
OS.on("darwin").do(()=>console.log("Hey Darwin"));
OS.on("darwin").do(()=>console.log("Hey Darwin")).else(()=>console.log("something else"));
// multiple clauses
let str = "";
OS.on("windows")
  .do(()=>str += "Hello ")
  .do(()=>str += "world");

// multiple clauses
let str = "";
OS.on("windows")
  .do(()=>str += "Hello ")
  .do(()=>str += "world");
```
---
### command line argument specific code
```JavaScript
import {ARGS} from "./mod.ts";

// basic usage
ARGS.on("-h")
    .do(() => some help code here)
    .else(() => -h was not found);

// multiple flags (evaluates when all flags are set)
ARGS.on("-x", "-a")
    .do(()=> console.log("flag -x and -a was found together"))
```
