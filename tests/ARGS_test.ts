import { assert, fail, assertStringIncludes } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { ARGS } from "../mod.ts";

// run these tests with -x and -a as an argument (deno test -- -x -a)

Deno.test("Runs on -x supplied", () => {
    let found = false;
    ARGS.on("-x").do(() => {
      assert("found -x");
      found = true;
    });
    if(!found) fail("-x not found");
});

Deno.test("Runs else clause when flag not available", () => {
  ARGS.on("-notThere")
    .do(() => fail("incorrect clause"))
    .else(() => assert("else clause."));
});

Deno.test("Runs second item in chain", () => {
  ARGS.on("-notThere")
    .do(() =>fail("flag clause -notThere reached.."))
    .on("-x").do(() => assert("Chaining works.."))
    .else(()=>fail("else clause of correct flag reached"));
});

Deno.test("Premature Else on non existent flag works", () => {
      ARGS.on("-notThere").else(()=>assert("Works"));
});

Deno.test("Multiple do clauses for -x flag", () => {
    let str = "";
      ARGS.on("-x")
        .do(()=>str += "Hello ")
        .do(()=>str += "world");
    assertStringIncludes(str, "Hello world");
});

Deno.test("Unions of flags both supplied", () => {
  let t;
    ARGS.on("-x", "-a")
        .do(()=>{
          t = true; 
          assert("found -x and -a");
        })
  if(!t) fail("")
});

Deno.test("Unions of flags only one supplied", () => {
  let t;
    ARGS.on("-x", "-notThere")
        .do(()=>{})
        .else(()=>{
          t = true; 
          assert("found -x and -a");
        })
  if(!t) fail("")
});