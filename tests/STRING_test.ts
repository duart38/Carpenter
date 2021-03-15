import { assert, fail, assertStringIncludes } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { STRING } from "../mod.ts";

Deno.test("STRING contains(string) partial", () => {
    let found = false;
    STRING("hello").contains("lo").do(() => {
      assert("found lo in hello");
      found = true;
    });
    if(!found) fail("lo not found in hello");
});
Deno.test("STRING contains(regex) partial", () => {
    let found = false;
    STRING("hello").contains(/lo/g).do(() => {
      assert("found lo in hello");
      found = true;
    });
    if(!found) fail("lo not found in hello");
});

Deno.test("STRING contains(string) else", () => {
    let found = false;
    STRING("test").contains(/lo/g).do(() =>{})
    .else(()=>{
        assert("found lo in hello");
        found = true;
    });
    if(!found) fail("lo not found in hello");
});

Deno.test("STRING contains(string) and/or simple", () => {
    let found = false;
    STRING("hello")
    .contains("h").and().contains("xx")
    .or().contains("hello")
    .do(()=>{
        assert("Or clause works")
        found = true;
    })
    if(!found) fail("lo not found in hello");
});



Deno.test("STRING Multiple do clauses", () => {
    let str = "";
      STRING("x").contains("x")
        .do(()=>str += "Hello ")
        .do(()=>str += "world");
    assertStringIncludes(str, "Hello world");
});