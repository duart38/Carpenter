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

Deno.test("STRING has(string) and/or simple", () => {
    let found = false;
    STRING("hello")
    .has("h").and().has("xx")
    .or().has("hello")
    .do(()=>{
        assert("Or clause works")
        found = true;
    })
    if(!found) fail("lo not found in hello");
});



Deno.test("STRING Multiple do clauses", () => {
    let str = "";
      STRING("x").has("x")
        .do(()=>str += "Hello ")
        .do(()=>str += "world");
    assertStringIncludes(str, "Hello world");
});