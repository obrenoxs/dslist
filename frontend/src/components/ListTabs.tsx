import { motion } from 'motion/react'
import { Link } from 'react-router'
import type { GameList } from '../types'

interface Props {
  lists: GameList[]
  activeId: number
}

function ListTabs({ lists, activeId }: Props) {
  return (
    <nav aria-label="Listas de jogos" className="flex gap-1 overflow-x-auto border-b border-zinc-800">
      {lists.map((list) => {
        const active = list.id === activeId
        return (
          <Link
            key={list.id}
            to={`/lists/${list.id}`}
            aria-current={active ? 'page' : undefined}
            className={`relative shrink-0 px-4 py-3 text-sm font-medium transition-colors ${
              active ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {list.name}
            {active && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-violet-400"
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default ListTabs
