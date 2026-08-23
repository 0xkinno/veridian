export interface CoverageInput { total: number; proven: number; failed: number; stale?: number }
export function calculateCoverage(input: CoverageInput) { const stale=input.stale??0; const unverified=Math.max(0,input.total-input.proven-input.failed-stale); return {...input,stale,unverified,percentage:input.total===0?0:Math.round((input.proven/input.total)*1000)/10}; }
