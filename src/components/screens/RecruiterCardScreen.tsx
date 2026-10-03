import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DEMO_RECRUITER_DOSSIERS,
  type CandidatePersona,
  type RecruiterDossier,
} from '@/data/demoData'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Copy,
  Check,
  Zap,
  RotateCcw,
  Sparkles,
  Building2,
  FileCheck2,
} from 'lucide-react'

interface RecruiterCardScreenProps {
  persona: CandidatePersona
  onBackToViva: () => void
  onRestartDemo: () => void
}

export const RecruiterCardScreen: React.FC<RecruiterCardScreenProps> = ({
  persona,
  onBackToViva,
  onRestartDemo,
}) => {
  const dossier: RecruiterDossier =
    DEMO_RECRUITER_DOSSIERS[persona.id] || DEMO_RECRUITER_DOSSIERS['persona-1']

  const [isCopied, setIsCopied] = useState(false)
  const [isShortlisted, setIsShortlisted] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${dossier.shareableUrl}`)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleFastTrack = () => {
    setIsShortlisted(true)
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between pb-3 border-b">
        <div className="flex items-center gap-2 text-xs">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToViva}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Oral Viva
          </Button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-muted-foreground">{persona.name}</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">CIEL HR Verification Dossier</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRestartDemo}
          className="text-xs gap-1.5 h-8 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Restart Evaluation</span>
        </Button>
      </div>

      {/* Shortlisted Confirmation Banner */}
      {isShortlisted && (
        <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>
              <strong>Candidate Shortlisted:</strong> {persona.name} has been fast-tracked to the hiring manager's final technical round. CIEL ATS status updated.
            </span>
          </div>
          <Badge className="bg-emerald-600 text-white text-[10px]">Shortlisted</Badge>
        </div>
      )}

      {/* HERO SCORECARD: Overall Day-Zero Readiness */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-normal">
                  CIEL HR Certified Candidate
                </Badge>
                <Badge variant="outline" className="text-xs font-mono text-muted-foreground">
                  Certificate: {dossier.dpdpCertificationId}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-1.5">{persona.name}</CardTitle>
              <CardDescription className="text-xs">
                Candidate for: <strong className="text-foreground">{persona.targetJob.title}</strong> • {persona.targetJob.company}
              </CardDescription>
            </div>

            {/* Composite Day-Zero Score */}
            <div className="flex items-center gap-4 bg-muted/40 p-3.5 rounded-lg border text-right">
              <div>
                <span className="text-[11px] text-muted-foreground block">Day-Zero Readiness</span>
                <span className="text-2xl font-extrabold text-primary tracking-tight">
                  {dossier.overallDayZeroScore}/100
                </span>
              </div>
              <div className="h-10 w-px bg-border/60" />
              <div className="text-left space-y-1">
                <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                  Day-Zero Ready
                </Badge>
                <span className="text-[10px] text-muted-foreground block">
                  Zero AI Plagiarism Risk
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          <Separator />

          {/* SECTION 1: BUSINESS-IMPACT TRANSLATION LAYER */}
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Business-Impact Translation Layer</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Plain-language interpretation of technical deliverables designed for non-technical talent acquisition screeners.
              </p>
            </div>

            <div className="space-y-2.5">
              {dossier.businessTranslations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-md bg-muted/30 border space-y-2 text-xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    {/* Left: Engineering Feature */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                        Technical Deliverable
                      </span>
                      <p className="font-mono text-xs text-foreground/90 font-medium">
                        {item.technicalFeature}
                      </p>
                    </div>

                    {/* Right: Business Value */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                        Commercial Value &amp; Operational Impact
                      </span>
                      <p className="text-foreground/90 leading-relaxed">
                        {item.businessValue}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span><strong>Risk Mitigated:</strong> {item.riskMitigated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* SECTION 2: TECHNICAL & VIVA AUDIT TRAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="h-3.5 w-3.5 text-primary" />
                <span>Verified Engineering Milestones</span>
              </h3>
              <div className="space-y-1.5">
                {dossier.technicalChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-muted/40 border text-xs space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span>{item.name}</span>
                      <Badge variant="outline" className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: LEGAL DPDP ACT CERTIFICATE */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span>Enterprise Governance &amp; Data Privacy</span>
              </h3>
              <div className="p-3.5 rounded-md bg-muted/30 border space-y-2.5 text-xs">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">Digital Personal Data Protection Act 2023</div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Candidate intake sanitized via local regex pipeline. Zero PII tokens stored or leaked upstream during AI orchestration.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-background p-2 rounded border font-mono">
                  <div>
                    <span className="text-muted-foreground block text-[9px]">COMPLIANCE STATUS</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% PASS</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px]">TOKEN REGISTRY</span>
                    <span className="font-semibold text-foreground">5 Neutralized</span>
                  </div>
                </div>

                <div className="pt-1 text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Audit Verification Reference:</span>
                  <code className="font-mono text-xs">{dossier.dpdpCertificationId}</code>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* BOTTOM ACTIONS: FAST-TRACK & SHAREABLE LINK */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Shareable Link Box */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 bg-muted/50 border px-3 py-1.5 rounded-md text-xs font-mono text-muted-foreground">
                <span>https://{dossier.shareableUrl}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="text-xs gap-1.5 h-8 shrink-0"
              >
                {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
              </Button>
            </div>

            {/* Fast-Track CTA */}
            <Button
              size="sm"
              disabled={isShortlisted}
              onClick={handleFastTrack}
              className="w-full sm:w-auto gap-2 text-xs h-8"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{isShortlisted ? 'Candidate Shortlisted' : 'Fast-Track to Technical Round'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
