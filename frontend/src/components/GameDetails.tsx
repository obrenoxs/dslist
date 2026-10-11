import { motion } from 'motion/react'
import { useGame } from '../hooks/useGame'
import ScoreStars from './ScoreStars'
import TagList from './TagList'
import ErrorMessage from './ui/ErrorMessage'
import Spinner from './ui/Spinner'

interface Props {
  gameId: number
}

// A API manda gêneros e plataformas como texto: "XBox, Playstation, PC"
const splitList = (value: string) => value.split(',').map((item) => item.trim()).filter(Boolean)

function GameDetails({ gameId }: Props) {
  const { data: game, loading, error } = useGame(gameId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!game) return null

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col gap-8 sm:flex-row"
    >
      <img
        src={game.imgUrl}
        alt={`Capa de ${game.title}`}
        className="aspect-3/4 w-48 shrink-0 self-center rounded-xl object-cover shadow-2xl shadow-violet-950/50 sm:self-start"
      />

      <div className="flex min-w-0 flex-col gap-5">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{game.title}</h1>
          <p className="mt-1 text-zinc-500">{game.year}</p>
        </header>

        <ScoreStars score={game.score} />

        <dl className="flex flex-col gap-3">
          <TagList label="Gênero" items={splitList(game.genre)} />
          <TagList label="Plataformas" items={splitList(game.platforms)} />
        </dl>

        <p className="font-medium text-zinc-200">{game.shortDescription}</p>
        <p className="leading-relaxed text-zinc-400">{game.longDescription}</p>
      </div>
    </motion.article>
  )
}

export default GameDetails
