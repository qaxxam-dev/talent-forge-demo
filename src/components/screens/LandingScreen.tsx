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
  onNavigateToScreen: (screen: 'intake' | 'kanban' | 'viva' | 'confirmation' | 'recruiter') => void
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
          <span>The Future of Work Track • Technical Verification Layer</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
          Technical Verification for Modern Hiring
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Add technical verification to the hiring platforms you already use. TalentForge verifies whether technical candidates can actually demonstrate the skills they claim.
        </p>

        {/* Central Presentation Statement */}
        <div className="py-1">
          <div className="inline-block px-4 py-1.5 rounded-md bg-muted/80 border text-xs font-medium text-foreground">
            &ldquo;We don't replace hiring platforms. We make them better at verifying technical talent.&rdquo;
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
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
            <span>View Recruiter Verification Dossier</span>
          </Button>
        </div>

        {/* Prototype Notice */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-muted/60 text-[11px] text-muted-foreground border">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Integration-Ready Architecture Prototype: Client-side simulation mode with zero API key dependencies</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* 10-SECOND ECOSYSTEM INTEGRATION FLOW */}
      <section className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
            How It Works in 10 Seconds
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">Ecosystem Architecture: Where TalentForge Sits</h2>
          <p className="text-xs text-muted-foreground">
            Designed as an intelligence layer that integrates into existing hiring platforms rather than a standalone marketplace.
          </p>
        </div>

        <Card className="bg-card p-4 sm:p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center">
            {/* Step 1: Existing Platform */}
            <div className="p-3 rounded-lg bg-muted/50 border space-y-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Source System
              </span>
              <div className="font-semibold text-xs text-foreground">Existing Hiring Platform</div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                ATS, job portal, or enterprise HR system provides candidate profile and job requirements.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex justify-center text-muted-foreground">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Step 2: TalentForge Layer */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-1.5">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block">
                Verification Engine
              </span>
              <div className="font-semibold text-xs text-foreground">TalentForge Intelligence</div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                DPDP sanitization, role gap analysis, spec scaffolding, and live Code-Defend oral viva.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex justify-center text-muted-foreground">
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Step 3: Verified Return */}
            <div className="p-3 rounded-lg bg-muted/50 border space-y-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Destination
              </span>
              <div className="font-semibold text-xs text-foreground">Recruiter-Ready Signal</div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                Verified capability score, business impact summary, and authorship proof returned to hiring system.
              </p>
            </div>
          </div>
        </Card>
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
            Act 2: The Verification Loop
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">The 5-Stage Technical Verification Pipeline</h2>
          <p className="text-xs text-muted-foreground">
            A specialized capability designed to turn candidate evidence into high-confidence hiring signals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
            onClick={() => onNavigateToScreen('confirmation')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">4</span>
                  <CardTitle className="text-sm font-semibold">Authorship Confirmation</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Zero-trust policy requiring genuine authorship attestation, public Git repository &amp; live deployment endpoints, and cryptographic SHA-256 digital seals.
            </CardContent>
          </Card>

          {/* Module 5 */}
          <Card
            className="cursor-pointer hover:border-foreground/30 transition-colors sm:col-span-2 lg:col-span-2"
            onClick={() => onNavigateToScreen('recruiter')}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">5</span>
                  <CardTitle className="text-sm font-semibold">Recruiter Verification Dossier</CardTitle>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed">
              Translates technical engineering code into plain-English business impact statements, embeds verified codebase &amp; live preview links, and issues an audited Day-Zero capability score.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* ACT 3: INTEGRATION-READY ARCHITECTURE */}
      <section className="space-y-4">
        <div className="space-y-1">
          <Badge variant="outline" className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground">
            Act 3: Integration-Ready Architecture
          </Badge>
          <h2 className="text-lg font-semibold tracking-tight">Built to Plug In, Not Replace</h2>
          <p className="text-xs text-muted-foreground">
            Clear delineation between the current prototype and the future integration architecture for existing platforms.
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-muted/60 p-3 text-xs font-semibold border-b text-foreground">
            <span>System Layer</span>
            <span>Current Prototype</span>
            <span>Integration Architecture (Future)</span>
          </div>

          <div className="divide-y text-xs">
            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Platform Integration</span>
              <span className="text-muted-foreground">Interactive demo selector &amp; simulated intake</span>
              <span className="text-foreground">REST API &amp; Webhook connectors for ATS and job portals</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">Backend Gateway</span>
              <span className="text-muted-foreground">Isolated memory data store (zero latency)</span>
              <span className="text-foreground">Python FastAPI async gateway with Pydantic v2</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Data Privacy</span>
              <span className="text-muted-foreground">In-browser regex PII sanitization</span>
              <span className="text-foreground">Local Python regex gateway (Indian DPDP Act 2023)</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">State &amp; Audit Logs</span>
              <span className="text-muted-foreground">Deterministic presets in demoData.ts</span>
              <span className="text-foreground">Supabase / PostgreSQL with RLS &amp; immutable audit logs</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center">
              <span className="font-medium text-foreground">Oral Viva Engine</span>
              <span className="text-muted-foreground">Animated CSS waveform &amp; streaming text</span>
              <span className="text-foreground">Web Speech API &amp; bidirectional WebSockets</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-muted/20">
              <span className="font-medium text-foreground">Verification Delivery</span>
              <span className="text-muted-foreground">Recruiter verification dossier screen</span>
              <span className="text-foreground">Encrypted JSON payload pushed back to source ATS/HRIS</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="p-6 rounded-xl bg-card border text-center space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground">Ready to Experience the Verification Layer?</h3>
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
