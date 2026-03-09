'use client'

import { useState } from 'react'
import { CheckCircle2, Circle } from 'lucide-react'
import { toggleLessonCompletion } from '@/lib/actions/progress'

interface CompletionButtonProps {
    courseId: string
    lessonKey: string
    isCompleted: boolean
    className?: string
}

export function CompletionButton({ courseId, lessonKey, isCompleted, className }: CompletionButtonProps) {
    const [completed, setCompleted] = useState(isCompleted)
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        setLoading(true)
        try {
            const result = await toggleLessonCompletion(courseId, lessonKey)
            setCompleted(result.completed)
        } catch (error) {
            console.error('Error toggling completion:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex items-center gap-2 transition-all duration-300 ${loading ? 'opacity-50' : ''} ${className || ''}`}
            title={completed ? 'Marcar como no completada' : 'Marcar como completada'}
        >
            {completed ? (
                <CheckCircle2 size={22} className="text-green-500 fill-green-500/20 shrink-0" />
            ) : (
                <Circle size={22} className="text-slate-300 hover:text-green-400 shrink-0 transition-colors" />
            )}
        </button>
    )
}
