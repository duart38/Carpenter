import {
    assert,
    assertStringIncludes,
    fail,
    assertArrayIncludes
  } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { ARRAY } from "../mod.ts";

Deno.test("Test array append()", () => {
    let called = false;
    ARRAY(["hello"]).append("world").do((cv)=>{
        assertArrayIncludes(cv, ["hello", "world"]);
        called = true;
    });
    if(!called) fail("do clause was not called");
});

Deno.test("Test array thenAppend()", () => {
    let called = false;
    ARRAY(["hello"]).isOfSize(0).thenAppend("world")
    .do((cv)=>{
        if(cv.includes("world")) fail("appending while stack if falsy");
        
    }).else(()=>{called = true});
    if(!called) fail("else clause was not called");
    called = false;

    ARRAY(["hello"]).isOfSize(1).thenAppend("world")
    .do((cv)=>{
        called = true;
        assertArrayIncludes(cv, ["hello", "world"]);
    }).else(()=>{fail("else clause catch running")});
    if(!called) fail("else clause was not called");
});