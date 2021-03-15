
<center> 
<h1>Carpenter</h1>

![tests](https://img.shields.io/github/workflow/status/duart38/Carpenter/Test%20module?label=Tests&style=for-the-badge)
![license](https://img.shields.io/github/license/duart38/Carpenter?style=for-the-badge)
![version](https://img.shields.io/github/v/release/duart38/Carpenter?style=for-the-badge)

</center>
<center>

![documentation](https://img.shields.io/badge/docs-documentation-aqua?style=for-the-badge&url=https://doc.deno.land/https/deno.land/x/carpenter@v0.0.1/mod.ts)

</center>



-> ***[Documentation](https://doc.deno.land/https/deno.land/x/carpenter@v0.0.1/mod.ts)***

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
