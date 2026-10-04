import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  DEMO_SPRINT_TASKS,
  type CandidatePersona,
  type SprintTask,
} from '@/data/demoData'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Zap,
  FileCode,
  CheckSquare2,
} from 'lucide-react'

interface KanbanScreenProps {
  persona: CandidatePersona
  onBackToIntake: () => void
  onProceedToViva: (persona: CandidatePersona) => void
}

export const KanbanScreen: React.FC<KanbanScreenProps> = ({
  persona,
  onBackToIntake,
  onProceedToViva,
}) => {
  // Load tasks for persona or fallback to persona-1
  const initialTasks = DEMO_SPRINT_TASKS[persona.id] || DEMO_SPRINT_TASKS['persona-1']
  const [tasks, setTasks] = useState<SprintTask[]>(initialTasks)
  const [selectedTask, setSelectedTask] = useState<SprintTask | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Metrics
  const completedCount = tasks.filter((t) => t.status === 'completed').length
  const totalCount = tasks.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  // Status toggle handler
  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'todo' : 'completed'
          return { ...t, status: nextStatus }
        }
        return t
      })
    )
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask((prev) =>
        prev ? { ...prev, status: prev.status === 'completed' ? 'todo' : 'completed' } : null
      )
    }
  }

  // Fast-forward demo helper
  const handleAutoCompleteAll = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, status: 'completed' })))
  }

  const handleOpenTask = (task: SprintTask) => {
    setSelectedTask(task)
    setIsSheetOpen(true)
  }

  // Group tasks by sprint
  const sprint1Tasks = tasks.filter((t) => t.sprint === 'Sprint 1: Schema & Models')
  const sprint2Tasks = tasks.filter((t) => t.sprint === 'Sprint 2: APIs & Controllers')
  const sprint3Tasks = tasks.filter((t) => t.sprint === 'Sprint 3: Deployment & Testing')

  return (
    <div className="w-full max-w-6xl mx-auto py-2 space-y-6">
      {/* Top Header & Sprint Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToIntake}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground -ml-2"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Intake
            </Button>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-xs font-medium text-foreground">{persona.name}</span>
            <Badge variant="secondary" className="text-[11px] font-normal">
              {persona.targetJob.title}
            </Badge>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Spec-Driven Sprint Scaffolder</h1>
          <p className="text-xs text-muted-foreground">
            Bypassing passive tutorials: role-tailored engineering blueprint converting qualification gaps into verifiable technical evidence.
          </p>
        </div>

        {/* Demo Fast-Forward & Handoff Action */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoCompleteAll}
            className="text-xs gap-1.5 h-8 text-muted-foreground hover:text-foreground"
            title="Fast-forward build progression for quick pitch demo"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Auto-Complete (Demo)</span>
          </Button>

          <Button
            size="sm"
            onClick={() => onProceedToViva(persona)}
            className="text-xs gap-1.5 h-8"
          >
            <span>Proceed to Oral Viva</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Progress HUD */}
      <div className="bg-card border rounded-lg p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Sprint Build Readiness</span>
            <span className="text-muted-foreground">
              ({completedCount} of {totalCount} tasks verified)
            </span>
          </div>
          <span className="font-semibold text-primary">{progressPercent}% Ready</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* 3-Sprint Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Sprint 1 Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">1</span>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Schema &amp; Models</h2>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {sprint1Tasks.filter((t) => t.status === 'completed').length}/{sprint1Tasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {sprint1Tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={() => handleOpenTask(task)}
                onToggleStatus={() => handleToggleTaskStatus(task.id)}
              />
            ))}
          </div>
        </div>

        {/* Sprint 2 Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">2</span>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">APIs &amp; Controllers</h2>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {sprint2Tasks.filter((t) => t.status === 'completed').length}/{sprint2Tasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {sprint2Tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={() => handleOpenTask(task)}
                onToggleStatus={() => handleToggleTaskStatus(task.id)}
              />
            ))}
          </div>
        </div>

        {/* Sprint 3 Column */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary text-xs flex items-center justify-center font-bold">3</span>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deploy &amp; Testing</h2>
            </div>
            <span className="text-[11px] text-muted-foreground">
              {sprint3Tasks.filter((t) => t.status === 'completed').length}/{sprint3Tasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5">
            {sprint3Tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onSelect={() => handleOpenTask(task)}
                onToggleStatus={() => handleToggleTaskStatus(task.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide-Over Inspection Sheet for Task Details */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto p-6 space-y-6">
          {selectedTask && (
            <>
              <SheetHeader className="space-y-1.5 text-left border-b pb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[11px] font-normal">
                    {selectedTask.sprint}
                  </Badge>
                  <Badge
                    variant={selectedTask.status === 'completed' ? 'secondary' : 'outline'}
                    className="text-[11px]"
                  >
                    {selectedTask.status === 'completed' ? 'Verified Done' : 'In Progress'}
                  </Badge>
                </div>
                <SheetTitle className="text-base font-semibold leading-snug">
                  {selectedTask.title}
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  Target Competency: <strong className="text-foreground">{selectedTask.targetCompetency}</strong> • Est: {selectedTask.estimatedHours}
                </SheetDescription>
              </SheetHeader>

              {/* Task Short Summary */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-muted-foreground">Objective:</span>
                <p className="text-xs text-foreground/90 leading-relaxed bg-muted/40 p-2.5 rounded-md">
                  {selectedTask.shortSummary}
                </p>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <CheckSquare2 className="h-3.5 w-3.5" />
                  <span>Engineering Acceptance Criteria:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  {selectedTask.acceptanceCriteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-muted/20 p-2 rounded border border-border/40">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet Deliverable */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <FileCode className="h-3.5 w-3.5" />
                    <span>Deliverable Specification:</span>
                  </span>
                  <code className="text-[11px] font-mono text-muted-foreground">
                    {selectedTask.codeSnippet.filename}
                  </code>
                </div>
                <pre className="p-3.5 rounded-md bg-muted text-[11px] font-mono leading-relaxed overflow-x-auto max-h-72 border">
                  {selectedTask.codeSnippet.code}
                </pre>
              </div>

              {/* Bottom Actions inside Sheet */}
              <div className="pt-4 border-t flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleTaskStatus(selectedTask.id)}
                  className="text-xs gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>
                    {selectedTask.status === 'completed'
                      ? 'Mark as To Do'
                      : 'Mark as Completed'}
                  </span>
                </Button>

                <Button
                  size="sm"
                  onClick={() => setIsSheetOpen(false)}
                  className="text-xs"
                >
                  Done Reviewing
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

interface TaskCardProps {
  task: SprintTask
  onSelect: () => void
  onToggleStatus: () => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect, onToggleStatus }) => {
  const isCompleted = task.status === 'completed'

  return (
    <Card
      className={`transition-all duration-150 hover:border-foreground/30 cursor-pointer text-left ${
        isCompleted ? 'bg-muted/30 border-border/50' : 'bg-card'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="p-3.5 pb-2 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <Badge
            variant={isCompleted ? 'secondary' : 'outline'}
            className="text-[10px] py-0 px-1 font-normal"
          >
            {isCompleted ? 'Completed' : task.difficulty}
          </Badge>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {task.estimatedHours}
          </span>
        </div>
        <CardTitle className={`text-xs font-semibold leading-snug ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          {task.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3.5 pt-0 space-y-2">
        <p className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
          {task.shortSummary}
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px]">
          <span className="text-muted-foreground font-mono truncate max-w-[150px]">
            {task.codeSnippet.filename}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleStatus()
            }}
            className={`font-medium hover:underline flex items-center gap-1 ${
              isCompleted ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <CheckCircle2 className="h-3 w-3" />
            <span>{isCompleted ? 'Done' : 'Check'}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
