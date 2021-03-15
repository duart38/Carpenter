<h1 align="center">Carpenter 🛠</h1>
<p align="center">

<img src="https://img.shields.io/github/workflow/status/duart38/Carpenter/Test%20module?label=Tests&style=for-the-badge" />
  <img src="https://img.shields.io/github/license/duart38/Carpenter?color=yellow&style=for-the-badge" />
  <img src="https://img.shields.io/github/v/release/duart38/Carpenter?style=for-the-badge" />

</p>

<a align="center" href="https://doc.deno.land/https/deno.land/x/carpenter/mod.ts">

Documentation

</a>

## Road 🗺
- [x] Add ARGS (deno.args) carpenter
- [x] Add OS (deno.build) carpenter
- [x] Add STRING carpenter
- [ ] Add ARRAY carpenter
- [ ] Add OBJECT carpenter
- [ ] Add more options to STRING carpenter

## By example

### OS specific code

```JavaScript
import { OS } from "./mod.ts";

// basic
OS.on("darwin").do(() => console.log("Hey Darwin"));
OS.on("darwin").do(() => console.log("Hey Darwin")).else(() =>
  console.log("something else")
);
// multiple clauses
let str = "";
OS.on("windows")
  .do(() => str += "Hello ")
  .do(() => str += "world");

// multiple clauses
let str = "";
OS.on("windows")
  .do(() => str += "Hello ")
  .do(() => str += "world");
```

---

### Command line argument specific code

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

### Other types

```JavaScript
import { STRING } from "./mod.ts";

STRING("hello")
  .contains("hello").and().contains("x") // false
  .or().isOfSize(5) // true
  .do(() => console.log("OH WOW!!!!")) // true because of OR operator

STRING("hello")
  .adapt((prev: string)=>prev += " world") // adapts the string.. you may continue with chaining after this
  .getValue(); // gets the current object value.

```
