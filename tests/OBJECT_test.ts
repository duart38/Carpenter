import {
  assert,
  assertThrows,
  fail,
  assertEquals,
  assertArrayIncludes,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { OBJECT } from "../mod.ts";

Deno.test("Test OBJECT includesKey", () => {
  assertEquals(
    OBJECT({ name: "duart38" }).includesKey("name").evaluate(),
    true
  );
  assertEquals(OBJECT({ hey: "duart38" }).includesKey("hey").evaluate(), true);
  assertEquals(OBJECT({ x: "duart38" }).includesKey("dddd").evaluate(), false);
});

Deno.test("Test OBJECT keys", () => {
  assertEquals(
    OBJECT({ name: "duart38" }).keys().contains("name").evaluate(),
    true
  );
  assertEquals(
    OBJECT({ hey: "duart38" }).keys().contains("hey").evaluate(),
    true
  );
  assertEquals(
    OBJECT({ x: "duart38" }).keys().contains("dddd").evaluate(),
    false
  );
  [...OBJECT({ name: "duart38" }).keys().entries()];
  assertArrayIncludes(
    [...OBJECT({ name: "duart38", a: "a", b: "z" }).keys()],
    ["name", "a", "b"]
  );
});

Deno.test("Test OBJECT do 1", () => {
  let ran = false;
  OBJECT({ name: "x" })
    .includesKey("x")
    .do(() => {
      fail("incorrect clause");
    })
    .else(() => {
      assert("correct clause");
      ran = true;
    });
  if (!ran) fail("clauses not run");
});
Deno.test("Test OBJECT do 2", () => {
  let ran = false;
  OBJECT({ name: "x" })
    .includesKey("name")
    .do(() => {
      assert("correct clause");
      ran = true;
    })
    .else(() => {
      fail("incorrect clause");
    });
  if (!ran) fail("clauses not run");
});

Deno.test("Test OBJECT isFrozen", () => {
  let ran = false;
  let obj = { name: "x" };
  Object.freeze(obj);
  OBJECT(obj)
    .isFrozen()
    .do(() => {
      assert("correct clause");
      ran = true;
    })
    .else(() => {
      fail("incorrect clause");
    });
  if (!ran) fail("clauses not run");
});

Deno.test("Test OBJECT isFrozen", () => {
  let obj = { name: "x" };
  Object.freeze(obj);
  const t = OBJECT(obj).freeze();
  assertEquals(t.isFrozen().evaluate(), true);
});
