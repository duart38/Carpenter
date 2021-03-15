import {
  assert,
  assertStringIncludes,
  fail,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { OS } from "../mod.ts";

Deno.test("Runs on target request", () => {
  OS.on(Deno.build.os)
    .do(() => {
      assert(Deno.build.os);
    })
    .else(() => {
      fail(
        `Calling else clause for os ${Deno.build.os} on request for ${Deno.build.os}`,
      );
    });
});

Deno.test("Runs else clause", () => {
  const notThis = Deno.build.os == "darwin" ? "windows" : "darwin";
  OS.on(notThis)
    .do(() => {
      fail(
        `Calling do clause for os ${Deno.build.os} on request for ${notThis}`,
      );
    })
    .else(() => {
      assert("else clause.");
    });
});

Deno.test("Runs on chaining request", () => {
  const notThis = Deno.build.os == "darwin" ? "windows" : "darwin";
  OS.on(notThis)
    .do(() =>
      fail("Target build is supposed to be windows but linux clause was run")
    )
    .on(Deno.build.os).do(() => assert("Chaining works.."))
    .else(() => fail("else clause ran on chaining of valid OS"));
});

Deno.test("Premature Else works", () => {
  const notThis = Deno.build.os == "darwin" ? "windows" : "darwin";
  let t;
  OS.on(notThis).else(() => {
    t = true;
    assert("Works");
  });
  if (!t) fail();
});

Deno.test("Multiple do clauses", () => {
  let str = "";
  OS.on(Deno.build.os)
    .do(() => str += "Hello ")
    .do(() => str += "world");
  assertStringIncludes(str, "Hello world");
});
