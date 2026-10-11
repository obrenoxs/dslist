import { Link } from 'react-router'
import type { GameMin } from '../types'

interface Props {
  game: GameMin
  position: number
}

function GameCard({ game, position }: Props) {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
    >
      <span className="w-6 shrink-0 text-center text-lg font-semibold text-zinc-500">{position}</span>
      <img
        src={game.imgUrl}
        alt={`Capa de ${game.title}`}
        loading="lazy"
        className="aspect-3/4 w-16 shrink-0 rounded-md object-cover sm:w-20"
      />
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-zinc-100 group-hover:text-violet-300">{game.title}</h3>
        <p className="text-sm text-zinc-500">{game.year}</p>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{game.shortDescription}</p>
      </div>
    </Link>
  )
}

export default GameCard
