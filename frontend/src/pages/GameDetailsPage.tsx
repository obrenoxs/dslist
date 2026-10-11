import { useParams } from 'react-router'
import BackLink from '../components/BackLink'
import GameDetails from '../components/GameDetails'
import ErrorMessage from '../components/ui/ErrorMessage'

function GameDetailsPage() {
  const { gameId } = useParams()
  const id = Number(gameId)
  // Evita chamar a API com ids como "abc", que voltariam 400 sem mensagem
  const valid = Number.isInteger(id) && id > 0

  return (
    <section className="flex flex-col gap-6">
      <BackLink />
      {valid ? <GameDetails key={id} gameId={id} /> : <ErrorMessage message="Jogo não encontrado." />}
    </section>
  )
}

export default GameDetailsPage
