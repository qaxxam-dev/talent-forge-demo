import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { DEMO_PERSONAS, type CandidatePersona } from '@/data/demoData'
import { Shuffle, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react'

interface IntakeScreenProps {
  onProceedToKanban?: (persona: CandidatePersona) => void
  onProceedToViva?: (persona: CandidatePersona) => void
}

export const IntakeScreen: React.FC<IntakeScreenProps> = ({
  onProceedToKanban,
  onProceedToViva,
}) => {
  const [personaIndex, setPersonaIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  const persona = DEMO_PERSONAS[personaIndex]

  const handleShuffle = () => {
    setPersonaIndex((prev) => (prev + 1) % DEMO_PERSONAS.length)
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 2 | 3)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Header: Title & Action */}
      <div className="flex items-center justify-between pb-2 border-b">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Candidate Intake & Verification</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Local DPDP Act sanitization and role gap analysis prototype.
          </p>
        </div>

        <Button
          onClick={handleShuffle}
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
        >
          <Shuffle className="h-3.5 w-3.5" />
          <span>Randomize Persona ({personaIndex + 1}/{DEMO_PERSONAS.length})</span>
        </Button>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => setCurrentStep(1)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            currentStep === 1
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
          <span>Resume Intake</span>
        </button>
        <span className="text-muted-foreground/40">/</span>
        <button
          onClick={() => setCurrentStep(2)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            currentStep === 2
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
          <span>Target Job</span>
        </button>
        <span className="text-muted-foreground/40">/</span>
        <button
          onClick={() => setCurrentStep(3)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium transition-colors ${
            currentStep === 3
              ? 'bg-secondary text-secondary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
          <span>Compliance & Gaps</span>
        </button>
      </div>

      {/* STEP 1: CANDIDATE RESUME INTAKE */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">{persona.name}</CardTitle>
                <CardDescription className="text-xs mt-0.5">{persona.archetype}</CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                {persona.hasPortfolio ? 'Portfolio Available' : 'Zero Verified Projects'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-muted/50 p-3 rounded-md">
              <div>
                <span className="text-muted-foreground block text-[11px]">Education</span>
                <span className="font-medium text-foreground">{persona.education}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Location</span>
                <span className="font-medium text-foreground">{persona.location}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Contact (Raw PII)</span>
                <span className="font-medium text-foreground">{persona.phone}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Original Resume Text:</span>
              <pre className="p-4 rounded-md bg-muted text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {persona.rawResumeText}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleNextStep} size="sm" className="gap-2">
                <span>Next: Target Job</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: TARGET JOB SPEC */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">{persona.targetJob.title}</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {persona.targetJob.company} • {persona.targetJob.location}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">
                {persona.targetJob.experienceRequired}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-foreground/90 leading-relaxed">
              {persona.targetJob.overview}
            </p>

            <Separator />

            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground block">Required Tech Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {persona.targetJob.requiredStack.map((tech, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground block">Key Deliverables:</span>
              <ul className="text-xs text-foreground/80 space-y-1.5 list-disc list-inside">
                {persona.targetJob.keyResponsibilities.map((resp, idx) => (
                  <li key={idx} className="leading-relaxed">{resp}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button variant="ghost" size="sm" onClick={handlePrevStep} className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <Button size="sm" onClick={handleNextStep} className="gap-1.5">
                <span>Run DPDP Sanitization & Gap Analysis</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: DPDP AUDIT & SKILL GAP REPORT */}
      {currentStep === 3 && (
        <div className="space-y-4">
          {/* Neutral DPDP Compliance Notice */}
          <div className="flex items-center gap-3 p-3 rounded-md bg-secondary text-secondary-foreground text-xs">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <div className="flex-1">
              <span className="font-medium">DPDP Act 2023 Compliant:</span>{' '}
              <span className="text-muted-foreground">
                {persona.gapAnalysis.purgedTokensCount} PII fields sanitized before AI processing.
              </span>
            </div>
            <Badge variant="outline" className="text-[11px] font-normal">Section 8 Verified</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sanitized Resume Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sanitized Document Payload</CardTitle>
                <CardDescription className="text-xs">
                  Cleaned string sent to LLM evaluation service.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <pre className="p-3 rounded-md bg-muted text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {persona.sanitizedResumeText}
                </pre>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-medium text-muted-foreground block">Masked Tokens:</span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {persona.redactedTokens.map((tok, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded bg-muted/60 text-[11px]"
                      >
                        <span className="text-muted-foreground line-through">{tok.raw}</span>
                        <code className="text-xs font-mono text-primary">{tok.token}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gap Analysis Card */}
            <Card className="flex flex-col justify-between">
              <div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Skill-Gap Analysis</CardTitle>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {persona.gapAnalysis.matchScore}% Match
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {persona.gapAnalysis.readinessBand}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Acquired Skills */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Verified Acquired Skills:</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {persona.gapAnalysis.acquiredSkills.map((sk, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs font-normal">
                          {sk}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Critical Gaps */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Identified Skill Gaps:</span>
                    </span>
                    <div className="space-y-2">
                      {persona.gapAnalysis.criticalGaps.map((gap, idx) => (
                        <div key={idx} className="p-2.5 rounded-md bg-muted/50 text-xs space-y-0.5">
                          <div className="flex items-center justify-between font-medium">
                            <span>{gap.skill}</span>
                            <span className="text-[10px] text-muted-foreground uppercase">{gap.priority}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-normal">{gap.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Bottom CTA Card */}
              <div className="p-4 border-t bg-muted/20 space-y-2">
                {persona.hasPortfolio ? (
                  <Button
                    onClick={() => onProceedToViva?.(persona)}
                    className="w-full gap-2 text-xs"
                    size="sm"
                  >
                    <span>Proceed to Code-Defend Oral Defense</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => onProceedToKanban?.(persona)}
                    className="w-full gap-2 text-xs"
                    size="sm"
                  >
                    <span>Generate Spec Blueprint (3-Sprint Kanban)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-start pt-1">
            <Button variant="ghost" size="sm" onClick={handlePrevStep} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Job Spec</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
