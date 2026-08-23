# VERIDIAN RECOVERY & COMPLETION INSTRUCTION
## For Codex / Claude Code / Antigravity Agent
## Deadline: August 30, 2026 | Credits: ~1,050

> **Read this ENTIRE file before touching any code.**
> This file supersedes the original BUILD_INSTRUCTION.md where they conflict.
> The enhanced_buildrules.md remains the governing operating system.

---

## 0. CURRENT STATE (READ FIRST)

The project is in a BROKEN state:

- Phase 0 (research) and Phase 1 (foundation) are complete
- Phase 2 (Kane assurance design) is partially complete
- Phase 3 foundation code exists but is untested against real Kane
- **CRITICAL: The Next.js dev server returns HTTP 500 on /checkout**
- **CRITICAL: Zero real Kane browser evidence exists**
- **CRITICAL: ~150 credits already spent on ingestion/design/one failed authoring**
- 33 unit tests pass, typecheck/lint/build pass
- Kane 0.8.5 authenticated, balance ~1,051 credits
- Three `_test.md` contracts exist under `.testmuai/tests/` but have never been successfully run
- Prisma schema exists but may be overengineered (18+ entities)

**Before doing ANYTHING else:**

```bash
pwd
git status --short
git log --oneline -10
node --version
npm --version
kane-cli --version
kane-cli whoami
kane-cli balance
cat doc/PHASE2_KANE_LEDGER.md
```

Record the exact balance. Every credit matters.

---

## 1. COMPETITOR INTELLIGENCE UPDATE

Two new competitors have been identified. Add these to `COMPETITIVE_ANALYSIS.md` and `COMPETITIVE_COMPARISON.md`.

### LENS (Enoch208/lens) -- THE STRONGEST COMPETITOR

**Clone and study:**
```bash
git clone https://github.com/Enoch208/lens research/competitors/lens
```

**What LENS does well (respect these, do not dismiss):**
- Claude Code Stop hook blocks the agent on behavioral regression (exit code 2)
- Impact mapping: git diff maps changed files to affected business flows via `.lens/flow-map.json`
- Semantic comparison: each observable is classified SAME / UNEXPECTED_CHANGE / MISSING / EXPECTED_CHANGE
- Real B2B app (Seatline): 5 members, seat billing, invite/remove/role-change, monthly/annual cadence
- 4 Kane `_test.md` contracts, 31 browser steps total, 199 credits for all authoring
- Committed replay recordings mean all subsequent runs are FREE
- Planted regression is honest and clearly documented (billableSeats counting all members instead of active only)
- Beautiful README with clear storytelling, timestamps in demo, honest limitations
- 28 unit tests with fake Kane runner (no credits burned on testing)
- Zero npm dependencies for the LENS engine
- Lane 2: "Verification baked into your workflow"

