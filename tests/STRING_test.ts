import { assert, fail, assertStringIncludes } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { STRING } from "../mod.ts";

Deno.test("STRING has(string) partial", () => {
    let found = false;
    STRING("hello").has("lo").do(() => {
      assert("found lo in hello");
      found = true;
    });
    if(!found) fail("lo not found in hello");
});
Deno.test("STRING has(regex) partial", () => {
    let found = false;
    STRING("hello").has(/lo/g).do(() => {
      assert("found lo in hello");
      found = true;
    });
    if(!found) fail("lo not found in hello");
});

Deno.test("STRING has(string) else", () => {
    let found = false;
    STRING("test").has(/lo/g).do(() =>{})
    .else(()=>{
        assert("found lo in hello");
        found = true;
    });
    if(!found) fail("lo not found in hello");
});

// Deno.test("Runs else clause", () => {
//   ARGS.on("-notThere")
//     .do(() => fail("incorrect clause"))
//     .else(() => assert("else clause."));
// });

// Deno.test("Runs on chaining request", () => {
//   ARGS.on("-notThere")
//     .do(() =>fail("flag clause -notThere reached.."))
//     .on("-x").do(() => assert("Chaining works.."))
//     .else(()=>fail("else clause of correct flag reached"));
// });

// Deno.test("Premature Else works", () => {
//       ARGS.on("-notThere").else(()=>assert("Works"));
// });

// Deno.test("Multiple do clauses", () => {
//     let str = "";
//       ARGS.on("-x")
//         .do(()=>str += "Hello ")
//         .do(()=>str += "world");
//     assertStringIncludes(str, "Hello world");
// });

// Deno.test("Multiple do clauses", () => {
//   let t;
//     ARGS.on("-x", "-a")
//         .do(()=>{
//           t = true; 
//           assert("found -x and -a");
//         })
//   if(!t) fail("")
// });