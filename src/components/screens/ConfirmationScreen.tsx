import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DEMO_VIVA_QUESTIONS,
  DEMO_VERIFIED_URLS,
  type CandidatePersona,
  type VivaQuestion,
  type VerifiedSubmissionUrls,
} from '@/data/demoData'
import {
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Code2,
  Globe,
  Lock,
  Sparkles,
  Terminal,
  Copy,
  Check,
} from 'lucide-react'

interface ConfirmationScreenProps {
  persona: CandidatePersona
  onBackToViva: () => void
  onProceedToRecruiterCard: (
    persona: CandidatePersona,
    verifiedUrls: { repoUrl: string; liveDemoUrl: string }
  ) => void
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  persona,
  onBackToViva,
  onProceedToRecruiterCard,
}) => {
  // Persona default URLs or fallback
  const defaultUrls: VerifiedSubmissionUrls =
    DEMO_VERIFIED_URLS[persona.id] || DEMO_VERIFIED_URLS['persona-1']

  const [repoUrl, setRepoUrl] = useState(defaultUrls.repoUrl)
  const [liveDemoUrl, setLiveDemoUrl] = useState(defaultUrls.liveDemoUrl)
  const [isAttested, setIsAttested] = useState(false)
  const [isCopiedHash, setIsCopiedHash] = useState(false)

  // Load questions or fallback
  const questions: VivaQuestion[] =
    DEMO_VIVA_QUESTIONS[persona.id] || DEMO_VIVA_QUESTIONS['persona-1']

  const sha256Seal = '8f4b61c9e0234a71d8820c4fa4891b93de8943719e782a61b84920fc7e93012a'
  const dpdpAuditId = `DPDP-AUTH-2026-IN-${persona.id.replace('persona-', '00')}`

  const handleCopyHash = () => {
    navigator.clipboard?.writeText?.(sha256Seal)
    setIsCopiedHash(true)
    setTimeout(() => setIsCopiedHash(false), 2000)
  }

  const handleSubmit = () => {
    if (!isAttested) return
    onProceedToRecruiterCard(persona, { repoUrl, liveDemoUrl })
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Breadcrumb & Step Indicator */}
      <div className="flex items-center justify-between pb-3 border-b">
        <div className="flex items-center gap-2 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToViva}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            3. Oral Viva
          </Button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground">{persona.name}</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">
            4. Authorship &amp; Submission Confirmation
          </span>
        </div>

        <Badge variant="outline" className="text-[11px] font-mono gap-1 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
          <ShieldCheck className="h-3 w-3" />
          <span>Viva Defended (94% Accuracy)</span>
        </Badge>
      </div>

      {/* ZERO-TRUST AI PLAGIARISM & AUTHORSHIP PHILOSOPHY BANNER */}
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
          <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span>Zero-Trust AI Code Submission Policy • Proof of Genuine Authorship</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          TalentForge <strong>does not accept or trust unverified AI-generated code</strong> or prompt-engineered boilerplate. In mission-critical production environments, software that cannot be defended in an automated oral architectural interrogation cannot be deployed.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-foreground/80 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Oral Viva Voice Defense Passed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>AST Code Diff Syntactic Verification</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Live Production Sandbox Healthcheck</span>
          </span>
        </div>
      </div>

      {/* SECTION 1: ORAL DEFENSE AUDIT HUD */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>1. Audited Oral Defense Telemetry</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Candidate voice trade-off defense completed and audited against repository AST syntax.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs font-semibold">
              Verified Authentic
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 text-center bg-muted/40 p-3.5 rounded-lg border text-xs">
            <div>
              <span className="text-[11px] text-muted-foreground block">Authorship Integrity</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                Human Authored (0% AI Slop)
              </span>
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground block">Architectural Depth</span>
              <span className="text-base font-bold text-primary block mt-0.5">
                94% Accuracy
              </span>
            </div>
            <div>
              <span className="text-[11px] text-muted-foreground block">Trade-Off Clarity</span>
              <span className="text-base font-bold text-foreground block mt-0.5">
                91% Score
              </span>
            </div>
          </div>

          {/* Defense Points Preview */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
              Audited Defense Interrogations ({questions.length} Questions):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-2.5 rounded-md bg-muted/30 border space-y-1.5 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px] text-foreground">
                        Q{idx + 1}: {q.category}
                      </span>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {q.aiEvaluation.accuracyScore}%
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {q.aiEvaluation.keyObservation}
                    </p>
                  </div>
                  <div className="text-[10px] text-primary flex items-center gap-1 font-mono pt-1 border-t border-border/40">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>Verdict: {q.aiEvaluation.verdict}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: REPOSITORY & LIVE PRODUCTION DEMO VERIFICATION CONSOLE */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span>2. Candidate Codebase &amp; Live Deployment Links</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Confirm the GitHub repository and live deployment endpoints submitted for independent hiring verification.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Repo URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Public GitHub / GitLab Repository</span>
                </span>
                <span className="text-[10px] text-muted-foreground">Branch: {defaultUrls.branchName}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="flex-1 h-9 rounded-md border bg-background px-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="https://github.com/username/repository"
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => window.open(repoUrl, '_blank')}
                  className="h-9 px-3 text-xs gap-1.5 shrink-0"
                >
                  <span>Inspect</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Live Demo URL Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>Live Production Sandbox / Deployed Demo</span>
                </span>
                <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                  HTTP 200 OK
                </Badge>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={liveDemoUrl}
                  onChange={(e) => setLiveDemoUrl(e.target.value)}
                  className="flex-1 h-9 rounded-md border bg-background px-3 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="https://your-demo-url.vercel.app"
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => window.open(liveDemoUrl, '_blank')}
                  className="h-9 px-3 text-xs gap-1.5 shrink-0"
                >
                  <span>Preview</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Automated Health & Verification Telemetry Pings */}
          <div className="p-3 rounded-lg bg-muted/40 border space-y-2 text-xs">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
              Automated Telemetry Health Verification:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>
                  <strong>Git Signature:</strong> Commit <code className="font-mono">{defaultUrls.lastCommitHash}</code> verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>
                  <strong>AST Match:</strong> {defaultUrls.astMatchScore}% spec alignment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>
                  <strong>Deployment:</strong> 200 OK (Latency: 38ms)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: CRYPTOGRAPHIC SEAL & ATTESTATION */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            <span>3. Proof-of-Authorship Cryptographic Seal &amp; Attestation</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Digital certification generated under Indian DPDP Act 2023 specifications.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-0">
          {/* Tamper-evident Seal Box */}
          <div className="p-3.5 rounded-lg bg-muted/30 border space-y-2 text-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  SHA-256 Tamper-Evident Authorship Seal:
                </span>
                <span className="text-xs text-foreground font-semibold break-all">
                  {sha256Seal}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleCopyHash}
                className="h-7 text-[11px] gap-1 shrink-0"
              >
                {isCopiedHash ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{isCopiedHash ? 'Copied' : 'Copy Hash'}</span>
              </Button>
            </div>

            <div className="pt-2 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-muted-foreground">
              <div>
                <span>DPDP Audit Token: </span>
                <strong className="text-foreground">{dpdpAuditId}</strong>
              </div>
              <div>
                <span>PII Redactions: </span>
                <strong className="text-emerald-600 dark:text-emerald-400">100% In-Memory Local</strong>
              </div>
              <div>
                <span>Timestamp: </span>
                <strong className="text-foreground">04 Oct 2026, 12:20 IST</strong>
              </div>
            </div>
          </div>

          {/* Candidate Legal Affirmation Checkbox */}
          <div
            onClick={() => setIsAttested(!isAttested)}
            className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 text-xs ${
              isAttested
                ? 'bg-primary/5 border-primary/40'
                : 'bg-muted/20 border-border hover:bg-muted/40'
            }`}
          >
            <input
              type="checkbox"
              id="authorship-attestation"
              checked={isAttested}
              onChange={(e) => setIsAttested(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5 h-4 w-4 rounded border-muted-foreground text-primary focus:ring-primary cursor-pointer"
            />
            <label
              htmlFor="authorship-attestation"
              className="text-foreground leading-relaxed cursor-pointer select-none"
            >
              <strong>Proof of Genuine Authorship Attestation:</strong> I solemnly affirm that the submitted repository and live deployment represent my own genuine engineering work and architectural trade-offs as defended during the live oral viva. I acknowledge that automated AST matching, git commit histories, and voice interrogation telemetry will be permanently sealed in the Recruiter Verification Dossier under India DPDP Act compliance.
            </label>
          </div>

          <Separator />

          {/* Submission Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-muted-foreground">
              {isAttested ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Authorship attestation signed. Ready to transmit verification dossier.</span>
                </span>
              ) : (
                <span>⚠️ Please check the attestation box to confirm and transmit your verification dossier.</span>
              )}
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={onBackToViva}
                className="text-xs h-9"
              >
                Back to Oral Viva
              </Button>
              <Button
                size="sm"
                type="button"
                disabled={!isAttested}
                onClick={handleSubmit}
                className="text-xs h-9 gap-2 shadow-sm"
              >
                <span>Certify Authorship &amp; Transmit Dossier (Screen 5)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
