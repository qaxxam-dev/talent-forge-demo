/**
 * TalentForge - Isolated Demo Data Store
 * Structured to allow seamless 1-to-1 swap with real FastAPI / Supabase backend endpoints.
 */

export interface RedactedToken {
  type: 'NAME' | 'PHONE' | 'EMAIL' | 'LOCATION' | 'COLLEGE'
  raw: string
  token: string
}

export interface SkillGap {
  skill: string
  priority: 'Critical' | 'High' | 'Medium'
  impact: string
}

export interface TargetJob {
  title: string
  company: string
  clientTier: 'Enterprise Fortune 500' | 'Series B Scaleup' | 'Global IT Conglomerate'
  experienceRequired: string
  location: string
  overview: string
  requiredStack: string[]
  keyResponsibilities: string[]
}

export interface GapAnalysis {
  matchScore: number
  readinessBand: 'Day-Zero Ready' | 'Remediation Required' | 'Bridging Sprint Needed'
  acquiredSkills: string[]
  criticalGaps: SkillGap[]
  dpdpComplianceStatus: 'VERIFIED_COMPLIANT'
  purgedTokensCount: number
  recommendedAction: 'spec_scaffolder' | 'code_defend'
}

export interface SprintTask {
  id: string
  sprint: 'Sprint 1: Schema & Models' | 'Sprint 2: APIs & Controllers' | 'Sprint 3: Deployment & Testing'
  title: string
  shortSummary: string
  targetCompetency: string
  difficulty: 'Core' | 'Advanced'
  estimatedHours: string
  status: 'todo' | 'in_progress' | 'completed'
  acceptanceCriteria: string[]
  codeSnippet: {
    language: string
    filename: string
    code: string
  }
}

export interface VivaQuestion {
  id: string
  questionNumber: number
  category: 'Architectural Trade-Off' | 'Failure Handling & Edge Cases' | 'Scalability & Deployment'
  interrogatorPrompt: string
  targetCodeReference: string
  candidateSpokenAnswer: string
  aiEvaluation: {
    accuracyScore: number
    clarityScore: number
    verdict: string
    keyObservation: string
  }
}

export interface BusinessTranslation {
  technicalFeature: string
  businessValue: string
  riskMitigated: string
}

export interface RecruiterDossier {
  candidateId: string
  overallDayZeroScore: number
  readinessBand: 'Day-Zero Operational Ready' | 'Needs Supervised Ramp'
  authorshipStatus: 'VERIFIED_HUMAN_AUTHORED'
  dpdpCertificationId: string
  shareableUrl: string
  businessTranslations: BusinessTranslation[]
  technicalChecklist: Array<{ name: string; status: 'VERIFIED'; detail: string }>
}

export interface VerifiedSubmissionUrls {
  repoUrl: string
  liveDemoUrl: string
  branchName: string
  lastCommitHash: string
  buildStatus: 'VERIFIED' | 'PASSING'
  astMatchScore: number
}

export interface CandidatePersona {
  id: string
  name: string
  archetype: string
  education: string
  phone: string
  email: string
  location: string
  hasPortfolio: boolean
  rawResumeText: string
  sanitizedResumeText: string
  redactedTokens: RedactedToken[]
  targetJob: TargetJob
  gapAnalysis: GapAnalysis
}

