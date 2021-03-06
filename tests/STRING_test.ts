import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertStringIncludes,
  fail,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { STRING } from "../mod.ts";

Deno.test("STRING contains(string) partial", () => {
  let found = false;
  STRING("hello").contains("lo").do(() => {
    assert("found lo in hello");
    found = true;
  });
  if (!found) fail("lo not found in hello");
});
Deno.test("STRING contains(regex) partial", () => {
  let found = false;
  STRING("hello").contains(/lo/g).do(() => {
    assert("found lo in hello");
    found = true;
  });
  if (!found) fail("lo not found in hello");
});

Deno.test("STRING contains(string) else", () => {
  let found = false;
  STRING("test").contains(/lo/g).do(() => {})
    .else(() => {
      assert("found lo in hello");
      found = true;
    });
  if (!found) fail("lo not found in hello");
});

Deno.test("STRING contains(string) and/or simple", () => {
  let found = false;
  STRING("hello")
    .contains("h").and().contains("xx")
    .or().contains("hello")
    .do(() => {
      assert("Or clause works");
      found = true;
    });
  if (!found) fail("lo not found in hello");
});

Deno.test("STRING Multiple do clauses", () => {
  let str = "";
  STRING("x").contains("x")
    .do(() => str += "Hello ")
    .do(() => str += "world");
  assertStringIncludes(str, "Hello world");
});

Deno.test("STRING isOfSize test", () => {
  let found = false;
  STRING("hello").isOfSize(5)
    .do(() => {
      assert("size 5");
      found = true;
    });
  if (!found) fail("lo not found in hello");
});

Deno.test("STRING endsWith test", () => {
  let found = false;
  STRING("hello").endsWith("o")
    .do(() => {
      assert("ends with 'o'");
      found = true;
    });
  if (!found) fail("does not end with 'o'");
});

Deno.test("STRING startsWith test", () => {
  let found = false;
  STRING("hello").startsWith("h")
    .do(() => {
      assert("starts with 'h'");
      found = true;
    });
  if (!found) fail("does not starts with 'h'");
});

Deno.test("STRING adapt test", () => {
  const t = STRING("hello").adapt((prev: string) => prev += " world")
    .getValue();
  assertStringIncludes(t, "hello world");
});

Deno.test("STRING adapt via do() test", () => {
  const t = STRING("hello").contains("hello").do((prev: string) =>
    prev += " world"
  ).getValue();
  assertStringIncludes(t, "hello world");
});

Deno.test("STRING does not change if do method is not reached", () => {
  const t = STRING("hello")
    .contains("x")
    .do((prev: string) => prev += " world").getValue();
  assertStringIncludes(t, "hello");
});

Deno.test("STRING evaluates", () => {
  const t = STRING("hello")
    .contains("x").evaluate();

  assertEquals(t, false);
  assertEquals(STRING("hello").contains("he").evaluate(), true);
});

Deno.test("STRING split", () => {
  STRING("hello,world")
    .split(",").do((x) => {
      assertArrayIncludes(x, ["hello", "world"]);
    });
});
