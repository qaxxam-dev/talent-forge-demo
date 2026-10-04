# TalentForge: Technical Verification Infrastructure for Existing Hiring Platforms

[![Live Demo](https://img.shields.io/badge/Live_Demo-talentforge.alqatech.in-2563EB.svg)](https://talentforge.alqatech.in)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Preset_bIm4yQd-black.svg)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Compliance](https://img.shields.io/badge/DPDP_Act_2023-Section_8_Verified-emerald.svg)](https://www.meity.gov.in/)
[![Presenter](https://img.shields.io/badge/Presenter-Izzadhin_Al_Qassam_A_S-violet.svg)](#hackathon-submission-dossier)

> **"We don't replace hiring platforms. We make them better at verifying technical talent."**  
> TalentForge is a technical verification and talent-readiness intelligence layer that existing hiring platforms (job portals, ATS platforms, and enterprise HR systems) can integrate into their workflows.

* **Live Hosted Prototype:** [https://talentforge.alqatech.in](https://talentforge.alqatech.in)  
* **Presenter:** Izzadhin Al Qassam A S (SMIT · Department of MBA in AI & Data Science)  
* **Track:** The Future of Work (Founder's Code 2026)

---

## 1. Product Positioning & Strategic Vision

```mermaid
flowchart TD
    subgraph Platforms["Existing Recruitment Platforms (ATS & Job Portals)"]
        P1["Job Portals & Networks<br/>(Naukri, LinkedIn, Indeed)"]
        P2["Applicant Tracking Systems<br/>(Greenhouse, Lever, Workday)"]
        P3["Enterprise HR & Campus Portals"]
    end

    Platforms -->|"1. Ingest Candidate Profile + Job Requirements"| TF["<b>TalentForge Verification Layer</b><br/><i>(Specialized Infrastructure API)</i>"]

    subgraph VerificationEngine["TalentForge Verification Engine"]
        direction LR
        V1["DPDP Act Local PII Sanitization"]
        V2["3-Sprint Spec Scaffolder"]
        V3["Code-Defend Spoken Viva"]
        V4["Zero-Trust Authorship Seal"]
        V1 --> V2 --> V3 --> V4
    end

    TF --- VerificationEngine

    VerificationEngine -->|"2. Emit Verified Capability Signal"| Dossier["<b>Executive Verification Dossier</b><br/>• 94/100 Day-Zero Operational Readiness<br/>• Plain-English Code-to-Business Impact<br/>• Audited SHA-256 Digital Verification Seal"]

    Dossier -->|"3. Webhook Updates Candidate Status (Shortlisted)"| Platforms

    classDef platformStyle fill:#f8fafc,stroke:#64748b,stroke-width:1.5px,color:#0f172a;
    classDef tfStyle fill:#2563eb,stroke:#1d4ed8,stroke-width:2px,color:#ffffff;
    classDef engineStyle fill:#eff6ff,stroke:#3b82f6,stroke-width:1.5px,color:#1e3a8a;
    classDef dossierStyle fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46;
    class P1,P2,P3 platformStyle;
    class TF tfStyle;
    class V1,V2,V3,V4 engineStyle;
    class Dossier dossierStyle;
```

```mermaid
graph LR
    subgraph Candidates["For Candidates"]
        C1["Demonstrate execution over claims"]
        C2["Turn skill gaps into 3-sprint evidence"]
        C3["Defend architectural decisions"]
    end
    subgraph Recruiters["For Recruiters"]
        R1["Plain-English business translation"]
        R2["Pre-verified Day-Zero score (94/100)"]
        R3["Zero time wasted reading raw Git diffs"]
    end
    subgraph Platforms["For Platforms"]
        P1["Plug-and-play API infrastructure"]
        P2["Zero need to build internal code sandboxes"]
        P3["Immediate technical vetting moat"]
    end
```

---

## 2. Macro Problem Statement: The Three Gaps

1. **The Skills Gap**: A degree or resume doesn't prove job-ready execution. While 1.5 million technical graduates enter the Indian workforce annually, national employability stands at 56.35%, leaving an 82% skills deficit for Day-Zero operational roles.
2. **The Evidence Gap**: A GitHub repository no longer proves the candidate understands the code. Generative AI assistants allow anyone to scaffold and push production-looking code without comprehending fundamental architectural trade-offs.
3. **The Evaluation Gap**: Recruiters lack the technical bandwidth to evaluate every code repository, while automated ATS filters passively reject applicants on keyword matches without constructive feedback.

---

## 3. The 5-Screen Verification Workflow

```mermaid
flowchart TD
    S1["<b>Screen 1: Candidate Intake & DPDP Gateway</b><br/>• In-memory local regex strips PII (DPDP Act 2023 Section 8)<br/>• Semantic Matcher isolates critical qualification gaps<br/>• Multi-persona selector across 5 Indian hiring archetypes"]
    
    S2["<b>Screen 2: Spec-Driven Sprint Kanban</b><br/>• Synthesizes 3-sprint engineering tasks: Schema, APIs, Deployment<br/>• Slide-over drawer exposes Acceptance Criteria & code snippets<br/>• 1-click Auto-Complete simulation helper for pitch mode"]

    S3["<b>Screen 3: Code-Defend Spoken Viva</b><br/>• Digital Trust Declaration & pre-assessment authorship pledge<br/>• 3 dynamic trade-off questions (e.g. Pessimistic vs Optimistic locks)<br/>• Web Speech API console with real-time waveform & AI scoring (94%)"]

    S4["<b>Screen 4: Authorship Confirmation & Telemetry</b><br/>• Zero-Trust AI Code Submission Policy enforcement<br/>• Automated GitHub commit signature check & live endpoint ping<br/>• Tamper-evident SHA-256 digital verification seal"]

    S5["<b>Screen 5: Recruiter Verification Dossier</b><br/>• Executive Day-Zero Capability Score (94/100)<br/>• Code-to-Business Translation: Converts code into risk mitigation<br/>• 1-click 'Fast-Track to Technical Round' ATS update webhook"]

    S1 -->|"Candidate lacks evidence"| S2
    S2 -->|"Build readiness 100%"| S3
    S1 -->|"Existing repo submitted"| S3
    S3 -->|"Oral viva defended"| S4
    S4 -->|"Authorship attested & sealed"| S5

    classDef s1 fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e3a8a;
    classDef s2 fill:#f5f3ff,stroke:#8b5cf6,stroke-width:2px,color:#4c1d95;
    classDef s3 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px,color:#78350f;
    classDef s4 fill:#fdf2f8,stroke:#ec4899,stroke-width:2px,color:#831843;
    classDef s5 fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46;
    class S1 s1;
    class S2 s2;
    class S3 s3;
    class S4 s4;
    class S5 s5;
```

---

## 4. System Architecture & Prototype Transparency

### Prototype Stack vs. Production Architecture

| System Layer | Current Working Prototype | Enterprise Production Roadmap |
| :--- | :--- | :--- |
| **Platform Integration** | Interactive demo persona selector & simulated intake | Bidirectional REST API & Webhook connectors for ATS |
| **Frontend UI** | React 19, Vite 8, Tailwind CSS v4, Shadcn UI (`bIm4yQd`) | Next.js 15 App Router with Edge SSR & embeddable widgets |
| **Backend / AI** | Isolated deterministic store (`src/data/demoData.ts`) | Python FastAPI asynchronous gateway + Sovereign 7B SLM |
| **Data Privacy** | In-browser regex token sanitizer (names, phones, emails) | Local Python regex tokenizer (DPDP Act 2023 Section 8) |
| **Database & Auth** | In-memory deterministic state | Supabase / PostgreSQL with RLS and immutable audit logs |
| **Viva Voice Engine** | Web Speech API & animated SVG/CSS waveform | Browser speech recognition & WebSocket audio streaming |
| **Verification Delivery** | Recruiter verification dossier screen | Signed, encrypted JSON payload pushed back to source ATS |

---

## 5. Local Quickstart & Setup Guide

### Prerequisites
* Node.js **v20+** or **v22+**
* npm **v9+** or **v10+**

### Installation & Run

```bash
# 1. Clone the repository and navigate to the frontend directory
git clone https://github.com/your-username/talent-forge.git
cd talent-forge/frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`** or test the live hosted deployment at **`https://talentforge.alqatech.in`**.

---

## 6. Project Directory Layout

```
talent-forge/
├── JURY_DEMO_SCRIPT.md           # 3-Minute Chronological Pitch Script & Q&A Defense
├── knowledge-base.md             # Comprehensive Event Profile & Architecture Specs
├── pitch_deck_content.md         # Canonical 10-Slide Deck Matching TalentForge.pptx
├── README.md                     # Project Overview & System Dossier
├── TalentForge Slides/
│   └── TalentForge.pptx          # Official 10-Slide Presentation Deck
└── frontend/                     # Complete React 19 + Shadcn UI Web Application
    ├── src/
    │   ├── components/
    │   │   ├── screens/
    │   │   │   ├── LandingScreen.tsx        # Storytelling Overview & Ecosystem Flow
    │   │   │   ├── IntakeScreen.tsx         # Screen 1: Intake & DPDP Compliance Gateway
    │   │   │   ├── KanbanScreen.tsx         # Screen 2: Spec-Driven Sprint Scaffolder
    │   │   │   ├── VivaScreen.tsx           # Screen 3: Code-Defend Oral Defense Engine
    │   │   │   ├── ConfirmationScreen.tsx   # Screen 4: Authorship Confirmation & Repo Checks
    │   │   │   └── RecruiterCardScreen.tsx  # Screen 5: Recruiter Verification Dossier
    │   │   └── ui/                          # Shadcn UI Primitives (Card, Button, Sheet, etc.)
    │   ├── data/
    │   │   └── demoData.ts                  # Isolated Store: 5 Personas, Sprints & Rubrics
    │   ├── App.tsx                          # Header, 5-Screen Router & Architecture HUD
    │   └── index.css                        # Shadcn Theme Variables (Preset bIm4yQd)
    └── package.json
```

---

## License
Distributed under the MIT License. See `LICENSE` for more information.
