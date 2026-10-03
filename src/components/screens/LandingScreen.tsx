import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  ArrowRight,
  FileText,
  AlertTriangle,
  Server,
  Lock,
  ChevronRight,
} from 'lucide-react'

interface LandingScreenProps {
  onStartWalkthrough: () => void
  onNavigateToScreen: (screen: 'intake' | 'kanban' | 'viva' | 'recruiter') => void
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartWalkthrough,
  onNavigateToScreen,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-12">
      {/* HERO SECTION */}
      <section className="text-center space-y-4 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
          <Badge variant="outline" className="text-[10px] py-0 px-1 font-mono uppercase">
            Founder's Code 2026
          </Badge>
          <span>The Future of Work Track • SMIT &amp; CIEL HR Group</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
          Automated Day-Zero Readiness &amp; Technical Verification Engine
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bridging the 82% Day-Zero skills gap in early-career technical hiring by moving beyond passive keyword filtering to active sprint scaffolding and real-time oral defense.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button onClick={onStartWalkthrough} size="sm" className="gap-2 text-xs h-9 px-4">
            <span>Launch Interactive Prototype Walkthrough</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateToScreen('recruiter')}
            className="text-xs h-9 px-4 text-muted-foreground hover:text-foreground"
          >
            <span>View CIEL HR Recruiter Dossier</span>
          </Button>
        </div>

        {/* Prototype Notice */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-muted/60 text-[11px] text-muted-foreground border">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Selection Round Prototype: 100% Client-Side Simulation Mode • Zero API Key Dependency</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* ACT 1: THE MACRO PROBLEM */}
      <section className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
            Act 1: The Macro Industry Bottlenecks
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">The Early-Career Technical Hiring Crisis</h2>
          <p className="text-xs text-muted-foreground">
            Authoritative industry data validating high-friction pain points across academia and enterprise hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Card className="bg-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">The 82% Day-Zero Skills Deficit</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <p>
                While 1.5 million engineering graduates enter the Indian technical workforce annually, national employability benchmarks reveal an <strong>82% Day-Zero operational skills deficit</strong>.
              </p>
              <p className="text-[11px] text-foreground/80">
                Curricula teach theoretical concepts; employers demand production concurrency, indexed schemas, and containerization.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">The Portfolio Authenticity Crisis</CardTitle>
                <Lock className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <p>
                While 80% of employers prioritize project experience, generative AI coding assistants have made static GitHub repositories untrustworthy.
              </p>
              <p className="text-[11px] text-foreground/80">
                Candidates can scaffold enterprise codebases without comprehending the underlying architectural trade-offs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">The Passive Rejection Vacuum</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <p>
                Automated ATS filters screen out early-career talent using rigid keyword algorithms without actionable feedback on missing competencies.
              </p>
              <p className="text-[11px] text-foreground/80">
                Graduates are left without structured guidance on what exact projects to build to bridge their qualification gaps.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">The Recruiter Evaluation Disconnect</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <p>
                Non-technical HR screeners and talent acquisition managers lack the engineering background to evaluate raw Git trees or judge architectural quality.
              </p>
              <p className="text-[11px] text-foreground/80">
                High-potential talent is misidentified or overlooked due to the absence of a plain-English business-impact translation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ACT 2: PROPOSED SOLUTION & PIPELINE */}
      <section className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
            Act 2: The Proposed Solution
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">The TalentForge Verification Loop</h2>
          <p className="text-xs text-muted-foreground">
            An automated 4-stage pipeline closing the gap from empty portfolio to verified Day-Zero talent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Module 1 */}
          <Card
            className="cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => onNavigateToScreen('intake')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">1</span>
                  <CardTitle className="text-sm font-semibold">Intake &amp; DPDP Gateway</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Strips candidate PII locally to strictly satisfy India's DPDP Act 2023, while isolating concrete missing competencies against enterprise job specifications.
            </CardContent>
          </Card>

          {/* Module 2 */}
          <Card
            className="cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => onNavigateToScreen('kanban')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">2</span>
                  <CardTitle className="text-sm font-semibold">Spec-Driven Scaffolder</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Bypasses passive tutorials and synthesizes a structured 3-Sprint Kanban blueprint (Schema, APIs, Deployment) directly mapped to the target job requirements.
            </CardContent>
          </Card>

          {/* Module 3 */}
          <Card
            className="cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => onNavigateToScreen('viva')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">3</span>
                  <CardTitle className="text-sm font-semibold">Code-Defend Protocol</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Establishes a legal digital trust declaration and conducts a 5-minute automated oral defense interrogating concrete code choices to rule out AI plagiarism.
            </CardContent>
          </Card>

          {/* Module 4 */}
          <Card
            className="cursor-pointer hover:border-foreground/30 transition-colors"
            onClick={() => onNavigateToScreen('recruiter')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">4</span>
                  <CardTitle className="text-sm font-semibold">Recruiter Verification Artifact</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Translates technical engineering code into plain-English business impact statements and issues a verified 94/100 Day-Zero score for CIEL HR corporate recruiters.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ACT 3: PROTOTYPE VS. PLANNED PRODUCTION */}
      <section className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
            Act 3: Technical Execution &amp; Roadmap
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">Interactive Prototype vs. Production Architecture</h2>
          <p className="text-xs text-muted-foreground">
            Clear delineation between what is built today for the hackathon demonstration and what will be deployed in the scalable enterprise rollout.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/60 p-3 text-xs font-semibold border-b text-foreground">
            <span>System Layer</span>
            <span>Current Hackathon Prototype</span>
            <span>Planned Production Architecture</span>
          </div>

          <div className="divide-y text-xs">
            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Frontend App</span>
              <span className="text-muted-foreground">React 19, Vite, Tailwind v4, Shadcn UI</span>
              <span className="text-foreground">Next.js 15 App Router with Edge SSR &amp; PWA</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">Backend Services</span>
              <span className="text-muted-foreground">Isolated memory data store (zero latency)</span>
              <span className="text-foreground">Python FastAPI async gateway with Pydantic v2</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Data Privacy</span>
              <span className="text-muted-foreground">In-browser regex PII sanitization</span>
              <span className="text-foreground">Local Python regex gateway (Indian DPDP Act 2023)</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">Persistence &amp; State</span>
              <span className="text-muted-foreground">Deterministic presets in demoData.ts</span>
              <span className="text-foreground">Supabase / PostgreSQL with RLS &amp; audit logs</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Oral Viva Engine</span>
              <span className="text-muted-foreground">Animated CSS waveform &amp; streaming text</span>
              <span className="text-foreground">Web Speech API &amp; bidirectional WebSockets</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">AI Orchestration</span>
              <span className="text-muted-foreground">Structured evaluation rubrics &amp; personas</span>
              <span className="text-foreground">Sovereign Small Language Models (SLMs) on Indian cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="p-6 rounded-xl bg-card border text-center space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground">Ready to Experience TalentForge?</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Test the complete end-to-end candidate intake, sprint scaffolding, voice defense, and recruiter verification loop.
          </p>
        </div>

        <Button onClick={onStartWalkthrough} size="sm" className="gap-2 text-xs h-9 px-5">
          <span>Start Walkthrough: Screen 1 (Candidate Intake)</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
