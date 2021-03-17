import {
    assert,
    assertStringIncludes,
    fail,
    assertEquals,
    assertArrayIncludes
} from "https://deno.land/std@0.90.0/testing/asserts.ts";
import { OBJECT } from "../mod.ts";




Deno.test("Test OBJECT includesKey", () => {
    assertEquals(OBJECT({"name": "duart38"}).includesKey("name").evaluate(), true);
    assertEquals(OBJECT({"hey": "duart38"}).includesKey("hey").evaluate(), true);
    assertEquals(OBJECT({"x": "duart38"}).includesKey("dddd").evaluate(), false);
});

Deno.test("Test OBJECT keys", () => {
    assertEquals(OBJECT({"name": "duart38"}).keys().contains("name").evaluate(), true);
    assertEquals(OBJECT({"hey": "duart38"}).keys().contains("hey").evaluate(), true);
    assertEquals(OBJECT({"x": "duart38"}).keys().contains("dddd").evaluate(), false);
    [...OBJECT({"name": "duart38"}).keys().entries()]
    assertArrayIncludes([...OBJECT({"name": "duart38", "a":"a", "b": "z"}).keys()], ["name", "a", "b"])
});