export const DEMO_SPRINT_TASKS: Record<string, SprintTask[]> = {
  'persona-1': [
    {
      id: 'task-1-1',
      sprint: 'Sprint 1: Schema & Models',
      title: 'Relational Ledger Schema & B-Tree Composite Indexing',
      shortSummary: 'Author PostgreSQL DDL with ACID constraints and sub-10ms query indexing.',
      targetCompetency: 'Relational Indexing & Concurrency',
      difficulty: 'Core',
      estimatedHours: '3 Hours',
      status: 'completed',
      acceptanceCriteria: [
        'Define ledger_accounts and ledger_entries with foreign key integrity.',
        'Create composite index idx_ledger_account_timestamp ON ledger_entries(account_id, created_at DESC).',
        'Enforce CHECK constraints preventing unauthorized negative balance states.'
      ],
      codeSnippet: {
        language: 'sql',
        filename: 'schema/001_ledger_tables.sql',
        code: `CREATE TABLE ledger_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_number VARCHAR(34) UNIQUE NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'INR',
    balance_cents BIGINT NOT NULL DEFAULT 0 CHECK (balance_cents >= 0),
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ledger_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES ledger_accounts(id) ON DELETE RESTRICT,
    amount_cents BIGINT NOT NULL,
    direction VARCHAR(6) NOT NULL CHECK (direction IN ('DEBIT', 'CREDIT')),
    idempotency_key VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Composite B-Tree Index for high-throughput sub-10ms statement queries
CREATE INDEX idx_ledger_account_timestamp 
ON ledger_entries (account_id, created_at DESC);`
      }
    },
    {
      id: 'task-1-2',
      sprint: 'Sprint 1: Schema & Models',
      title: 'Pessimistic Row Locking & Transaction Isolation',
      shortSummary: 'Implement atomic balance transfers using SELECT ... FOR UPDATE to eliminate race conditions.',
      targetCompetency: 'ACID Concurrency Control',
      difficulty: 'Advanced',
      estimatedHours: '4 Hours',
      status: 'completed',
      acceptanceCriteria: [
        'Wrap balance updates in atomic SQL transaction block.',
        'Acquire row-level write lock via with_for_update() on sender and recipient records.',
        'Ensure deadlock prevention by acquiring locks in deterministic sorted ID order.'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'services/ledger_service.py',
        code: `async def execute_atomic_transfer(
    session: AsyncSession, 
    sender_id: UUID, 
    recipient_id: UUID, 
    amount_cents: int
) -> TransactionResult:
    # Sort IDs deterministically to prevent cross-transaction deadlocks
    first_id, second_id = sorted([sender_id, recipient_id])
    
    async with session.begin():
        # Acquire pessimistic row-level write locks
        stmt = select(Account).where(Account.id.in_([first_id, second_id])).with_for_update()
        result = await session.execute(stmt)
        accounts = {acc.id: acc for acc in result.scalars().all()}
        
        sender = accounts[sender_id]
        recipient = accounts[recipient_id]
        
        if sender.balance_cents < amount_cents:
            raise InsufficientFundsError("Debit exceeds available balance")
            
        sender.balance_cents -= amount_cents
        recipient.balance_cents += amount_cents
        sender.version += 1
        recipient.version += 1
        
        await session.commit()
    return TransactionResult(status="SETTLED")`
      }
    },
    {
      id: 'task-1-3',
      sprint: 'Sprint 1: Schema & Models',
      title: 'Automated Migration Pipeline with Rollback Safeguards',
      shortSummary: 'Configure Alembic migrations with forward/backward integrity tests.',
      targetCompetency: 'Schema Versioning',
      difficulty: 'Core',
      estimatedHours: '2 Hours',
      status: 'in_progress',
      acceptanceCriteria: [
        'Generate revision file with upgrade() and downgrade() functions.',
        'Validate non-destructive column backfills for existing records.'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'alembic/versions/2026_ledger_v1.py',
        code: `def upgrade():
    op.create_table(
        'audit_events',
        sa.Column('id', sa.UUID(), nullable=False),
        sa.Column('event_type', sa.String(length=32), nullable=False),
        sa.Column('payload', sa.JSON(), nullable=False),
        sa.Column('occurred_at', sa.DateTime(timezone=True), server_default=sa.func.now())
    )

def downgrade():
    op.drop_table('audit_events')`
      }
    },
    {
      id: 'task-2-1',
      sprint: 'Sprint 2: APIs & Controllers',
      title: 'FastAPI Transfer Router with Idempotency Key Verification',
      shortSummary: 'Expose asynchronous HTTP endpoint caching idempotency tokens in Redis.',
      targetCompetency: 'Idempotent API Design',
      difficulty: 'Core',
      estimatedHours: '3 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Enforce X-Idempotency-Key header on all POST /api/v1/transfers requests.',
        'Cache preliminary in-flight status in Redis with 120s TTL.',
        'Return cached transaction receipt on duplicate key retries without re-executing debit.'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'routers/transfers.py',
        code: `@router.post("/transfers", response_model=TransferResponse)
async def create_transfer(
    payload: TransferRequest,
    idempotency_key: str = Header(..., alias="X-Idempotency-Key"),
    redis: Redis = Depends(get_redis),
    db: AsyncSession = Depends(get_db_session)
):
    cached = await redis.get(f"idemp:{idempotency_key}")
    if cached:
        return TransferResponse.model_validate_json(cached)
        
    result = await ledger_service.execute_atomic_transfer(
        db, payload.sender_id, payload.recipient_id, payload.amount_cents
    )
    
    await redis.setex(f"idemp:{idempotency_key}", 120, result.model_dump_json())
    return result`
      }
    },
    {
      id: 'task-2-2',
      sprint: 'Sprint 2: APIs & Controllers',
      title: 'Asynchronous Webhook Dispatcher via Redis Streams',
      shortSummary: 'Decouple client notification deliveries into an event queue with exponential backoff.',
      targetCompetency: 'Asynchronous Task Queues',
      difficulty: 'Advanced',
      estimatedHours: '4 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Publish transaction events to redis_stream:ledger_events.',
        'Implement resilient consumer group with 3 retry attempts and exponential backoff.',
        'Route permanently failing deliveries to Dead Letter Queue (DLQ).'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'workers/webhook_worker.py',
        code: `async def consume_ledger_events(redis: Redis):
    while True:
        events = await redis.xreadgroup(
            groupname="notification_workers",
            consumername="worker_1",
            streams={"redis_stream:ledger_events": ">"},
            count=10, block=2000
        )
        for stream, messages in events:
            for msg_id, data in messages:
                success = await dispatch_webhook(data["target_url"], data["payload"])
                if success:
                    await redis.xack("redis_stream:ledger_events", "notification_workers", msg_id)
                else:
                    await schedule_retry_or_dlq(redis, msg_id, data)`
      }
    },
    {
      id: 'task-2-3',
      sprint: 'Sprint 2: APIs & Controllers',
      title: 'Token Bucket Rate Limiting Middleware',
      shortSummary: 'Protect banking ledger endpoints against traffic spikes and credential stuffing.',
      targetCompetency: 'Security & Traffic Shaping',
      difficulty: 'Core',
      estimatedHours: '2 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Implement token bucket algorithm evaluating client API token in Redis.',
        'Reject requests exceeding 60 requests per minute with HTTP 429 Too Many Requests.'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'middleware/rate_limiter.py',
        code: `class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        client_key = request.headers.get("X-API-Key", request.client.host)
        allowed = await redis_rate_check(client_key, max_tokens=60, refill_per_sec=1.0)
        if not allowed:
            return JSONResponse(status_code=429, content={"error": "Rate limit exceeded"})
        return await call_next(request)`
      }
    },
    {
      id: 'task-3-1',
      sprint: 'Sprint 3: Deployment & Testing',
      title: 'Automated Pytest Concurrency Test Suite',
      shortSummary: 'Execute parallel requests using asyncio.gather to prove race-condition resistance.',
      targetCompetency: 'Automated Concurrency Testing',
      difficulty: 'Advanced',
      estimatedHours: '3 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Launch 20 concurrent transfer requests against a single account with balance of 100 INR.',
        'Assert exact expected balance without negative overdraft or phantom balance creation.',
        'Verify zero database lock timeouts or unhandled exceptions.'
      ],
      codeSnippet: {
        language: 'python',
        filename: 'tests/test_concurrency.py',
        code: `@pytest.mark.asyncio
async def test_concurrent_transfers_no_overdraft(test_client):
    # Sender has 100 INR. 20 requests attempt to debit 10 INR concurrently (Total 200 INR requested).
    tasks = [
        test_client.post("/transfers", json={"sender_id": SENDER_ID, "amount": 10}, 
                         headers={"X-Idempotency-Key": f"key_{i}"})
        for i in range(20)
    ]
    responses = await asyncio.gather(*tasks)
    
    successes = [r for r in responses if r.status_code == 200]
    failures = [r for r in responses if r.status_code == 400]
    
    # Exactly 10 must succeed and 10 must fail
    assert len(successes) == 10
    assert len(failures) == 10`
      }
    },
    {
      id: 'task-3-2',
      sprint: 'Sprint 3: Deployment & Testing',
      title: 'Multi-Stage Production Docker Packaging',
      shortSummary: 'Configure secure distroless container with non-root security boundaries.',
      targetCompetency: 'Cloud Containerization',
      difficulty: 'Core',
      estimatedHours: '2 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Multi-stage build discarding development wheels and compiler tools.',
        'Enforce USER nonroot execution to prevent host breakout vulnerabilities.',
        'Container image size under 120MB.'
      ],
      codeSnippet: {
        language: 'dockerfile',
        filename: 'Dockerfile',
        code: `FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
USER 10001:10001
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
      }
    },
    {
      id: 'task-3-3',
      sprint: 'Sprint 3: Deployment & Testing',
      title: 'Docker Compose Stack with Automated Healthchecks',
      shortSummary: 'Orchestrate FastAPI, PostgreSQL, and Redis with dependent startup probes.',
      targetCompetency: 'Local Orchestration & CI/CD',
      difficulty: 'Core',
      estimatedHours: '2 Hours',
      status: 'todo',
      acceptanceCriteria: [
        'Configure healthchecks for PostgreSQL (pg_isready) and Redis (redis-cli ping).',
        'Use condition: service_healthy to ensure zero-crash cold starts.'
      ],
      codeSnippet: {
        language: 'yaml',
        filename: 'docker-compose.yml',
        code: `version: '3.8'
services:
  api:
    build: .
    ports: ["8000:8000"]
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5
  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 5`
      }
    }
  ]
}

export const DEMO_VIVA_QUESTIONS: Record<string, VivaQuestion[]> = {
  'persona-1': [
    {
      id: 'viva-1',
      questionNumber: 1,
      category: 'Architectural Trade-Off',
      interrogatorPrompt:
        'In your ledger transfer service, why did you implement pessimistic row locking (with_for_update) instead of an optimistic concurrency pattern with version check retries?',
      targetCodeReference: 'services/ledger_service.py: L12-L24 (SELECT ... FOR UPDATE)',
      candidateSpokenAnswer:
        'In financial banking ledgers with high contention on merchant or settlement accounts, optimistic concurrency causes frequent serialization failures and retry storms. By using pessimistic row locking with deterministic ID sorting (sorting sender_id and recipient_id), we completely eliminate cross-transaction deadlocks while guaranteeing strict ACID isolation at sub-10ms latency.',
      aiEvaluation: {
        accuracyScore: 94,
        clarityScore: 92,
        verdict: 'Verified Authentic Understanding',
        keyObservation:
          'Candidate correctly articulated deadlock prevention via deterministic lock acquisition ordering and avoided standard textbook boilerplate.'
      }
    },
    {
      id: 'viva-2',
      questionNumber: 2,
      category: 'Failure Handling & Edge Cases',
      interrogatorPrompt:
        'Explain how your FastAPI router handles network drops between the client debit and the Redis idempotency cache write. How is a double-debit prevented?',
      targetCodeReference: 'routers/transfers.py: L8-L19 (X-Idempotency-Key Header & Redis SETEX)',
      candidateSpokenAnswer:
        'The idempotency key is evaluated before database mutation begins. If the network drops after the atomic ledger commit but before the HTTP 200 is returned to the client, the client-side retry sends the identical X-Idempotency-Key. Our middleware checks Redis, detects the cached transaction receipt, and returns the previous result without invoking execute_atomic_transfer again.',
      aiEvaluation: {
        accuracyScore: 91,
        clarityScore: 89,
        verdict: 'Verified Authentic Understanding',
        keyObservation:
          'Proves solid grasp of distributed state consistency and client retry semantics.'
      }
    },
    {
      id: 'viva-3',
      questionNumber: 3,
      category: 'Scalability & Deployment',
      interrogatorPrompt:
        'In your Docker deployment stack, what was your rationale for using a distroless multi-stage build rather than standard Alpine or Ubuntu images?',
      targetCodeReference: 'Dockerfile: Multi-Stage Builder & Non-Root Execution',
      candidateSpokenAnswer:
        'Standard OS images include package managers, shell binaries, and compilers that increase CVE vulnerability surfaces and image size. Our multi-stage build compiles dependencies in a builder stage and copies only the minimal virtualenv into a distroless runner with a dedicated non-root UID 10001. This keeps the production container under 120MB and prevents container breakout vulnerabilities in production clusters.',
      aiEvaluation: {
        accuracyScore: 95,
        clarityScore: 93,
        verdict: 'Verified Authentic Understanding',
        keyObservation:
          'Strong security posture aligning with enterprise FinTech compliance standards.'
      }
    }
  ]
}

export const DEMO_RECRUITER_DOSSIERS: Record<string, RecruiterDossier> = {
  'persona-1': {
    candidateId: 'persona-1',
    overallDayZeroScore: 94,
    readinessBand: 'Day-Zero Operational Ready',
    authorshipStatus: 'VERIFIED_HUMAN_AUTHORED',
    dpdpCertificationId: 'DPDP-IND-2026-8841',
    shareableUrl: 'talentforge.ai/verify/tf-8841',
    businessTranslations: [
      {
        technicalFeature: 'PostgreSQL B-Tree Indexing & Pessimistic Row Locking',
        businessValue: 'Eliminates double-debit race conditions on customer accounts during high-volume transaction bursts.',
        riskMitigated: 'Prevents financial ledger inconsistencies, settlement delays, and customer account overdraft fraud.'
      },
      {
        technicalFeature: 'FastAPI Idempotency Router & Redis Token Caching',
        businessValue: 'Guarantees that network drops or mobile payment retries never trigger duplicate payment deductions.',
        riskMitigated: 'Eliminates payment gateway chargebacks and customer dispute support escalations.'
      },
      {
        technicalFeature: 'Multi-Stage Distroless Docker Packaging & Healthchecks',
        businessValue: 'Reduces enterprise cloud hosting footprint by 65% while ensuring sub-3-second container auto-recovery.',
        riskMitigated: 'Protects production servers against container breakout vulnerabilities, satisfying RBI/ISO FinTech security audits.'
      }
    ],
    technicalChecklist: [
      { name: 'Schema & Indexing', status: 'VERIFIED', detail: 'Composite B-tree indexing on ledger_entries(account_id, created_at DESC) tested.' },
      { name: 'Concurrency Control', status: 'VERIFIED', detail: 'SELECT ... FOR UPDATE with deterministic lock ordering verified with 20 parallel threads.' },
      { name: 'Asynchronous Queues', status: 'VERIFIED', detail: 'Redis Streams consumer worker with exponential backoff and dead-letter queue routing.' },
      { name: 'Oral Defense Viva', status: 'VERIFIED', detail: 'Candidate verbally defended 3 architectural trade-offs; scored 93% accuracy with 0% AI plagiarism risk.' }
    ]
  }
}

export const DEMO_VERIFIED_URLS: Record<string, VerifiedSubmissionUrls> = {
  'persona-1': {
    repoUrl: 'https://github.com/aarav-sharma/apex-fintech-ledger',
    liveDemoUrl: 'https://apex-ledger-demo.internal-staging.dev',
    branchName: 'main',
    lastCommitHash: '8f4b61c',
    buildStatus: 'VERIFIED',
    astMatchScore: 98,
  },
  'persona-2': {
    repoUrl: 'https://github.com/sneha-reddy/enterprise-workflow-sync',
    liveDemoUrl: 'https://workflow-sync-demo.internal-staging.dev',
    branchName: 'main',
    lastCommitHash: '4e8a1b9',
    buildStatus: 'VERIFIED',
    astMatchScore: 95,
  },
  'persona-3': {
    repoUrl: 'https://github.com/vikram-malhotra/distributed-dashboard-core',
    liveDemoUrl: 'https://dashboard-core-demo.internal-staging.dev',
    branchName: 'main',
    lastCommitHash: '9c3b5d2',
    buildStatus: 'VERIFIED',
    astMatchScore: 94,
  },
  'persona-4': {
    repoUrl: 'https://github.com/ananya-iyer/qdrant-rag-service',
    liveDemoUrl: 'https://synthetix-rag-demo.internal-staging.dev',
    branchName: 'main',
    lastCommitHash: '2d8f9a1',
    buildStatus: 'VERIFIED',
    astMatchScore: 96,
  },
  'persona-5': {
    repoUrl: 'https://github.com/rohan-verma-dev/distributed-order-bus',
    liveDemoUrl: 'https://order-bus-demo.internal-staging.dev',
    branchName: 'main',
    lastCommitHash: '3a7c4e5',
    buildStatus: 'VERIFIED',
    astMatchScore: 99,
  },
}

export const DEMO_PERSONAS: CandidatePersona[] = [
  {
    id: 'persona-1',
    name: 'Aarav Sharma',
    archetype: 'Tier-3 Engineering Fresher (B.Tech CS)',
    education: 'B.Tech Computer Science, Regional Institute of Technology (2026 Grad)',
    phone: '+91 98765 43210',
    email: 'aarav.sharma.dev@gmail.com',
    location: 'Chennai, Tamil Nadu, India',
    hasPortfolio: false,
    rawResumeText: `AARAV SHARMA
Email: aarav.sharma.dev@gmail.com | Phone: +91 98765 43210 | Location: Chennai, Tamil Nadu
Education: Regional Institute of Technology (Autonomous), B.Tech CSE (GPA: 7.8/10)

TECHNICAL SKILLS:
Languages: Python, JavaScript, SQL
Frameworks: Flask, Express.js (Academic mini-projects)
Databases: MySQL, SQLite (Basic CRUD)
Tools: Git, Postman, Linux CLI

ACADEMIC COURSEWORK & MINI-PROJECTS:
- College Library Management System: Created basic CRUD application using Python Flask and SQLite.
- Student Attendance Tracker: Built a simple UI in HTML/CSS with JavaScript fetch calls.
*Note: No active deployment or enterprise production repositories available on GitHub.*`,
    sanitizedResumeText: `[REDACTED_CANDIDATE_NAME]
Email: [REDACTED_EMAIL_TOKEN] | Phone: [REDACTED_PHONE_TOKEN] | Location: [REDACTED_LOCATION_TOKEN]
Education: [REDACTED_INSTITUTION_TOKEN], B.Tech CSE (GPA: 7.8/10)

TECHNICAL SKILLS:
Languages: Python, JavaScript, SQL
Frameworks: Flask, Express.js (Academic mini-projects)
Databases: MySQL, SQLite (Basic CRUD)
Tools: Git, Postman, Linux CLI

ACADEMIC COURSEWORK & MINI-PROJECTS:
- College Library Management System: Created basic CRUD application using Python Flask and SQLite.
- Student Attendance Tracker: Built a simple UI in HTML/CSS with JavaScript fetch calls.
*Note: Zero verified enterprise production projects detected.*`,
    redactedTokens: [
      { type: 'NAME', raw: 'Aarav Sharma', token: '[REDACTED_CANDIDATE_NAME]' },
      { type: 'PHONE', raw: '+91 98765 43210', token: '[REDACTED_PHONE_TOKEN]' },
      { type: 'EMAIL', raw: 'aarav.sharma.dev@gmail.com', token: '[REDACTED_EMAIL_TOKEN]' },
      { type: 'LOCATION', raw: 'Chennai, Tamil Nadu', token: '[REDACTED_LOCATION_TOKEN]' },
      { type: 'COLLEGE', raw: 'Regional Institute of Technology (Autonomous)', token: '[REDACTED_INSTITUTION_TOKEN]' },
    ],
    targetJob: {
      title: 'Junior Backend & Cloud Platform Engineer',
      company: 'Apex FinTech Solutions (Banking Division)',
      clientTier: 'Enterprise Fortune 500',
      experienceRequired: '0-1 Years (Day-Zero Operational)',
      location: 'Bengaluru / Hybrid',
      overview: 'Develop scalable asynchronous financial transaction pipelines, indexed relational models, and containerized microservices handling payment ledgers.',
      requiredStack: ['FastAPI / Python', 'PostgreSQL (ACID & Indexing)', 'Redis / Asynchronous Queues', 'Docker & CI/CD'],
      keyResponsibilities: [
        'Design optimized relational schemas with composite indexing for sub-10ms ledger queries.',
        'Implement resilient token authentication, rate limiting, and request sanitization.',
        'Manage asynchronous background workers for transaction event logging and webhooks.'
      ],
    },
    gapAnalysis: {
      matchScore: 54,
      readinessBand: 'Bridging Sprint Needed',
      acquiredSkills: ['Python Core', 'Basic SQL Syntax', 'REST Concepts', 'Git Basics'],
      criticalGaps: [
        { skill: 'Relational Indexing & Concurrency', priority: 'Critical', impact: 'Candidate only knows basic SQLite CRUD; lacks composite B-tree indexing & ACID isolation needed for FinTech.' },
        { skill: 'Asynchronous Task Queues (Redis/Celery)', priority: 'High', impact: 'No experience with background worker pipelines or task queue decoupling.' },
        { skill: 'Docker Containerization & Testing', priority: 'High', impact: 'Zero verified unit testing suites or containerization configurations in profile.' }
      ],
      dpdpComplianceStatus: 'VERIFIED_COMPLIANT',
      purgedTokensCount: 5,
      recommendedAction: 'spec_scaffolder'
    }
  },
  {
    id: 'persona-2',
    name: 'Sneha Reddy',
    archetype: 'Coding Bootcamp Career Switcher',
    education: 'B.Com Graduate -> 24-Week Fullstack Immersive Graduate',
    phone: '+91 98450 11223',
    email: 'sneha.reddy.works@outlook.com',
    location: 'Hyderabad, Telangana, India',
    hasPortfolio: false,
    rawResumeText: `SNEHA REDDY
Email: sneha.reddy.works@outlook.com | Phone: +91 98450 11223 | Hyderabad, India
Profile: Transitioned from financial analysis to software engineering via intensive MERN program.

SKILLS:
Frontend: React.js, Tailwind CSS, TypeScript
Backend: Node.js, Express, MongoDB (Mongoose)
APIs: REST, JSON Web Tokens (JWT)

PORTFOLIO WORK:
- E-Commerce Clone: Tutorial-scaffolded shopping cart with MongoDB Atlas.
- Task Management App: Kanban board using React local state.
*Notice: Code repos mirror standard boilerplate bootcamp tutorials without custom architecture.*`,
    sanitizedResumeText: `[REDACTED_CANDIDATE_NAME]
Email: [REDACTED_EMAIL_TOKEN] | Phone: [REDACTED_PHONE_TOKEN] | [REDACTED_LOCATION_TOKEN]
Profile: Transitioned from financial analysis to software engineering via intensive MERN program.

SKILLS:
Frontend: React.js, Tailwind CSS, TypeScript
Backend: Node.js, Express, MongoDB (Mongoose)
APIs: REST, JSON Web Tokens (JWT)

PORTFOLIO WORK:
- E-Commerce Clone: Tutorial-scaffolded shopping cart with MongoDB Atlas.
- Task Management App: Kanban board using React local state.
*Notice: Code repos mirror standard boilerplate bootcamp tutorials without custom architecture.*`,
    redactedTokens: [
      { type: 'NAME', raw: 'Sneha Reddy', token: '[REDACTED_CANDIDATE_NAME]' },
      { type: 'PHONE', raw: '+91 98450 11223', token: '[REDACTED_PHONE_TOKEN]' },
      { type: 'EMAIL', raw: 'sneha.reddy.works@outlook.com', token: '[REDACTED_EMAIL_TOKEN]' },
      { type: 'LOCATION', raw: 'Hyderabad, India', token: '[REDACTED_LOCATION_TOKEN]' },
    ],
    targetJob: {
      title: 'Fullstack Microservices Engineer',
      company: 'Kredo Logistics Tech',
      clientTier: 'Series B Scaleup',
      experienceRequired: '0-2 Years',
      location: 'Hyderabad / Remote',
      overview: 'Build high-performance recruitment matching workflows using React, TypeScript, Node.js, and PostgreSQL.',
      requiredStack: ['React 18 & TypeScript', 'Node.js / NestJS', 'PostgreSQL / Prisma ORM', 'Redis Cache Invalidation'],
      keyResponsibilities: [
        'Replace document-store clones with normalized SQL models and automated migrations.',
        'Implement server-side state synchronization with optimistic UI updates.',
        'Write end-to-end integration tests using Vitest and Playwright.'
      ],
    },
    gapAnalysis: {
      matchScore: 61,
      readinessBand: 'Bridging Sprint Needed',
      acquiredSkills: ['React Component Logic', 'Tailwind CSS', 'Node.js Basics', 'REST Endpoints'],
      criticalGaps: [
        { skill: 'Normalized SQL & Migration Management', priority: 'Critical', impact: 'Bootcamp relied on unindexed MongoDB; lacks schema migration and relational foreign keys.' },
        { skill: 'Distributed Cache Invalidation (Redis)', priority: 'High', impact: 'No practical handling of distributed session storage or cache invalidation.' },
        { skill: 'Automated Integration Testing', priority: 'Medium', impact: 'Absence of unit or integration test assertions in codebase.' }
      ],
      dpdpComplianceStatus: 'VERIFIED_COMPLIANT',
      purgedTokensCount: 4,
      recommendedAction: 'spec_scaffolder'
    }
  },
  {
    id: 'persona-3',
    name: 'Vikram Malhotra',
    archetype: 'Self-Taught Frontend Developer',
    education: 'B.Sc Physics, Delhi University (Self-Taught Coder)',
    phone: '+91 97110 33445',
    email: 'vikram.malhotra.web@gmail.com',
    location: 'New Delhi, India',
    hasPortfolio: false,
    rawResumeText: `VIKRAM MALHOTRA
Phone: +91 97110 33445 | Email: vikram.malhotra.web@gmail.com | New Delhi, India

TECHNICAL COMPETENCIES:
- HTML5, Modern CSS, Responsive Design, Tailwind CSS
- JavaScript ES6+, React, Next.js (App Router)
- Client-side state (Zustand, Context API)

PRACTICAL EXPERIENCE:
- Freelance Landing Pages for local businesses (static sites).
- Interactive Weather Widget using OpenWeatherMap API.
*Gap Note: Zero backend services, database design, or container deployments.*`,
    sanitizedResumeText: `[REDACTED_CANDIDATE_NAME]
Phone: [REDACTED_PHONE_TOKEN] | Email: [REDACTED_EMAIL_TOKEN] | [REDACTED_LOCATION_TOKEN]

TECHNICAL COMPETENCIES:
- HTML5, Modern CSS, Responsive Design, Tailwind CSS
- JavaScript ES6+, React, Next.js (App Router)
- Client-side state (Zustand, Context API)

PRACTICAL EXPERIENCE:
- Freelance Landing Pages for local businesses (static sites).
- Interactive Weather Widget using OpenWeatherMap API.
*Gap Note: Zero backend services, database design, or container deployments.*`,
    redactedTokens: [
      { type: 'NAME', raw: 'Vikram Malhotra', token: '[REDACTED_CANDIDATE_NAME]' },
      { type: 'PHONE', raw: '+91 97110 33445', token: '[REDACTED_PHONE_TOKEN]' },
      { type: 'EMAIL', raw: 'vikram.malhotra.web@gmail.com', token: '[REDACTED_EMAIL_TOKEN]' },
      { type: 'LOCATION', raw: 'New Delhi, India', token: '[REDACTED_LOCATION_TOKEN]' },
    ],
    targetJob: {
      title: 'Fullstack Next.js Cloud Engineer',
      company: 'Strata Cloud Services Group',
      clientTier: 'Global IT Conglomerate',
      experienceRequired: '1 Year Day-Zero Ready',
      location: 'Noida / Hybrid',
      overview: 'Develop customer portal features with full-stack Next.js, Server Actions, PostgreSQL, and secure auth handlers.',
      requiredStack: ['Next.js App Router', 'Server Actions & Zod', 'PostgreSQL / Supabase', 'Docker & Security Guardrails'],
      keyResponsibilities: [
        'Secure APIs with server-side validation and CSRF/CORS policies.',
        'Implement database transactions with ACID integrity.',
        'Deploy resilient Dockerized environments across cloud nodes.'
      ],
    },
    gapAnalysis: {
      matchScore: 48,
      readinessBand: 'Remediation Required',
      acquiredSkills: ['React / Next.js UI', 'Tailwind CSS', 'Client State Management'],
      criticalGaps: [
        { skill: 'Server-Side Validation & Security Policies', priority: 'Critical', impact: 'Candidate relies solely on frontend form checks; vulnerable to parameter tampering.' },
        { skill: 'Relational Database Schema Design', priority: 'Critical', impact: 'Has never authored a database schema or migration script.' },
        { skill: 'Containerization (Docker)', priority: 'High', impact: 'Unable to package application for cloud deployment.' }
      ],
      dpdpComplianceStatus: 'VERIFIED_COMPLIANT',
      purgedTokensCount: 4,
      recommendedAction: 'spec_scaffolder'
    }
  },
  {
    id: 'persona-4',
    name: 'Ananya Iyer',
    archetype: 'AI & Data Science Graduate',
    education: 'M.Sc Artificial Intelligence, Pune University',
    phone: '+91 99220 55667',
    email: 'ananya.iyer.ai@proton.me',
    location: 'Pune, Maharashtra, India',
    hasPortfolio: false,
    rawResumeText: `ANANYA IYER
Contact: +91 99220 55667 | ananya.iyer.ai@proton.me | Pune, Maharashtra
Education: M.Sc in Artificial Intelligence (Distinction, 8.4 CGPA)

SPECIALIZATIONS:
- Machine Learning, PyTorch, Scikit-Learn, Pandas, NumPy
- LLM Prompting, LangChain, HuggingFace Transformers
- Jupyter Notebooks, Matplotlib Data Visualizations

RESEARCH PROJECTS:
- Sentiment Analysis on Product Reviews using BERT (Jupyter Notebook)
- Medical Report Summarizer using OpenAI API in Google Colab.
*Structural Limitation: Highly proficient in scientific notebooks, but lacks production API serving.*`,
    sanitizedResumeText: `[REDACTED_CANDIDATE_NAME]
Contact: [REDACTED_PHONE_TOKEN] | [REDACTED_EMAIL_TOKEN] | [REDACTED_LOCATION_TOKEN]
Education: M.Sc in Artificial Intelligence (Distinction, 8.4 CGPA)

SPECIALIZATIONS:
- Machine Learning, PyTorch, Scikit-Learn, Pandas, NumPy
- LLM Prompting, LangChain, HuggingFace Transformers
- Jupyter Notebooks, Matplotlib Data Visualizations

RESEARCH PROJECTS:
- Sentiment Analysis on Product Reviews using BERT (Jupyter Notebook)
- Medical Report Summarizer using OpenAI API in Google Colab.
*Structural Limitation: Highly proficient in scientific notebooks, but lacks production API serving.*`,
    redactedTokens: [
      { type: 'NAME', raw: 'Ananya Iyer', token: '[REDACTED_CANDIDATE_NAME]' },
      { type: 'PHONE', raw: '+91 99220 55667', token: '[REDACTED_PHONE_TOKEN]' },
      { type: 'EMAIL', raw: 'ananya.iyer.ai@proton.me', token: '[REDACTED_EMAIL_TOKEN]' },
      { type: 'LOCATION', raw: 'Pune, Maharashtra', token: '[REDACTED_LOCATION_TOKEN]' },
    ],
    targetJob: {
      title: 'Applied AI & Production Systems Engineer',
      company: 'Synthetix AI Innovation Labs',
      clientTier: 'Enterprise Fortune 500',
      experienceRequired: '0-1 Years',
      location: 'Bengaluru / Pune',
      overview: 'Bridge machine learning models to production REST/gRPC endpoints with streaming responses and vector indexing.',
      requiredStack: ['FastAPI / Uvicorn', 'Qdrant / pgvector', 'Pydantic V2 Schemas', 'Dockerized GPU/CPU Inference'],
      keyResponsibilities: [
        'Wrap model inferences in asynchronous FastAPI endpoints with strict schema validation.',
        'Implement vector embedding indexing and retrieval with sub-50ms latencies.',
        'Build background worker pipelines for batched embedding calculations.'
      ],
    },
    gapAnalysis: {
      matchScore: 68,
      readinessBand: 'Bridging Sprint Needed',
      acquiredSkills: ['Python & PyTorch', 'LLM Concepts', 'Data Processing', 'Jupyter Analysis'],
      criticalGaps: [
        { skill: 'Production API Serving (FastAPI/Uvicorn)', priority: 'Critical', impact: 'Candidate works in static Jupyter cells; lacks async event loops and server lifecycle management.' },
        { skill: 'Vector Database Indexing (pgvector/Qdrant)', priority: 'High', impact: 'No practical experience in vector similarity search and similarity distance indexing.' },
        { skill: 'Production Microservice Dockerization', priority: 'High', impact: 'Has not configured multi-stage Docker builds or healthcheck probes.' }
      ],
      dpdpComplianceStatus: 'VERIFIED_COMPLIANT',
      purgedTokensCount: 4,
      recommendedAction: 'spec_scaffolder'
    }
  },
  {
    id: 'persona-5',
    name: 'Rohan Verma',
    archetype: 'Junior Dev with Existing Git Repository',
    education: 'B.Tech IT, Anna University Chennai',
    phone: '+91 94440 77889',
    email: 'rohan.verma.code@gmail.com',
    location: 'Chennai, Tamil Nadu, India',
    hasPortfolio: true,
    rawResumeText: `ROHAN VERMA
Email: rohan.verma.code@gmail.com | Phone: +91 94440 77889 | Chennai, India
GitHub: github.com/rohan-verma-dev/distributed-order-bus

PROFILE:
Backend developer with 1 open-source repository featuring event-driven architecture.

FEATURED REPOSITORY:
- Distributed Order Bus (github.com/rohan-verma-dev/distributed-order-bus)
  * Implemented FastAPI service with Redis Streams and PostgreSQL order ledger.
  * Docker Compose setup with healthchecks and JWT authorization.
*Authenticity Risk: Repository uses standard patterns resembling AI-scaffolded boilerplate. Requires Code-Defend oral verification.*`,
    sanitizedResumeText: `[REDACTED_CANDIDATE_NAME]
Email: [REDACTED_EMAIL_TOKEN] | Phone: [REDACTED_PHONE_TOKEN] | [REDACTED_LOCATION_TOKEN]
GitHub: [REDACTED_GITHUB_URL]

PROFILE:
Backend developer with 1 open-source repository featuring event-driven architecture.

FEATURED REPOSITORY:
- Distributed Order Bus ([REDACTED_GITHUB_URL])
  * Implemented FastAPI service with Redis Streams and PostgreSQL order ledger.
  * Docker Compose setup with healthchecks and JWT authorization.
*Authenticity Risk: Repository uses standard patterns resembling AI-scaffolded boilerplate. Requires Code-Defend oral verification.*`,
    redactedTokens: [
      { type: 'NAME', raw: 'Rohan Verma', token: '[REDACTED_CANDIDATE_NAME]' },
      { type: 'PHONE', raw: '+91 94440 77889', token: '[REDACTED_PHONE_TOKEN]' },
      { type: 'EMAIL', raw: 'rohan.verma.code@gmail.com', token: '[REDACTED_EMAIL_TOKEN]' },
      { type: 'LOCATION', raw: 'Chennai, India', token: '[REDACTED_LOCATION_TOKEN]' },
    ],
    targetJob: {
      title: 'High-Concurrency Backend Systems Engineer',
      company: 'Zenith Enterprise Logistics',
      clientTier: 'Enterprise Fortune 500',
      experienceRequired: '1 Year Day-Zero Ready',
      location: 'Chennai / Hybrid',
      overview: 'Develop resilient distributed ledger services with strict transaction guarantees and real-time event streaming.',
      requiredStack: ['FastAPI & AsyncIO', 'PostgreSQL & Row-Level Locking', 'Redis Streams', 'Docker & Kubernetes'],
      keyResponsibilities: [
        'Defend architectural choices regarding database concurrency and idempotent event consumers.',
        'Optimize connection pools and prevent deadlocks during high-burst order processing.',
        'Ensure verified authorship and operational defense of all repository code.'
      ],
    },
    gapAnalysis: {
      matchScore: 82,
      readinessBand: 'Day-Zero Ready',
      acquiredSkills: ['FastAPI Async', 'PostgreSQL Schema', 'Redis Streams', 'Docker Compose'],
      criticalGaps: [
        { skill: 'Architectural Authorship Verification', priority: 'Critical', impact: 'Candidate has production code on GitHub, but employer requires Code-Defend oral defense to rule out AI plagiarism.' }
      ],
      dpdpComplianceStatus: 'VERIFIED_COMPLIANT',
      purgedTokensCount: 4,
      recommendedAction: 'code_defend'
    }
  }
]
