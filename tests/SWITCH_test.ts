import {
    assert,
    fail,
  } from "https://deno.land/std@0.90.0/testing/asserts.ts";
  import { SWITCH } from "../mod.ts";
  
Deno.test("Test switch case, do", () => {
    let t = "hello";
    let called = false;
    SWITCH(t)
        .case("x")
        .do(()=>{fail("Incorrect clause")})
        .case("hello")
        .do(()=>{
            assert("correct clause");
            called =  true;
        })
    if(!called) fail("nothing called");
});
Deno.test("Test switch default", () => {
    let t = "hello";
    let called = false;
    SWITCH(t)
        .case("x")
        .do(()=>{fail("Incorrect clause")})
        .case("a")
        .do(()=>{fail("Incorrect clause")})
        .default(()=>{
            assert("correct clause");
            called = true;
        });
        if(!called) fail("nothing called");
});
