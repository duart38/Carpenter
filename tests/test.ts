import { assert, fail } from "https://deno.land/std@0.90.0/testing/asserts.ts";
import {OS} from "../mod.ts";

Deno.test("Runs on target request", () => {
    OS.on(Deno.build.os).do(()=>{
        assert(Deno.build.os);
    }).else(()=>{
        fail(`Calling else clause for os ${Deno.build.os} on request for ${Deno.build.os}`);
    })
});

Deno.test("Runs else clause", () => {
    const notThis = Deno.build.os == "darwin" ? "windows" : "darwin";
    OS.on(notThis).do(()=>{
        fail(`Calling do clause for os ${Deno.build.os} on request for ${notThis}`);
    }).else(()=>{
        assert("else clause.")
    })
});