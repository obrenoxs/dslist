import { useParams } from 'react-router'
import ListGames from '../components/ListGames'
import ListTabs from '../components/ListTabs'
import ErrorMessage from '../components/ui/ErrorMessage'
import Spinner from '../components/ui/Spinner'
import { useLists } from '../hooks/useLists'

function HomePage() {
  const { listId } = useParams()
  const { data: lists, loading, error } = useLists()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!lists?.length) return <p className="text-zinc-500">Nenhuma lista cadastrada.</p>

  // Sem listId na URL ("/"), mostra a primeira lista
  const activeId = listId ? Number(listId) : lists[0].id
  const exists = lists.some((list) => list.id === activeId)

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Minhas listas</h1>
      <ListTabs lists={lists} activeId={activeId} />
      {exists ? (
        // key força remontagem: cada lista busca seus jogos e anima a entrada do zero
        <ListGames key={activeId} listId={activeId} />
      ) : (
        <ErrorMessage message="Lista não encontrada." />
      )}
    </section>
  )
}

export default HomePage
