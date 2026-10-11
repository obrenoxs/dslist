import { motion } from 'motion/react'
import { useListGames } from '../hooks/useListGames'
import GameCard from './GameCard'
import ErrorMessage from './ui/ErrorMessage'
import Spinner from './ui/Spinner'

interface Props {
  listId: number
}

// O pai controla o atraso entre itens; cada filho herda os nomes "hidden"/"show"
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function ListGames({ listId }: Props) {
  const { data: games, loading, error } = useListGames(listId)

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!games?.length) return <p className="py-16 text-center text-zinc-500">Nenhum jogo nesta lista.</p>

  return (
    <motion.ol
      className="flex flex-col gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {games.map((game, index) => (
        <motion.li key={game.id} variants={item}>
          <GameCard game={game} position={index + 1} />
        </motion.li>
      ))}
    </motion.ol>
  )
}

export default ListGames
