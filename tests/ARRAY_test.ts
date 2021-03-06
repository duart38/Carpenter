import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertNotEquals,
  assertStringIncludes,
  fail,
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { ARRAY } from "../mod.ts";


Deno.test("Test array filter", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filter((x)=>x == 1).do((arr)=>{
    assertEquals(arr[0], 1);
    called = true;
  })
  if (!called) fail("clause was never called");
});
Deno.test("Test array thenFilter", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .isOfSize(0)
  .thenFilter((x)=>{fail("incorrect clause"); return false})
  .or()
  .isOfSize(10)
  .thenFilter((x)=>x == 1).do((arr)=>{
    assertEquals(arr[0], 1);
    assertEquals(arr.length, 1);
    called = true;
  })
  if (!called) fail("clause was never called");
});

Deno.test("Test array append()", () => {
  let called = false;
  ARRAY(["hello"]).append("world").do((cv) => {
    assertArrayIncludes(cv, ["hello", "world"]);
    called = true;
  });
  if (!called) fail("do clause was not called");
});

Deno.test("Test array thenAppend()", () => {
  let called = false;
  ARRAY(["hello"]).isOfSize(0).thenAppend("world")
    .do((cv) => {
      if (cv.includes("world")) fail("appending while stack if falsy");
    }).else(() => {
      called = true;
    });
  if (!called) fail("else clause was not called");
  called = false;

  ARRAY(["hello"]).isOfSize(1).thenAppend("world")
    .do((cv) => {
      called = true;
      assertArrayIncludes(cv, ["hello", "world"]);
    }).else(() => {
      fail("else clause catch running");
    });
  if (!called) fail("else clause was not called");
});

Deno.test("Test array logical AND", () => {
  let called = false;
  ARRAY(["hello"]).isOfSize(100).and().isOfSize(1)
    .else(() => {
      called = true;
      assert("correct clause");
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array logical OR", () => {
  let called = false;
  ARRAY(["hello"]).isOfSize(100).or().isOfSize(1)
    .do(() => {
      called = true;
      assert("correct clause");
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array contains", () => {
  let called = false;
  ARRAY(["hello", "world", "how are you"])
    .contains("world", "world").and().contains("how are you")
    .do(() => {
      called = true;
      assert("correct clause");
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array do modification", () => {
  let called = false;
  ARRAY(["hello", "world", "how are you"])
    .contains("world", "world").and().contains("how are you")
    .do((currentValue: string[]) => {
      return [...currentValue, "X"];
    }).do((x) => {
      called = true;
      assertArrayIncludes(x, ["X"]);
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array do skip", () => {
  let called = false;
  ARRAY(["hello", "world", "how are you"])
    .contains("x")
    .do(() => {
      fail("result should be false");
    })
    .else(() => {
      called = true;
      assert("correct clause");
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array join", () => {
  let called = false;
  ARRAY(["hello", "world", "how are you"])
    .join(" ")
    .do((x) => {
      called = true;
      assertStringIncludes(x, "hello world how are you");
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array chaining", () => {
  let called = false;
  ARRAY(["hello"]).contains("hello")
    .do((x) => {
      called = true;
      assertArrayIncludes(x, ["hello"]);
    })
    .else(() => {
      fail("incorrect inner clause");
    })
    .append("world").contains("world").do((x) => {
      assertArrayIncludes(x, ["world"]);
    });
  if (!called) fail("incorrect clause");
});

Deno.test("Test array entries", () => {
  // merely runs the internal entries. no need for testing
  ARRAY(["hello"]).entries();
});
Deno.test("Test array remove", () => {
  let called = false;
  ARRAY(["hello", "world"]).remove("world").do((x) => {
    assertArrayIncludes(x, ["hello"]);
    called = true;
  });

  ARRAY(["hello", "world"]).remove("x").do((x) => {
    assertArrayIncludes(x, ["hello", "world"]);
    called = true;
  });
  if (!called) fail("clause was never called");
});
Deno.test("Test array getSection", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).getSection(0, 3).do((x) => {
    assertEquals(x.length, 3);
    assertEquals(x[0], 1);
    assertNotEquals(x, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    called = true;
  });
  if (!called) fail("clause was never called");
});

Deno.test("Test array map", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((x, i, a)=>{
    return x * 10;
  }).do((arr)=>{
    assertEquals(arr[0], 10);
    called = true;
  })
  if (!called) fail("clause was never called");
});

Deno.test("Test array thenMap true", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).thenMap((x, i, a)=>{
    return x * 10;
  }).do((arr)=>{
    assertEquals(arr[0], 10);
    called = true;
  })
  if (!called) fail("clause was never called");
});
Deno.test("Test array thenMap false", () => {
  let called = false;
  ARRAY([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .isOfSize(1)
  .thenMap((x)=>{
    return x * 10;
  }).else((arr)=>{
    assertEquals(arr[0], 1);
    called = true;
  })
  if (!called) fail("clause was never called");
});