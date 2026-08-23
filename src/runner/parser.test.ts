import { describe,expect,it } from "vitest"; import { parseKaneNdjson } from "./parser";
describe("parseKaneNdjson",()=>{
 it("parses pass",()=>expect(parseKaneNdjson('{"type":"run_end","status":"passed"}').verdict).toBe("PASS"));
 it("parses testmd pass",()=>expect(parseKaneNdjson('{"type":"test_md_done","overall_status":"passed"}').verdict).toBe("PASS"));
 it("parses fail",()=>expect(parseKaneNdjson('{"type":"run_end","status":"failed"}').verdict).toBe("FAIL"));
 it("keeps infra errors separate",()=>expect(parseKaneNdjson('{"type":"error"}\n{"type":"run_end","status":"failed"}').verdict).toBe("VERIFIER_ERROR"));
 it("marks missing terminal inconclusive",()=>expect(parseKaneNdjson('{"step":1,"status":"passed"}').verdict).toBe("INCONCLUSIVE"));
 it("ignores prose",()=>expect(parseKaneNdjson('noise\n{"type":"run_end","status":"passed"}').verdict).toBe("PASS"));
 it("extracts summary",()=>expect(parseKaneNdjson('{"type":"run_end","status":"passed","summary":"ok"}').summary).toBe("ok"));
 it("extracts dashboard url",()=>expect(parseKaneNdjson('{"type":"run_end","status":"passed","test_url":"https://example.test"}').testUrl).toBe("https://example.test"));
 it("extracts share url",()=>expect(parseKaneNdjson('{"type":"test_md_done","overall_status":"passed","share_url":"https://example.test"}').testUrl).toBe("https://example.test"));
 it("sums credits",()=>expect(parseKaneNdjson('{"credits_consumed":1.2}\n{"type":"run_end","status":"passed","credits_consumed":2.3}').credits).toBeCloseTo(3.5));
 it("counts progress",()=>expect(parseKaneNdjson('{"step":1}\n{"step":2}\n{"type":"run_end","status":"passed"}').steps).toBe(2));
 it("returns status",()=>expect(parseKaneNdjson('{"type":"run_end","status":"passed"}').status).toBe("passed"));
});
