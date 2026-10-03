# TalentForge: Automated Day-Zero Technical Verification Engine

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Preset_bIm4yQd-black.svg)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Compliance](https://img.shields.io/badge/DPDP_Act_2023-Section_8_Verified-emerald.svg)](https://www.meity.gov.in/)
[![Event](https://img.shields.io/badge/Founder's_Code-2026_Hackathon-orange.svg)](#hackathon-submission-dossier)

> **Bridging the 82% Day-Zero skills gap in early-career technical hiring by moving beyond passive keyword filtering to active sprint execution and real-time oral defense.**

---

## 1. The Macro Problem & Industry Bottlenecks

1. **The 82% Day-Zero Skills Deficit**: While 1.5 million technical graduates enter the Indian workforce annually, national employability stands at 56.35%, leaving an **82% skills shortage** for Day-Zero operational readiness. Academic curricula emphasize theoretical concepts, while enterprises require production-grade database indexing, asynchronous queues, and containerization.
2. **The Portfolio Authenticity Crisis (AI Code Inflation)**: While 80% of employers prioritize practical project experience over grades, generative AI coding assistants have made static GitHub repositories untrustworthy. Candidates can scaffold production-level code without comprehending the underlying architectural trade-offs.
3. **The Passive ATS Rejection Vacuum**: Automated Applicant Tracking Systems (ATS) screen out early-career talent using rigid keyword algorithms, providing zero actionable feedback on how to bridge specific competency gaps.
4. **The Recruiter Evaluation Disconnect**: Non-technical HR screeners and talent acquisition managers lack the engineering background to evaluate raw codebases or judge software quality, causing high-potential talent to be misidentified or rejected.

---

## 2. The Solution: The 4-Stage Verification Loop

TalentForge converts unstructured enterprise job descriptions into structured, buildable engineering specifications and audits submitted source code via real-time oral defense to deliver verified Day-Zero talent to employers.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                               TALENTFORGE PIPELINE                              │
└─────────────────────────────────────────────────────────────────────────────────┘
  [Job Description] + [Candidate Resume]
           │
           ▼
  ┌─────────────────────────────────────────────────────────┐
  │ 1. INTAKE & DPDP COMPLIANCE GATEWAY                     │
  │    - Strip PII via Local Regex (DPDP Act Compliance)    │
  │    - Extract Skill Gaps (Semantic Matcher)              │
  └────────────────────────┬────────────────────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
  [If Portfolio Exists]              [If Portfolio Is Missing]
  ┌───────────────────────────┐      ┌───────────────────────────┐
  │ 2A. REPOSITORY AUDITOR    │      │ 2B. SPEC-DRIVEN BUILDER   │
  │     - Ingest Codebase     │      │     - Synthesize 3-Sprint │
  │     - Map Business Impact │      │       Engineering Sprints │
  │     - Generate Audit Card │      │     - Emit Kanban Tasks   │
  └─────────────┬─────────────┘      └─────────────┬─────────────┘
                │                                  │ (Candidate Builds)
                └─────────────────┬────────────────┘
                                  ▼
  ┌─────────────────────────────────────────────────────────┐
  │ 3. CODE-DEFEND PROTOCOL                                 │
  │    - Digital Trust Declaration (Authorship Check)       │
  │    - Dynamic Question Generation (Repository-Specific)  │
  │    - 5-Min Web Speech Oral Defense Interrogation        │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │ 4. RECRUITER VERIFICATION ARTIFACT                      │
  │    - Verified "Day-Zero Capability Score" (94/100)      │
  │    - Code-to-Business Translation Summary               │
  │    - Audited Authorship & Plagiarism Elimination Seal   │
  └─────────────────────────────────────────────────────────┘
```

### Module 1: Intake & DPDP Compliance Gateway
* **Local PII Redaction**: To comply with India's **Digital Personal Data Protection (DPDP) Act 2023**, candidate resumes are processed through an in-memory regex tokenizer that strips names, phone numbers, emails, and locations before any AI processing.
* **Semantic Gap Isolation**: Compares the sanitized profile against target enterprise job descriptions, isolating concrete missing competencies (e.g., *Relational Indexing*, *Asynchronous Task Queues*, *Docker Containerization*).
* **Multi-Persona Testing**: Features 5 pre-loaded realistic Indian hiring archetypes with a 1-click **"🎲 Randomize Candidate & JD"** demo selector.

### Module 2: Spec-Driven Sprint Scaffolder
* **Architectural Blueprint Synthesis**: Bypasses passive video courses and synthesizes an interactive 3-Sprint Kanban roadmap tailored directly to the target role:
  * **Sprint 1 (Schema & Models)**: Relational DDL, composite B-tree indexing, and pessimistic row locking (`SELECT ... FOR UPDATE`).
  * **Sprint 2 (APIs & Controllers)**: Asynchronous FastAPI endpoints, idempotency key verification, and Redis queue workers.
  * **Sprint 3 (Deployment & Testing)**: Automated Pytest concurrency suites, distroless Docker packaging, and healthcheck probes.
* **Slide-Over Specification Drawer**: Clicking any task reveals formal **Acceptance Criteria**, estimated hours, and full deliverable code snippets.
* **Pitch Demo Helper**: Includes a **"⚡ Auto-Complete (Demo)"** button to instantly simulate 100% build readiness during live presentations.

### Module 3: The "Code-Defend" Authenticity Engine
* **Digital Trust Declaration**: Establishes a legally binding authorship pledge prior to oral interrogation.
* **Repository-Specific Interrogation**: Generates 3 dynamic architectural questions targeting concrete trade-offs in the candidate's sprint code (e.g., *pessimistic locking vs. optimistic concurrency*).
* **Voice Defense Console**: Features an animated sound waveform visualizer paired with real-time streaming spoken defense transcripts and instant AI rubric evaluation, eliminating AI-assisted plagiarism.

### Module 4: CIEL HR Recruiter Verification Artifact
* **Composite Day-Zero Score**: Issues an authoritative **94/100 Day-Zero Operational Readiness** rating.
* **Code-to-Business Translation Layer**: Translates technical code into plain-English commercial value and risk mitigation for non-technical recruiters (e.g., *"Eliminates double-debit race conditions on customer accounts during high-volume transaction bursts"*).
* **Recruiter Action Hub**: One-click **"⚡ Fast-Track to Technical Round"** (updates ATS status to Shortlisted) and **"📋 Copy Shareable Link"** (`talentforge.ai/verify/tf-8841`).

---

## 3. System Architecture & Prototype Transparency

### Hackathon Prototype vs. Planned Production Architecture

| System Layer | Current Hackathon Prototype | Planned Production Rollout |
| :--- | :--- | :--- |
| **Frontend UI** | React 19, Vite, Tailwind CSS v4, Shadcn UI (`bIm4yQd`) | Next.js 15 App Router with Edge SSR & PWA support |
| **Backend Services** | Isolated mock data store (`src/data/demoData.ts`) | Python FastAPI asynchronous processing gateway |
| **Data Privacy** | In-browser regex token sanitizer | Local Python regex tokenizer (DPDP Act 2023 Section 8) |
| **Database & Auth** | In-memory deterministic state | Supabase / PostgreSQL with RLS and immutable audit logs |
| **Viva Voice Engine** | Animated CSS waveform & streaming transcription | Web Speech API & bidirectional WebSocket audio streaming |
| **AI Orchestration** | Pre-computed evaluation rubrics & JSON schemas | Sovereign Small Language Models (SLMs) on Indian cloud |

### Planned Production API Contract & Database Schema

```typescript
// Planned FastAPI Endpoints (Ready for 1-to-1 swap with src/data/demoData.ts)
POST /api/v1/intake/sanitize       // Ingests raw resume, executes local regex, returns [REDACTED] tokens
POST /api/v1/gaps/analyze          // Compares sanitized resume against JD, returns match score & critical gaps
POST /api/v1/scaffolder/blueprint  // Generates 3-Sprint Kanban tasks with DDL and API code templates
POST /api/v1/viva/interrogate      // Conducts oral defense via WebSocket; scores accuracy and clarity
GET  /api/v1/verify/:certificateId // Generates public executive dossier for corporate hiring screeners
```

```sql
-- Planned Supabase / PostgreSQL Relational Schema
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sanitized_identifier VARCHAR(64) UNIQUE NOT NULL,
    target_role VARCHAR(128) NOT NULL,
    dpdp_compliance_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sprint_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id),
    sprint_phase VARCHAR(32) NOT NULL,
    code_artifact_url TEXT NOT NULL,
    ast_validation_status VARCHAR(16) DEFAULT 'VALIDATED'
);

CREATE TABLE viva_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id),
    oral_accuracy_score INT NOT NULL,
    authorship_status VARCHAR(32) DEFAULT 'VERIFIED_HUMAN_AUTHORED',
    defense_transcript TEXT NOT NULL
);
```

---

## 4. Local Quickstart & Setup Guide

### Prerequisites
* Node.js **v20+** or **v22+**
* npm **v9+** or **v10+**

### 2-Step Installation

```bash
# 1. Clone the repository and navigate to the frontend directory
git clone https://github.com/your-username/talent-forge.git
cd talent-forge/frontend

