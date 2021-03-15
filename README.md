# Carpenter

## How it looks
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