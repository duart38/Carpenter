import { assert, fail, assertStringIncludes } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { ARGS } from "../mod.ts";

// run these tests with -x as an argument (deno test -- -x)

Deno.test("Runs on target request", () => {
    let found = false;
    ARGS.on("-x").do(() => {
      assert("found -x");
      found = true;
    });
    if(!found) fail("-x not found");
});

Deno.test("Runs else clause", () => {
  ARGS.on("-notThere")
    .do(() => fail("incorrect clause"))
    .else(() => assert("else clause."));
});

Deno.test("Runs on chaining request", () => {
  ARGS.on("-notThere")
    .do(() =>fail("flag clause -notThere reached.."))
    .on("-x").do(() => assert("Chaining works.."))
    .else(()=>fail("else clause of correct flag reached"));
});

Deno.test("Premature Else works", () => {
      ARGS.on("-notThere").else(()=>assert("Works"))
});

Deno.test("Multiple do clauses", () => {
    let str = "";
      ARGS.on("-x")
        .do(()=>str += "Hello ")
        .do(()=>str += "world");
    assertStringIncludes(str, "Hello world");
});