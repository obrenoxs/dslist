import { useParams } from 'react-router'

function GameDetailsPage() {
  const { gameId } = useParams()
  return <p className="text-zinc-400">Detalhes do jogo {gameId} (em construção)</p>
}

export default GameDetailsPage
