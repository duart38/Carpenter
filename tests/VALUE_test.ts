import {
  assert,
  fail,
  assertEquals,
  assertArrayIncludes,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { VALUE } from "../mod.ts";

Deno.test("Test VALUE instanceOf 1", () => {
  let ran = false;
  VALUE(new Number(2)).isInstanceOf(Number).do(()=>{
      assert("correct clause")
      ran = true
  }).else(()=>{
      fail("incorrect clause")
  });
  if(!ran) fail("no clauses ran")
});
Deno.test("Test VALUE instanceOf 2", () => {
    let ran = false;
    VALUE(new String("x")).isInstanceOf(Number).do(()=>{
        fail("incorrect clause");
    }).else(()=>{
        assert("correct clause")
        ran = true
    });
    if(!ran) fail("no clauses ran")
  });