# 2. Install dependencies and start the local development server
npm install
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`** to access the complete interactive prototype.

---


## 5. Project Directory Layout

```
talent-forge/
└── frontend/                # Complete React 19 + Shadcn UI Web Application
    ├── src/
    │   ├── components/
    │   │   ├── screens/
    │   │   │   ├── LandingScreen.tsx       # Storytelling Overview & Macro Problem Arc
    │   │   │   ├── IntakeScreen.tsx        # Module 1: Intake & DPDP Compliance Gateway
    │   │   │   ├── KanbanScreen.tsx        # Module 2: Spec-Driven Sprint Scaffolder
    │   │   │   ├── VivaScreen.tsx          # Module 3: Code-Defend Oral Defense Engine
    │   │   │   └── RecruiterCardScreen.tsx # Module 4: CIEL HR Recruiter Verification Artifact
    │   │   └── ui/                         # Shadcn UI Primitives (Button, Card, Sheet, etc.)
    │   ├── data/
    │   │   └── demoData.ts                 # Isolated Store: 5 Personas, Sprints & Rubrics
    │   ├── App.tsx                         # Header, Screen Router & Architecture HUD
    │   └── index.css                       # Shadcn Theme Variables (Preset bIm4yQd)
    └── package.json
```

---

## License
Distributed under the MIT License. See `LICENSE` for more information.