**Where LENS is weak (VERIDIAN's attack surface):**
1. Does NOT use `kane-cli context ingest` (sponsor's newest assurance primitive)
2. Does NOT use `kane-cli context extract` (AI-derived use-cases with source citations)
3. Does NOT use `kane-cli design tests` (requirement-linked test generation)
4. Does NOT use `kane-cli cover` (coverage against requirements, not test counts)
5. Does NOT use `kane-cli generate` (AI test-case generation)
6. No requirement-to-evidence lineage -- tests exist but are not traced back to a source document
7. Manual `flow-map.json` -- admits this is a limitation
8. No requirement drift detection -- if the spec changes, LENS does not know
9. No coverage reporting -- no way to see "which requirements are proven vs owed"
10. JSON file store, no real database

**VERIDIAN must beat LENS on ALL FOUR judging criteria:**

| Criterion | LENS score | VERIDIAN must achieve |
|---|---|---|
| **Ships** | Strong (real app, real flows) | Equally strong real app with real flows |
| **Verified** | Strong (4 flows, 31 steps, real catches) | Stronger: uses the DEEPEST Kane features (assurance pipeline) |
| **Closed loop** | Very strong (Stop hook, exit 2, auto-repair) | Equally strong: failure feeds to agent, same test reruns |
| **Craft** | Strong (clean README, honest, focused) | Stronger: premium UI, Promise Graph, coverage dashboard, proof page |

### Onred -- SECONDARY COMPETITOR

**Study the README provided in context. Key observations:**
- Uses Kane's native pipeline (context ingest, extract, design tests) -- same features we plan to use
- Uses opencode for repair agent
- Simple cart fixture app with one sabotage (header count)
- Live event log as the product
- Uses shadcn primitives
- Local-only execution (no Vercel deployment for the loop)
- Simpler scope than VERIDIAN
- Less polished than LENS

**Onred's weakness:** narrow demo (one cart sabotage), no requirement lineage, no coverage, basic UI.

**VERIDIAN beats Onred by:** having a richer demo scenario, better UI, deeper evidence model, and the Promise Graph.

---

## 2. SCOPE RESET -- THE WINNING WEDGE

**STOP. Read this carefully.**

The original BUILD_INSTRUCTION.md specifies 18+ database entities, 8 build phases, adversarial multi-actor scenarios, invariant coordination, drift reconciliation, and a Promise Graph with clickable claim detail pages.

That scope will NOT be completed to production quality by August 30. Half-built features lose hackathons. One complete flow wins.

**The winning wedge is:**

> A checkout release requirement enters VERIDIAN. Kane's assurance pipeline extracts claims, designs tests, and runs them in real Chrome. One claim fails. The failure evidence feeds to a coding agent. The agent repairs the code. Kane reruns the SAME test. The requirement is now proven. The Promise Graph shows the full lineage: source to claim to acceptance criterion to Kane test to sealed evidence.

That is ONE flow. Build it completely. Make it undeniable.

### What stays (MUST IMPLEMENT):

1. **One real demo app** (checkout/e-commerce flow) that Kane actually tests
2. **Kane assurance pipeline integration** (`context ingest`, `context extract`, `design tests`, `testmd run`, `cover`)
3. **Promise Graph** showing source to claim to AC to test to evidence lineage
4. **One planted regression** that Kane catches in real Chrome
5. **Closed loop** where failure feeds to coding agent, agent repairs, Kane reruns same test
6. **Coverage dashboard** showing proven vs owed vs failed
7. **Proof page** with real Kane evidence, run IDs, timestamps, contract hashes
8. **Premium editorial UI** (landing, workspace, proof)
9. **Real tests** (unit + integration, no Kane credits burned)

### What gets CUT (do NOT implement):

- Multi-actor adversarial coordination (Phase 3 extras)
- Drift reconciliation (`kane-cli maintain reconcile`)
- Multiple requirement sources (one source document is enough)
- 18 database entities (reduce to 6-8 core entities)
- Multiple demo scenarios (one checkout scenario is enough)
- Invariant/SynchronizationBarrier/ReleaseCandidate entities
- Git worktree isolation (not needed for our demo)
- MCP server integration
- Stop hook integration (LENS already owns this; we own the assurance pipeline)

**The strategic insight:** LENS owns Lane 2 (verification baked into workflow via Stop hooks). VERIDIAN owns Lane 4 (requirements that test themselves via the assurance pipeline). Do NOT try to out-LENS LENS on Stop hooks. Out-depth them on requirement intelligence.

---

## 3. FIX THE BROKEN APP FIRST

**Priority 1: Get the checkout app returning HTTP 200.**

```bash
# Check what is actually broken
rm -rf .next
npm run build 2>&1 | head -100
npm run dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/checkout
```

The handoff says the error is `ENOENT: .next/routes-manifest.json`. This is typically caused by:
- Missing or corrupted `.next` directory
- Incompatible Next.js version
- Missing environment variables
- Prisma client not generated

**Fix sequence:**
```bash
rm -rf .next node_modules
npm install
npx prisma generate
npm run build
npm run dev
# Verify: curl http://localhost:3000/checkout should return 200
```

If the checkout page has a server-side error, inspect the route handler. The checkout page MUST:
- Render a working checkout form (product, quantity, discount code input, total)
- Have a working API endpoint that processes the checkout
- Show a confirmation after successful checkout
- Be visually complete (not a skeleton or placeholder)

**Do NOT proceed to Kane work until `curl http://localhost:3000/checkout` returns HTTP 200 with real HTML content.**

---

## 4. DATABASE SIMPLIFICATION

The current Prisma schema has 18+ entities. Simplify to these core entities:

```prisma
// Core lineage entities
model Source {
  id            String   @id @default(cuid())
  name          String
  content       String   @db.Text
  contentHash   String
  version       Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  claims        Claim[]
  runs          VerificationRun[]
}

model Claim {
  id              String   @id @default(cuid())
  sourceId        String
  source          Source   @relation(fields: [sourceId], references: [id])
  text            String   @db.Text
  sourceReference String?  // citation back to the source
  status          String   @default("UNVERIFIED") // UNVERIFIED, VERIFIED, FAILED, STALE
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  criteria        AcceptanceCriterion[]
}

model AcceptanceCriterion {
  id        String   @id @default(cuid())
  claimId   String
  claim     Claim    @relation(fields: [claimId], references: [id])
  text      String   @db.Text
  testFile  String?  // path to _test.md
  status    String   @default("UNVERIFIED")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  evidence  Evidence[]
}

model VerificationRun {
  id             String   @id @default(cuid())
  sourceId       String
  source         Source   @relation(fields: [sourceId], references: [id])
  contractHash   String
  status         String   // RUNNING, PASSED, FAILED, ERROR
  kaneOutput     String?  @db.Text
  startedAt      DateTime @default(now())
  completedAt    DateTime?
  creditsCost    Float?
  evidence       Evidence[]
  repairs        RepairAttempt[]
}

model Evidence {
  id           String   @id @default(cuid())
  runId        String
  run          VerificationRun @relation(fields: [runId], references: [id])
  criterionId  String
  criterion    AcceptanceCriterion @relation(fields: [criterionId], references: [id])
  verdict      String   // PASS, FAIL, INCONCLUSIVE, MISSING
  kaneTestUrl  String?
  kaneEvidence String?  @db.Text
  screenshot   String?
  createdAt    DateTime @default(now())
}

model RepairAttempt {
  id             String   @id @default(cuid())
  runId          String
  run            VerificationRun @relation(fields: [runId], references: [id])
  attemptNumber  Int
  failedClaim    String
  repairPrompt   String   @db.Text
  changedFiles   String?  @db.Text
  diffHash       String?
  status         String   // PENDING, COMPLETED, FAILED
  createdAt      DateTime @default(now())
}

model CoverageSnapshot {
  id          String   @id @default(cuid())
  sourceId    String
  totalClaims Int
  proven      Int
  failed      Int
  unverified  Int
  stale       Int
  percentage  Float
  createdAt   DateTime @default(now())
}
```

That is 7 entities, not 18. Each one maps directly to the Promise Graph lineage:
`Source -> Claim -> AcceptanceCriterion -> Evidence (via VerificationRun)`

If the existing schema already has these concepts embedded in a larger schema, KEEP what exists but do not add the cut entities (Invariant, SynchronizationBarrier, Actor, ReleaseCandidate, etc). If the schema needs migration, run:

```bash
npx prisma migrate dev --name simplify-schema
```

---

## 5. THE DEMO APP (CHECKOUT)

The checkout app is the SPECIMEN that Kane verifies. It must be:

### Pages:

**`/checkout`** -- The main checkout flow
- Product display (e.g., "Pro Plan License" at $49.99)
- Quantity selector (1-10)
- Discount code input field
- Apply discount button
- Order summary showing:
  - Subtotal (quantity x price)
  - Discount amount (if valid code applied)
  - Tax (calculated)
  - Total (subtotal - discount + tax)
- Checkout button
- Confirmation page after successful checkout showing order ID and total

**`/checkout/orders`** -- Order history
- List of completed orders with order ID, date, total, status
- Each order shows whether discount was applied

### The planted regression:

Create a checkout flow that works correctly. Then, for the demo, introduce ONE specific bug:

**The bug:** When discount code "SAVE20" is applied, the discount amount displays correctly on screen ($10.00 off a $49.99 item) but the final total does NOT actually subtract the discount. The total still shows $49.99 + tax instead of $39.99 + tax.

This is the EXACT pattern that makes Kane's real-browser verification essential: the UI LOOKS correct (discount shows) but the MATH is wrong (total unchanged). A unit test on the discount function would pass. Only a real browser flow that reads the actual rendered total catches this.

**Implementation:**

```typescript
// lib/checkout.ts

export function calculateOrder(price: number, quantity: number, discountCode?: string) {
  const subtotal = price * quantity;
  
  let discountAmount = 0;
  let discountLabel = '';
  
  if (discountCode === 'SAVE20') {
    discountAmount = subtotal * 0.20;
    discountLabel = '20% off';
  }
  
  const taxRate = 0.08;
  // THE BUG: tax and total calculated on subtotal, not discounted amount
  // Should be: const taxableAmount = subtotal - discountAmount;
  const taxableAmount = subtotal; // <-- THIS IS THE BUG (only active in demo mode)
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;
  const total = Math.round((taxableAmount + tax) * 100) / 100;
  
  return {
    subtotal,
    discountAmount, // This displays correctly!
    discountLabel,
    tax,
    total, // This is WRONG -- discount not subtracted
  };
}
```

**The fix the agent will apply:**
```typescript
const taxableAmount = subtotal - discountAmount; // Fixed
```

This is a clean, understandable, realistic bug that:
1. Cannot be caught by looking at the discount display (it shows correctly)
2. CAN be caught by Kane reading the actual total after discount
3. Has a one-line fix
4. Is a real-world bug pattern (display vs calculation divergence)

### Demo mode toggle:

Add an environment variable `DEMO_MODE=bug` that activates the planted regression.
Normal mode (`DEMO_MODE=clean`) uses the correct calculation.
This lets you:
- Run Kane against the buggy version (catches the failure)
- Agent fixes it (removes the bug line)
- Run Kane again (passes)
- Show both results on the proof page

---

## 6. KANE ASSURANCE PIPELINE -- EXACT COMMANDS

This is where VERIDIAN beats every competitor. LENS uses basic `testmd run`. Onred uses `context ingest/extract/design tests`. VERIDIAN uses the FULL pipeline AND traces it through the Promise Graph.

### Step 1: Verify existing context

Before spending credits, check what already exists:

```bash
kane-cli context list 2>&1
kane-cli balance
```

If the checkout requirement was already ingested in Phase 2, do NOT re-ingest. Check:

```bash
kane-cli context list | grep -i checkout
```

### Step 2: Ingest the requirement (if not already done)

Create the requirement document:

```bash
cat > doc/checkout-requirement.md << 'REQUIREMENT'
# Checkout Release Requirement

Customers must be able to:
1. Select a product and set quantity
2. Apply a valid discount code ("SAVE20" gives 20% off)
3. See the discount reflected in the order total
4. Complete checkout with the discounted total
5. Receive an order confirmation with the correct final amount

The discount must reduce the actual charged total, not merely display as a line item.
REQUIREMENT
```

If not already ingested:
```bash
kane-cli balance
kane-cli context ingest doc/checkout-requirement.md
kane-cli balance
# Record credit cost in doc/PHASE2_KANE_LEDGER.md
```

### Step 3: Extract use-cases (if not already done)

```bash
kane-cli context extract
# This produces use-cases with citations back to the source
kane-cli context list
kane-cli balance
# Record credit cost
```

### Step 4: Design tests (if not already done)

```bash
kane-cli design tests --use-case <use-case-id-from-extract>
kane-cli balance
# Record credit cost
```

### Step 5: Review what exists

FREE operations (no credits):
```bash
kane-cli context list
kane-cli context view <context-id>
kane-cli cover
kane-cli cover gaps
```

### Step 6: Run the tests

**CRITICAL: Only run when the app is returning HTTP 200 on /checkout**

```bash
# Verify app is healthy first
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/checkout
# Must return 200

# Set the URL
kane-cli config set-url http://localhost:3000

# Run with DEMO_MODE=bug (the broken version)
DEMO_MODE=bug npm run dev &
sleep 5

# Run each test ONCE
kane-cli testmd run .testmuai/tests/<test-file>_test.md --agent --headless
kane-cli balance
# Record credit cost and result

# Expected: FAIL on the discount-total test (discount displays but total is wrong)
```

### Step 7: Record the failure evidence

```bash
# Check evidence location
ls -la ~/.testmuai/kaneai/sessions/
# Copy relevant evidence references
```

### Step 8: Fix the bug and rerun

```bash
# Fix the bug in lib/checkout.ts (change taxableAmount line)
# Restart the app in clean mode
DEMO_MODE=clean npm run dev &
sleep 5

# Rerun the SAME test (should be cached/free replay)
kane-cli testmd run .testmuai/tests/<test-file>_test.md --agent --headless
kane-cli balance
# Expected: PASS
```

### Step 9: Get coverage

```bash
kane-cli cover
kane-cli cover gaps
# Record output for the coverage dashboard
```

### Credit budget:

| Operation | Est. credits | Notes |
|---|---|---|
| Already spent | ~150 | Ingestion + design + 1 failed authoring |
| First test authoring (3 contracts) | ~200 | First run of each _test.md |
| Replay runs | 0 | Cached after first run |
| Cover/gaps/list/view | 0 | Free local operations |
| Buffer for retries | ~100 | If a test needs re-authoring |
| **Total estimated** | **~450** | Leaves ~600 credits as safety margin |

**NEVER run a paid Kane command without first checking balance and recording it in the ledger.**

---

## 7. THE CLOSED LOOP IMPLEMENTATION

The closed loop is:

```
Requirement ingested
    |
Kane extracts claims + designs tests
    |
Kane runs tests in real Chrome (DEMO_MODE=bug)
    |
Test FAILS (discount displays, total wrong)
    |
VERIDIAN creates repair packet:
  - Failed claim text
  - Failed acceptance criterion
  - Kane's exact failure output (NDJSON)
  - Kane test URL / evidence reference
  - Allowed files: ["lib/checkout.ts"]
  - Forbidden: test files, requirement docs
    |
Coding agent receives repair packet
    |
Agent fixes lib/checkout.ts (one line)
    |
VERIDIAN reruns the SAME Kane test (free replay)
    |
Test PASSES
    |
VERIDIAN updates:
  - Claim status: UNVERIFIED -> FAILED -> VERIFIED
  - Evidence: both the failed and passed runs
  - Coverage: 100% of claims now proven
```

### Runner implementation:

Create `runner/orchestrator.ts`:

```typescript
// This is the VERIDIAN verification orchestrator
// It connects Kane's assurance pipeline to the coding agent repair loop

export interface VerificationCycle {
  id: string;
  sourceHash: string;
  contractHash: string;
  status: 'VERIFYING' | 'FAILED' | 'REPAIRING' | 'REVERIFYING' | 'VERIFIED' | 'REJECTED' | 'ERROR';
  attempts: VerificationAttempt[];
  maxAttempts: number;
}

export interface VerificationAttempt {
  number: number;
  kaneExitCode: number;
  kaneOutput: string; // raw NDJSON
  verdict: 'PASS' | 'FAIL' | 'VERIFIER_ERROR' | 'INCONCLUSIVE';
  failedCriteria: FailedCriterion[];
  evidenceUrl?: string;
  timestamp: string;
}

export interface FailedCriterion {
  criterionId: string;
  criterionText: string;
  expected: string;
  actual: string;
  kaneStepDetail: string;
}

export interface RepairPacket {
  cycleId: string;
  attemptNumber: number;
  failedClaim: string;
  failedCriteria: FailedCriterion[];
  kaneEvidence: string;
  allowedFiles: string[];
  forbiddenFiles: string[];
  instructions: string;
}
```

### Invoking Kane from the runner:

```typescript
import { execSync, spawn } from 'child_process';

function runKaneTest(testFile: string, appUrl: string): {
  exitCode: number;
  stdout: string;
  stderr: string;
} {
  try {
    const result = execSync(
      `kane-cli testmd run ${testFile} --agent --headless --url ${appUrl}`,
      {
        encoding: 'utf-8',
        timeout: 300_000, // 5 minutes
        env: { ...process.env },
      }
    );
    return { exitCode: 0, stdout: result, stderr: '' };
  } catch (error: any) {
    return {
      exitCode: error.status || 1,
      stdout: error.stdout || '',
      stderr: error.stderr || '',
    };
  }
}
```

### Parsing Kane NDJSON output:

```typescript
function parseKaneOutput(ndjson: string): {
  verdict: 'PASS' | 'FAIL' | 'VERIFIER_ERROR' | 'INCONCLUSIVE';
  summary?: any;
  finalState?: any;
  testUrl?: string;
} {
  const lines = ndjson.trim().split('\n').filter(Boolean);
  let verdict: 'PASS' | 'FAIL' | 'VERIFIER_ERROR' | 'INCONCLUSIVE' = 'INCONCLUSIVE';
  let summary: any = null;
  let finalState: any = null;
  let testUrl: string | undefined;

  for (const line of lines) {
    try {
      const event = JSON.parse(line);
      
      if (event.type === 'test_md_summary') {
        summary = event;
        if (event.status === 'passed') verdict = 'PASS';
        else if (event.status === 'failed') verdict = 'FAIL';
      }
      
      if (event.type === 'run_end') {
        if (!summary) {
          // Use run_end only if no test_md_summary
          if (event.status === 'passed') verdict = 'PASS';
          else if (event.status === 'failed') verdict = 'FAIL';
        }
        testUrl = event.test_url || event.share_url;
      }
      
      if (event.type === 'final_state') {
        finalState = event;
      }
      
      if (event.context?.variables) {
        // Extract stored observations
        finalState = { ...finalState, variables: event.context.variables };
      }
    } catch {
      // Skip non-JSON lines
    }
  }

  return { verdict, summary, finalState, testUrl };
}
```

### Creating the repair packet:

```typescript
function createRepairPacket(
  cycle: VerificationCycle,
  attempt: VerificationAttempt
): RepairPacket {
  return {
    cycleId: cycle.id,
    attemptNumber: attempt.number + 1,
    failedClaim: attempt.failedCriteria.map(c => c.criterionText).join('; '),
    failedCriteria: attempt.failedCriteria,
    kaneEvidence: attempt.kaneOutput,
    allowedFiles: ['lib/checkout.ts', 'app/checkout/page.tsx'],
    forbiddenFiles: ['.testmuai/**', 'doc/**', '*.test.*'],
    instructions: `
Kane CLI verified the checkout flow in a real Chrome browser and found:

${attempt.failedCriteria.map(c => `- ${c.criterionText}: expected "${c.expected}", got "${c.actual}"`).join('\n')}

Fix ONLY the application code to make the acceptance criteria pass.
Do NOT modify the Kane test files.
Do NOT modify the requirement documents.
The same Kane test will be rerun after your fix.
    `.trim(),
  };
}
```

### Invoking the repair agent:

The agent invocation depends on which CLI is available. Support multiple:

```typescript
function invokeRepairAgent(packet: RepairPacket, agentCommand: string): {
  success: boolean;
  changedFiles: string[];
} {
  const prompt = packet.instructions;
  
  // Write the repair prompt to a temp file
  const promptFile = '/tmp/veridian-repair-prompt.md';
  writeFileSync(promptFile, prompt, 'utf-8');
  
  let command: string;
  
  switch (agentCommand) {
    case 'codex':
      command = `codex exec --full-auto "$(cat ${promptFile})"`;
      break;
    case 'claude':
      command = `claude --print --output-format json "$(cat ${promptFile})"`;
      break;
    case 'opencode':
      command = `opencode --agent repair "$(cat ${promptFile})"`;
      break;
    default:
      command = `${agentCommand} "$(cat ${promptFile})"`;
  }
  
  try {
    execSync(command, {
      encoding: 'utf-8',
      timeout: 180_000,
      cwd: process.cwd(),
    });
    
    // Check what changed
    const diff = execSync('git diff --name-only', { encoding: 'utf-8' });
    const changedFiles = diff.trim().split('\n').filter(Boolean);
    
    return { success: true, changedFiles };
  } catch (error) {
    return { success: false, changedFiles: [] };
  }
}
```

### The full orchestration loop:

```typescript
async function runVerificationCycle(
  testFile: string,
  appUrl: string,
  agentCommand: string,
  maxAttempts: number = 2
): Promise<VerificationCycle> {
  const cycle: VerificationCycle = {
    id: `cycle-${Date.now()}`,
    sourceHash: computeHash(readFileSync('doc/checkout-requirement.md', 'utf-8')),
    contractHash: computeHash(readFileSync(testFile, 'utf-8')),
    status: 'VERIFYING',
    attempts: [],
    maxAttempts,
  };

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Run Kane
    const kaneResult = runKaneTest(testFile, appUrl);
    const parsed = parseKaneOutput(kaneResult.stdout);
    
    const attemptRecord: VerificationAttempt = {
      number: attempt,
      kaneExitCode: kaneResult.exitCode,
      kaneOutput: kaneResult.stdout,
      verdict: parsed.verdict,
      failedCriteria: extractFailedCriteria(parsed),
      evidenceUrl: parsed.testUrl,
      timestamp: new Date().toISOString(),
    };
    
    cycle.attempts.push(attemptRecord);
    
    if (parsed.verdict === 'PASS') {
      cycle.status = 'VERIFIED';
      break;
    }
    
    if (parsed.verdict === 'VERIFIER_ERROR' || parsed.verdict === 'INCONCLUSIVE') {
      cycle.status = 'ERROR';
      break;
    }
    
    // FAIL -- attempt repair if attempts remain
    if (attempt < maxAttempts - 1) {
      cycle.status = 'REPAIRING';
      const packet = createRepairPacket(cycle, attemptRecord);
      const repair = invokeRepairAgent(packet, agentCommand);
      
      if (!repair.success) {
        cycle.status = 'REJECTED';
        break;
      }
      
      // Verify contract was not tampered
      const newContractHash = computeHash(readFileSync(testFile, 'utf-8'));
      if (newContractHash !== cycle.contractHash) {
        cycle.status = 'REJECTED'; // Agent modified the test -- not allowed
        break;
      }
      
      cycle.status = 'REVERIFYING';
    } else {
      cycle.status = 'REJECTED';
    }
  }
  
  // Persist the cycle
  writeFileSync(
    '.veridian/last-cycle.json',
    JSON.stringify(cycle, null, 2),
    'utf-8'
  );
  
  return cycle;
}
```

---

## 8. THE PROMISE GRAPH UI

This is VERIDIAN's signature visual differentiator. No competitor has this.

The Promise Graph shows the complete lineage:

```
SOURCE DOCUMENT
  |
  +-- Claim 1: "Customers can apply discount code SAVE20"
  |     |
  |     +-- AC 1.1: "Discount amount shows 20% of subtotal"
  |     |     +-- Kane test: apply-discount_test.md
  |     |     +-- Evidence: PASS (run-abc, 2026-08-25)
  |     |
  |     +-- AC 1.2: "Final total reflects the discounted amount"
  |           +-- Kane test: checkout-total_test.md
  |           +-- Evidence: FAIL -> REPAIR -> PASS (run-def, 2026-08-25)
  |
  +-- Claim 2: "Order confirmation shows correct final amount"
  |     |
  |     +-- AC 2.1: "Confirmation page displays order total"
  |           +-- Kane test: order-confirm_test.md
  |           +-- Evidence: PASS (run-ghi, 2026-08-25)
  |
  +-- Claim 3: "Checkout works without discount code"
        |
        +-- AC 3.1: "Total equals subtotal + tax when no code applied"
              +-- Kane test: no-discount_test.md
              +-- Evidence: PASS (run-jkl, 2026-08-25)
```

### UI Implementation:

Use React with Framer Motion for the Promise Graph. Each node shows:
- Status indicator (green verified, red failed, amber stale, gray unverified)
- Click to expand/drill into details
- Evidence links open Kane test URLs
- Repair history shows the fail-to-pass journey

### Route structure:

```
/                   -- Landing page (product story, hero, hook)
/workspace          -- Promise Graph + coverage summary
/workspace/[id]     -- Claim detail with AC, tests, evidence, repair history
/proof              -- Judge-facing evidence page (mandatory)
/checkout           -- The demo app Kane actually tests
/checkout/orders    -- Order history in the demo app
```

### Landing page (`/`) -- The 5-second hook:

Hero text:
> **VERIDIAN catches the promises your product no longer keeps.**

Subtext:
> AI agents ship features that look correct. The discount displays on screen. But the total never changes. VERIDIAN ingests your requirements, Kane designs the tests, and the running product proves every promise in real Chrome.

Then show the Promise Graph in a reduced, visual form.

Below: the three-step story:
1. **Ingest** -- Paste your requirement. Kane extracts testable claims.
2. **Verify** -- Kane runs every claim in real Chrome. Failures feed to your coding agent.
3. **Prove** -- The same test reruns after repair. Coverage shows what is proven vs owed.

### Design system:

**Palette:**
- Background: `#0A0A0B` (near-black)
- Surface: `#141416` (card dark)
- Border: `#1F1F23` (subtle)
- Text primary: `#FAFAF9` (warm white)
- Text secondary: `#A1A1AA` (muted)
- Accent verified: `#10B981` (emerald green)
- Accent failed: `#EF4444` (red)
- Accent stale: `#F59E0B` (amber)
- Accent unverified: `#6B7280` (gray)
- Accent brand: `#6366F1` (indigo, for interactive elements)

**Typography:**
- Display: `font-family: 'Instrument Serif', Georgia, serif` (or Cormorant Garamond if available via Google Fonts)
- Interface: `font-family: 'Geist', 'Inter', -apple-system, sans-serif`
- Mono/data: `font-family: 'JetBrains Mono', 'Fira Code', monospace`

**Layout principles:**
- Generous whitespace
- Monochrome with strategic color (only status colors break the palette)
- No generic SaaS gradients
- No shield/lock/checkmark icons as hero content
- Data density in the workspace, editorial calm on the landing

---

## 9. THE PROOF PAGE (`/proof`)

This page exists for judges. It must answer:

1. What requirement was ingested?
2. How many claims were extracted?
3. What Kane commands were used?
4. What tests were designed?
5. What was the first verification result?
6. What failed and why?
7. What was the repair?
8. What was the re-verification result?
9. What is the final coverage?
10. Are these results real?

**Content:**

```markdown
## VERIDIAN Proof of Verification

### Requirement Source
doc/checkout-requirement.md (SHA-256: abc123...)

### Kane Assurance Pipeline
- `kane-cli context ingest doc/checkout-requirement.md` -- [timestamp]
- `kane-cli context extract` -- [timestamp, credits: X]
- `kane-cli design tests --use-case uc-checkout` -- [timestamp, credits: X]

### Claims Extracted: 4
| # | Claim | Status |
|---|---|---|
| 1 | Discount code applies 20% off | VERIFIED |
| 2 | Total reflects discounted amount | VERIFIED (after repair) |
| 3 | Order confirmation shows correct total | VERIFIED |
| 4 | Checkout works without discount | VERIFIED |

### Verification Run 1 (with planted regression)
- Run ID: run-abc
- Timestamp: 2026-08-25T14:30:00Z
- Contract hash: def456...
- Result: 3/4 PASS, 1/4 FAIL
- Failed: Claim 2 -- "Total reflects discounted amount"
  - Expected: $39.99 + tax
  - Actual: $49.99 + tax
  - Kane test URL: [link]

### Repair
- Agent: Codex CLI
- Changed file: lib/checkout.ts
- Diff: taxableAmount = subtotal -> taxableAmount = subtotal - discountAmount
- Attempt: 1 of 2

### Verification Run 2 (after repair)
- Run ID: run-def
- Timestamp: 2026-08-25T14:35:00Z
- Contract hash: def456... (SAME -- contract was not modified)
- Result: 4/4 PASS
- Kane test URL: [link]

### Coverage
- 4/4 claims proven (100%)
- 0 stale
- 0 unverified

### Reproducibility
git clone [repo] && npm install && npm run dev
# In another terminal:
kane-cli testmd run .testmuai/tests/checkout_test.md --agent --headless
```

This proof page renders from real data stored in `.veridian/` and the database. Do NOT hardcode it.

---

## 10. TESTS (NO KANE CREDITS)

Write comprehensive tests that do NOT require Kane:

```bash
# Unit tests (Vitest)
- lib/checkout.test.ts          # Order calculation, discount logic
- runner/parser.test.ts         # Kane NDJSON parsing
- runner/comparator.test.ts     # Verdict classification
- runner/orchestrator.test.ts   # Cycle state machine (mock Kane runner)
- runner/repair.test.ts         # Repair packet creation, scope enforcement
- lib/hash.test.ts              # Contract hashing
- lib/coverage.test.ts          # Coverage calculation

# Integration tests
- runner/integration.test.ts    # Full cycle with mocked Kane (inject fake NDJSON)
```

**CRITICAL: Use a fake Kane runner for all tests.** LENS does this well (28 tests, zero credits). Inject fake NDJSON responses that exercise:
- Successful pass
- Failed test with specific criteria
- Verifier error (Kane infra issue)
- Inconclusive (missing data)
- Contract hash mismatch (agent tampered with test)
- Multiple repair attempts
- Max attempts exhausted

**Target: 40+ tests, all passing, zero Kane credits burned.**

---

## 11. README STRUCTURE

Follow the enhanced_buildrules template EXACTLY. First sentence must contain a person and their problem:

```markdown
# VERIDIAN

**VERIDIAN lets product teams prove their software still keeps every promise written in their requirements, by turning each claim into a Kane-verified browser test with sealed evidence.**

[Live demo link] . [Video link] . [Lane 4: Requirements that test themselves]

## The Problem

A product manager writes a requirement: "Customers can apply discount code SAVE20 and the total
reflects the discount." An AI coding agent implements the feature. The discount label displays
correctly. But the total never changes. The agent reports success because the screen looks right.
Nobody catches it until a customer complains.

## The Solution

VERIDIAN ingests the requirement, uses Kane CLI's assurance pipeline to extract testable claims,
designs browser tests for each claim, and runs them in real Chrome. When the total does not match,
Kane's evidence feeds back to the coding agent as a repair contract. The agent fixes the one line.
Kane reruns the same test. The Promise Graph shows which promises are now proven and which still
need work.

## How It Works

1. Paste your product requirement into VERIDIAN
2. Kane CLI extracts testable claims with citations back to the source
3. Kane designs acceptance criteria and browser tests for each claim
4. Kane runs the tests in real Chrome against your running app
5. Failed claims generate a repair contract for your coding agent
6. The agent fixes the code (not the test)
7. Kane reruns the SAME test -- pass means the promise is proven
8. The Promise Graph shows coverage: proven vs owed vs failed

## Kane CLI Integration

VERIDIAN uses Kane CLI's deepest capabilities:

| Kane Command | How VERIDIAN Uses It |
|---|---|
| `context ingest` | Snapshots the requirement document into Kane's local context store |
| `context extract` | AI-derives testable use-cases with citations back to the source |
| `design tests` | Creates acceptance criteria, scenarios, and `_test.md` files |
| `testmd run --agent --headless` | Executes browser tests in real Chrome, returns structured NDJSON |
| `cover` | Measures which requirements are proven vs owed (requirements, not test counts) |
| `cover gaps` | Shows what is still unverified |
| `context list` / `context view` | Free inspection of the ingested context |

If you remove Kane CLI from VERIDIAN, the entire product stops working. There is no fallback
browser automation. There is no mock mode. Kane IS the verification layer.

[Continue with: Demo Evidence, Architecture, Target User, Tech Stack, Local Setup, Tests, etc.]
```

---

## 12. VIDEO STRUCTURE (3 MINUTES)

```
0:00-0:10  "Your AI agent says the feature works. But the total never changed.
            VERIDIAN catches the promises your product no longer keeps."

0:10-0:30  Show the checkout app. Apply discount. Discount shows. Total is wrong.
           "The discount displays correctly. The math is wrong. No unit test catches this."

0:30-0:50  Show kane-cli context ingest, extract. Show the extracted claims.
           "Kane reads the requirement. Four testable claims. Each one gets a browser test."

0:50-1:20  Show Kane running in real Chrome. 3 pass, 1 fails.
           "Three promises kept. One broken. Kane found it in real Chrome."

1:20-1:50  Show the repair: failure evidence feeds to agent. Agent fixes one line.
           "The failure becomes a repair contract. The agent fixes the code. Not the test."

1:50-2:10  Kane reruns same test. PASS. Promise Graph updates.
           "Same test. Same contract. Now it passes. The promise is proven."

2:10-2:35  Show the proof page. Coverage dashboard. Promise Graph.
           "Four claims. Four proven. Coverage against requirements, not test counts."

2:35-3:00  "VERIDIAN does not ask whether the agent said it worked.
            It proves whether the product still keeps its promises.
            Built with Kane CLI's full assurance pipeline."
```

---

## 13. EXECUTION SEQUENCE (DO THIS IN ORDER)

### Step A: Fix the broken app (IMMEDIATE)
```bash
rm -rf .next node_modules
npm install
npx prisma generate
npm run build
npm run dev
curl http://localhost:3000/checkout  # Must return 200
```

### Step B: Implement the checkout demo app
- Build `/checkout` page with product, quantity, discount code, total
- Build `/checkout/orders` page
- Implement `lib/checkout.ts` with the calculateOrder function
- Add DEMO_MODE env variable for bug toggle
- Verify it renders correctly in browser

### Step C: Write the requirement document
- Create `doc/checkout-requirement.md` with the 4-5 claims

### Step D: Kane assurance pipeline (CREDIT-CONSUMING -- be careful)
- Check balance first
- Ingest requirement (if not already done)
- Extract use-cases
- Design tests
- Review generated `_test.md` files
- Record ALL credit costs

### Step E: Run Kane verification
- Start app in DEMO_MODE=bug
- Run each `_test.md` once (first authoring, costs credits)
- Record failures
- Save all NDJSON output
- Record evidence URLs

### Step F: Implement the repair loop
- Create the repair packet from Kane failure
- Invoke coding agent to fix
- Rerun Kane (free replay)
- Record pass result
- Save evidence

### Step G: Build the Promise Graph UI
- `/` landing with hook
- `/workspace` with Promise Graph visualization
- `/proof` with real evidence
- `/checkout` demo app routes

### Step H: Write tests (zero credits)
- 40+ unit/integration tests
- Mock Kane runner
- Cover all verdict states

### Step I: Polish
- Premium typography and palette
- Framer Motion transitions
- Mobile responsive
- Loading/error states
- Favicon and page titles

### Step J: README and video
- Follow exact template from Section 11
- Record 3-minute video per Section 12
- Test all links in incognito

### Step K: Submission
- Verify clean clone works
- Verify all tests pass
- Verify live demo loads
- Submit 4+ hours before deadline

---

## 14. WHAT THE AGENT MUST NEVER DO

- Never stub or simulate Kane CLI
- Never hardcode PASS/FAIL results
- Never fabricate screenshots or evidence
- Never modify `_test.md` files to make failures pass
- Never claim features that do not work
- Never leave TODO/coming soon/placeholder
- Never use TypeScript `any` in production
- Never leave console.log in production
- Never copy competitor source code, UI, prose, or architecture
- Never spend Kane credits without checking balance first and recording the cost
- Never proceed to the next step if the current step is broken
- Never claim "95% better" without evidence
- Never build scope that was explicitly cut in Section 2

---

## 15. STATE FILES TO MAINTAIN

After every major session, update:

| File | Contents |
|---|---|
| `PROGRESS.md` | What is done, in progress, blocked |
| `ARCHITECTURE.md` | Current system design (not aspirational) |
| `EVIDENCE.md` | Real Kane run IDs, evidence URLs, credit costs |
| `HANDOFF.md` | Exact state for next agent session |
| `COMPETITIVE_ANALYSIS.md` | Updated with LENS and Onred analysis |
| `COMPETITIVE_COMPARISON.md` | Scorecard showing where VERIDIAN leads/lags |

---

## 16. COMPETITIVE SCORECARD UPDATE

After adding LENS and Onred, the scorecard should honestly assess:

| Dimension | VERIDIAN | LENS | StateMirror | Elenchos | Onred |
|---|---|---|---|---|---|
| Kane integration depth | context+extract+design+cover+testmd | testmd only | basic run | testmd + generate guidance | context+extract+design+testmd |
| Requirement lineage | Full Promise Graph | None | Fixed invariant | Task JSON | Spec file |
| Coverage reporting | kane-cli cover (req-level) | None | None | Criterion mapping | None |
| Closed loop quality | Failure->repair->rerun | Stop hook->repair->rerun | Verify->repair->rerun | Task->implement->verify->repair | Verify->repair->rerun |
| Evidence quality | Sealed + lineage + proof page | Committed replay + /lens | Prisma cycle records | .elenchos/runs | Event log |
| UI quality | Premium editorial | Clean functional | Basic | CLI only | shadcn basic |
| Real app | Checkout flow | B2B billing (Seatline) | Payment destination | Demo todo | Cart fixture |
| Honesty | Planted regression documented | Planted regression documented | Intentional defect documented | Demo fixture documented | Sabotage documented |

---

## 17. FINAL QUALITY GATE

The project is NOT done until ALL of these are true:

```
[ ] npm run build passes with zero errors
[ ] npm test passes with 40+ tests
[ ] npm run lint passes
[ ] npm run typecheck passes
[ ] /checkout loads and works (with and without discount)
[ ] Kane has been run against the real app (evidence exists)
[ ] At least one Kane failure is captured with real evidence
[ ] Repair loop has produced a real fix
[ ] Same Kane test has been rerun after repair (passes)
[ ] Promise Graph shows real lineage (not hardcoded)
[ ] Proof page shows real evidence (not hardcoded)
[ ] Coverage shows real numbers from kane-cli cover
[ ] Landing page communicates the product in 5 seconds
[ ] Mobile responsive on 390px viewport
[ ] README follows enhanced_buildrules template
[ ] First sentence contains a person and their problem
[ ] All links work in incognito
[ ] No TODO, no coming soon, no placeholder
[ ] No console errors in browser devtools
[ ] Clean clone + npm install + npm run dev works
[ ] Demo video is under 3 minutes
[ ] Submitted 4+ hours before deadline
```

---

*This instruction supersedes the original BUILD_INSTRUCTION.md on scope and execution order.*
*The enhanced_buildrules.md remains the governing operating system.*
*Kane CLI documentation and installed CLI behavior are the source of truth for all Kane commands.*
