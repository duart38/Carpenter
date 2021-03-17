import {
  assert,
  fail,
  assertEquals,
  assertArrayIncludes,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { VALUE } from "../mod.ts";

Deno.test("Test VALUE instanceOf 1", () => {
  let ran = false;
  VALUE(new Number(2))
    .isInstanceOf(Number)
    .do(() => {
      assert("correct clause");
      ran = true;
    })
    .else(() => {
      fail("incorrect clause");
    });
  if (!ran) fail("no clauses ran");
});
Deno.test("Test VALUE instanceOf 2", () => {
  let ran = false;
  VALUE(new String("x"))
    .isInstanceOf(Number)
    .do(() => {
      fail("incorrect clause");
    })
    .else(() => {
      assert("correct clause");
      ran = true;
    });
  if (!ran) fail("no clauses ran");
});

Deno.test("Test VALUE isTypeOf", () => {
  VALUE("").isTypeOf("string").do(()=>{assert("string correct")}).else(()=>{fail("string incorrect")});
  VALUE(1).isTypeOf("number").do(()=>{assert("number correct")}).else(()=>{fail("number incorrect")});
  VALUE({}).isTypeOf("object").do(()=>{assert("object correct")}).else(()=>{fail("object incorrect")});
  VALUE(true).isTypeOf("boolean").do(()=>{assert("boolean correct")}).else(()=>{fail("boolean incorrect")});
});
