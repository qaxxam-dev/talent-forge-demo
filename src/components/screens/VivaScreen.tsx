import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DEMO_VIVA_QUESTIONS,
  type CandidatePersona,
  type VivaQuestion,
} from '@/data/demoData'
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic,
  Zap,
  Volume2,
  FileCode2,
  Sparkles,
} from 'lucide-react'

interface VivaScreenProps {
  persona: CandidatePersona
  onBackToKanban: () => void
  onProceedToConfirmation: (persona: CandidatePersona) => void
}

export const VivaScreen: React.FC<VivaScreenProps> = ({
  persona,
  onBackToKanban,
  onProceedToConfirmation,
}) => {
  // Load questions or fallback
  const questions: VivaQuestion[] =
    DEMO_VIVA_QUESTIONS[persona.id] || DEMO_VIVA_QUESTIONS['persona-1']

  const [hasAcceptedPledge, setHasAcceptedPledge] = useState(false)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [revealedChars, setRevealedChars] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const activeQuestion = questions[currentQIndex]
  const fullText = activeQuestion?.candidateSpokenAnswer || ''

  // Reset or start streaming answer when question changes
  useEffect(() => {
    if (!hasAcceptedPledge || isCompleted) return
    setIsPlayingAudio(true)
    setRevealedChars(0)

    const interval = setInterval(() => {
      setRevealedChars((prev) => {
        if (prev >= fullText.length) {
          clearInterval(interval)
          setIsPlayingAudio(false)
          return fullText.length
        }
        return prev + 6
      })
    }, 45)

    return () => clearInterval(interval)
  }, [currentQIndex, hasAcceptedPledge, fullText, isCompleted])

  const handleSkipToEnd = () => {
    setRevealedChars(fullText.length)
    setIsPlayingAudio(false)
  }

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleFastForwardAll = () => {
    setHasAcceptedPledge(true)
    setCurrentQIndex(questions.length - 1)
    setRevealedChars(questions[questions.length - 1].candidateSpokenAnswer.length)
    setIsPlayingAudio(false)
    setIsCompleted(true)
  }

  // PHASE A: DIGITAL TRUST DECLARATION
  if (!hasAcceptedPledge) {
    return (
      <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToKanban}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Sprint Kanban
          </Button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs text-muted-foreground">Module 3: Code-Defend Protocol</span>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Digital Trust &amp; Authorship Declaration</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Pre-assessment checkpoint eliminating AI code inflation and fraudulent portfolio submission.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="p-4 rounded-md bg-muted/50 border text-xs space-y-2.5 leading-relaxed">
              <div className="font-semibold text-foreground">Candidate Identity &amp; Repository Scope:</div>
              <div className="text-muted-foreground">
                Candidate: <strong className="text-foreground">{persona.name}</strong> • Role: <strong className="text-foreground">{persona.targetJob.title}</strong>
              </div>
              <div className="text-muted-foreground">
                Submitted Artifacts: <strong className="text-foreground">3 Sprints Verified (Ledger Schema, FastAPI Idempotency Router, Dockerfile)</strong>.
              </div>

              <Separator className="my-2" />

              <div className="space-y-1.5 text-foreground/90">
                <p>
                  1. I affirm that the underlying architectural logic, database constraints, and API handlers in this submission represent my operational engineering work.
                </p>
                <p>
                  2. I acknowledge that I will now undergo a <strong>5-minute automated oral defense</strong> targeting concrete trade-offs in my code to verify genuine Day-Zero readiness.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFastForwardAll}
                className="w-full sm:w-auto text-xs text-muted-foreground hover:text-foreground gap-1.5"
              >
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                <span>Fast-Forward (Pitch Mode)</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setHasAcceptedPledge(true)}
                className="w-full sm:w-auto gap-2 text-xs"
              >
                <span>Accept Authorship Pledge &amp; Begin Defense</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // PHASE C: DEFENSE COMPLETED SUMMARY
  if (isCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCompleted(false)}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Review Questions
          </Button>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-xs text-muted-foreground">Oral Defense Completed</span>
        </div>

        <Card>
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Code-Defend Oral Defense Completed</CardTitle>
            <CardDescription className="text-xs">
              Candidate successfully defended all 3 repository-specific architectural trade-offs.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Score HUD */}
            <div className="grid grid-cols-3 gap-3 text-center bg-muted/40 p-4 rounded-lg border">
              <div>
                <span className="text-[11px] text-muted-foreground block">Authorship Status</span>
                <Badge variant="secondary" className="text-xs mt-1 font-semibold">
                  Verified Authentic
                </Badge>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block">Architectural Depth</span>
                <span className="text-lg font-bold text-primary block mt-0.5">93%</span>
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground block">Clarity &amp; Trade-Offs</span>
                <span className="text-lg font-bold text-foreground block mt-0.5">91%</span>
              </div>
            </div>

            {/* Verified Questions Summary */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground block">
                Audited Architectural Defense Points:
              </span>
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-md bg-muted/20 border flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-medium text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        <span>Question {idx + 1}: {q.category}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{q.aiEvaluation.keyObservation}</p>
                    </div>
                    <Badge variant="outline" className="text-[11px] shrink-0 font-mono">
                      {q.aiEvaluation.accuracyScore}/100
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t">
              <Button
                onClick={() => onProceedToConfirmation(persona)}
                className="w-full gap-2 text-xs"
              >
                <span>Proceed to Authorship &amp; Repository Verification (Screen 4)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // PHASE B: 3-QUESTION INTERACTIVE VOICE CONSOLE
  return (
    <div className="w-full max-w-4xl mx-auto py-4 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground">{persona.name}</span>
            <span className="text-muted-foreground/40">/</span>
            <Badge variant="secondary" className="text-[11px]">
              Question {currentQIndex + 1} of {questions.length}
            </Badge>
            <Badge variant="outline" className="text-[11px] font-normal">
              {activeQuestion.category}
            </Badge>
          </div>
          <h1 className="text-lg font-semibold tracking-tight">Code-Defend Voice Interrogation Console</h1>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleFastForwardAll}
          className="text-xs gap-1.5 h-8 text-muted-foreground hover:text-foreground shrink-0"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Fast-Forward Viva</span>
        </Button>
      </div>

      {/* Main Question Card */}
      <Card>
        <CardHeader className="pb-3 space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Volume2 className="h-3.5 w-3.5 text-primary" />
              AI Technical Interrogator Prompt:
            </span>
            <span className="font-mono text-[11px] flex items-center gap-1">
              <FileCode2 className="h-3 w-3" />
              {activeQuestion.targetCodeReference}
            </span>
          </div>

          <p className="text-sm font-medium text-foreground leading-relaxed bg-muted/30 p-3 rounded-md border">
            "{activeQuestion.interrogatorPrompt}"
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Simulated Audio Waveform Bar */}
          <div className="flex items-center justify-between p-3 rounded-md bg-muted/50 border">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mic className={`h-4 w-4 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
              </div>
              <div>
                <span className="text-xs font-medium block">Candidate Spoken Response</span>
                <span className="text-[11px] text-muted-foreground">
                  {isPlayingAudio ? 'Transcribing live voice defense stream...' : 'Voice stream captured.'}
                </span>
              </div>
            </div>

            {/* CSS Waveform Bars */}
            <div className="flex items-center gap-1 h-6">
              {[16, 24, 12, 28, 20, 14, 26, 18, 22, 12].map((height, idx) => (
                <div
                  key={idx}
                  style={{
                    height: isPlayingAudio ? `${height}px` : '4px',
                    transition: 'height 0.15s ease',
                  }}
                  className={`w-1 rounded-full ${
                    isPlayingAudio ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Real-time Streaming Transcript */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Live Defense Transcript:</span>
              {isPlayingAudio && (
                <button
                  type="button"
                  onClick={handleSkipToEnd}
                  className="text-[11px] text-primary hover:underline font-medium"
                >
                  ⚡ Skip to End of Answer
                </button>
              )}
            </div>

            <div className="p-3.5 rounded-md bg-muted text-xs font-sans leading-relaxed min-h-28 max-h-40 overflow-y-auto border">
              <span>{fullText.slice(0, revealedChars)}</span>
              {isPlayingAudio && (
                <span className="inline-block w-1.5 h-3 bg-primary ml-1 animate-pulse" />
              )}
            </div>
          </div>

          {/* Instant AI Evaluation Rubric */}
          {!isPlayingAudio && (
            <div className="p-3 rounded-md bg-secondary/60 text-secondary-foreground text-xs space-y-1 border animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>Real-Time Evaluation: {activeQuestion.aiEvaluation.verdict}</span>
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Accuracy: {activeQuestion.aiEvaluation.accuracyScore}%
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Clarity: {activeQuestion.aiEvaluation.clarityScore}%
                  </Badge>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                {activeQuestion.aiEvaluation.keyObservation}
              </p>
            </div>
          )}

          {/* Console Footer & Navigation */}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-[11px] text-muted-foreground">
              Indian DPDP Act &amp; Plagiarism Detection Engine Active
            </span>

            <Button
              size="sm"
              onClick={handleNextQuestion}
              disabled={isPlayingAudio}
              className="gap-2 text-xs"
            >
              <span>
                {currentQIndex < questions.length - 1
                  ? 'Next Architectural Question'
                  : 'Complete Oral Defense'}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
