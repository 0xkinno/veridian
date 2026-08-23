import { describe,expect,it } from "vitest"; import { calculateCoverage } from "./coverage";
describe("calculateCoverage",()=>{
 it("calculates percentage",()=>expect(calculateCoverage({total:4,proven:3,failed:1}).percentage).toBe(75));
 it("calculates unverified",()=>expect(calculateCoverage({total:8,proven:2,failed:1}).unverified).toBe(5));
 it("accounts for stale",()=>expect(calculateCoverage({total:8,proven:2,failed:1,stale:2}).unverified).toBe(3));
 it("handles zero",()=>expect(calculateCoverage({total:0,proven:0,failed:0}).percentage).toBe(0));
 it("clamps unverified",()=>expect(calculateCoverage({total:1,proven:2,failed:2}).unverified).toBe(0));
 it("defaults stale",()=>expect(calculateCoverage({total:1,proven:0,failed:0}).stale).toBe(0));
 it("preserves counts",()=>expect(calculateCoverage({total:4,proven:1,failed:2})).toMatchObject({total:4,proven:1,failed:2}));
 it("supports decimal precision",()=>expect(calculateCoverage({total:3,proven:1,failed:0}).percentage).toBe(33.3));
});
