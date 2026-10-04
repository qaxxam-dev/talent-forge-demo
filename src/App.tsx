import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LandingScreen } from '@/components/screens/LandingScreen'
import { IntakeScreen } from '@/components/screens/IntakeScreen'
import { KanbanScreen } from '@/components/screens/KanbanScreen'
import { VivaScreen } from '@/components/screens/VivaScreen'
import { ConfirmationScreen } from '@/components/screens/ConfirmationScreen'
import { RecruiterCardScreen } from '@/components/screens/RecruiterCardScreen'
import { DEMO_PERSONAS, type CandidatePersona } from '@/data/demoData'
import { Info } from 'lucide-react'

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'landing' | 'intake' | 'kanban' | 'viva' | 'confirmation' | 'recruiter'>('landing')
  const [selectedPersona, setSelectedPersona] = useState<CandidatePersona>(DEMO_PERSONAS[0])
  const [verifiedUrls, setVerifiedUrls] = useState<{ repoUrl: string; liveDemoUrl: string } | undefined>(undefined)
  const [showArchInfo, setShowArchInfo] = useState(false)

  const handleProceedToKanban = (persona: CandidatePersona) => {
    setSelectedPersona(persona)
    setActiveScreen('kanban')
  }

  const handleProceedToViva = (persona: CandidatePersona) => {
    setSelectedPersona(persona)
    setActiveScreen('viva')
  }

  const handleProceedToConfirmation = (persona: CandidatePersona) => {
    setSelectedPersona(persona)
    setActiveScreen('confirmation')
  }

  const handleProceedToRecruiterCard = (
    persona: CandidatePersona,
    urls?: { repoUrl: string; liveDemoUrl: string }
  ) => {
    setSelectedPersona(persona)
    if (urls) {
      setVerifiedUrls(urls)
    }
    setActiveScreen('recruiter')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      {/* Clean Standard Header */}
      <header className="border-b bg-background px-6 py-3 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveScreen('landing')}
        >
          <span className="font-semibold tracking-tight text-sm">TalentForge</span>
          <Badge variant="secondary" className="text-[11px] font-normal">
            Prototype
          </Badge>
          <span className="hidden sm:inline text-xs text-muted-foreground">
            Technical Verification Infrastructure for Existing Hiring Platforms
          </span>
        </div>

        {/* Minimal Navigation */}
        <div className="flex items-center gap-1 text-xs">
          <Button
            variant={activeScreen === 'landing' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('landing')}
            className="text-xs h-8"
          >
            Overview
          </Button>
          <Button
            variant={activeScreen === 'intake' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('intake')}
            className="text-xs h-8"
          >
            1. Intake &amp; DPDP
          </Button>
          <Button
            variant={activeScreen === 'kanban' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('kanban')}
            className="text-xs h-8"
          >
            2. Spec Kanban
          </Button>
          <Button
            variant={activeScreen === 'viva' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('viva')}
            className="text-xs h-8"
          >
            3. Oral Viva
          </Button>
          <Button
            variant={activeScreen === 'confirmation' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('confirmation')}
            className="text-xs h-8"
          >
            4. Authorship Confirmation
          </Button>
          <Button
            variant={activeScreen === 'recruiter' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveScreen('recruiter')}
            className="text-xs h-8"
          >
            5. Verification Dossier
          </Button>
        </div>

        {/* Right Info Trigger */}
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowArchInfo(!showArchInfo)}
            className="text-xs gap-1.5 h-8"
          >
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Architecture</span>
          </Button>
        </div>
      </header>

      {/* Production Architecture Context Callout */}
      {showArchInfo && (
        <div className="border-b bg-muted/30 px-6 py-3 text-xs text-muted-foreground">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <p className="leading-relaxed">
              <strong className="text-foreground">Integration-Ready Architecture:</strong> Existing ATS / Hiring Platform &rarr; TalentForge API Gateway &rarr; Local Regex DPDP Sanitizer &rarr; Verification Engine (Spec Scaffolder + Code-Defend Oral Defense) &rarr; Verification Dossier returned to hiring system. (Running in offline prototype mode).
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowArchInfo(false)}
              className="text-xs h-7 shrink-0"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 px-4 py-6">
        {activeScreen === 'landing' && (
          <LandingScreen
            onStartWalkthrough={() => setActiveScreen('intake')}
            onNavigateToScreen={(screen) => setActiveScreen(screen)}
          />
        )}

        {activeScreen === 'intake' && (
          <IntakeScreen
            onProceedToKanban={handleProceedToKanban}
            onProceedToViva={handleProceedToViva}
          />
        )}

        {activeScreen === 'kanban' && (
          <KanbanScreen
            persona={selectedPersona}
            onBackToIntake={() => setActiveScreen('intake')}
            onProceedToViva={handleProceedToViva}
          />
        )}

        {activeScreen === 'viva' && (
          <VivaScreen
            persona={selectedPersona}
            onBackToKanban={() => setActiveScreen('kanban')}
            onProceedToConfirmation={handleProceedToConfirmation}
          />
        )}

        {activeScreen === 'confirmation' && (
          <ConfirmationScreen
            persona={selectedPersona}
            onBackToViva={() => setActiveScreen('viva')}
            onProceedToRecruiterCard={handleProceedToRecruiterCard}
          />
        )}

        {activeScreen === 'recruiter' && (
          <RecruiterCardScreen
            persona={selectedPersona}
            verifiedUrls={verifiedUrls}
            onBackToConfirmation={() => setActiveScreen('confirmation')}
            onRestartDemo={() => setActiveScreen('intake')}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t py-3 px-6 text-xs text-muted-foreground flex items-center justify-between">
        <span>Founder's Code 2026 • Future of Work</span>
        <span>Technical Verification Layer • Integration-Ready Architecture</span>
      </footer>
    </div>
  )
}
