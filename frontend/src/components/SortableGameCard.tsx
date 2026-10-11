import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { GameMin } from '../types'
import GameCard from './GameCard'

interface Props {
  game: GameMin
  position: number
  disabled: boolean
}

function SortableGameCard({ game, position, disabled }: Props) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: game.id, data: { title: game.title }, disabled })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative flex items-center gap-2 rounded-xl ${
        isDragging ? 'z-10 shadow-2xl shadow-black/60 ring-2 ring-violet-400/70' : ''
      }`}
    >
      {/* Só a alça inicia o arraste: clicar no card continua abrindo os detalhes */}
      <button
        ref={setActivatorNodeRef}
        type="button"
        aria-label={`Mover ${game.title}`}
        disabled={disabled}
        className="flex h-12 w-8 shrink-0 touch-none cursor-grab items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-900 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-violet-400 active:cursor-grabbing disabled:cursor-wait disabled:opacity-40"
        {...attributes}
        {...listeners}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-5" aria-hidden="true">
          <circle cx="7" cy="5" r="1.5" />
          <circle cx="13" cy="5" r="1.5" />
          <circle cx="7" cy="10" r="1.5" />
          <circle cx="13" cy="10" r="1.5" />
          <circle cx="7" cy="15" r="1.5" />
          <circle cx="13" cy="15" r="1.5" />
        </svg>
      </button>
      <div className="min-w-0 flex-1">
        <GameCard game={game} position={position} />
      </div>
    </div>
  )
}

export default SortableGameCard
