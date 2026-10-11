import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { motion } from 'motion/react'
import { useState } from 'react'
import { moveGame } from '../api/lists'
import { useListGames } from '../hooks/useListGames'
import { announcements, screenReaderInstructions } from './reorderAccessibility'
import SortableGameCard from './SortableGameCard'
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
  const { data: games, loading, error, setData: setGames } = useListGames(listId)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const sensors = useSensors(
    // Exige 5px de movimento antes de arrastar, para não confundir com um clique
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  async function handleDragEnd({ active, over }: DragEndEvent) {
    if (!games || !over || active.id === over.id) return

    const sourceIndex = games.findIndex((game) => game.id === active.id)
    const destinationIndex = games.findIndex((game) => game.id === over.id)
    const previous = games

    // Atualização otimista: a tela muda na hora e volta atrás se a API falhar
    setGames(arrayMove(games, sourceIndex, destinationIndex))
    setSaving(true)
    setSaveError(null)
    try {
      await moveGame(listId, sourceIndex, destinationIndex)
    } catch {
      setGames(previous)
      setSaveError('Não foi possível salvar a nova ordem. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  if (!games?.length) return <p className="py-16 text-center text-zinc-500">Nenhum jogo nesta lista.</p>

  return (
    <div className="flex flex-col gap-3">
      <p className="h-5 text-sm text-zinc-500" aria-live="polite">
        {saving ? 'Salvando nova ordem…' : 'Arraste pela alça ⋮⋮ para reordenar.'}
      </p>
      {saveError && <ErrorMessage message={saveError} />}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        accessibility={{ announcements, screenReaderInstructions }}
      >
        <SortableContext items={games.map((game) => game.id)} strategy={verticalListSortingStrategy}>
          <motion.ol className="flex flex-col gap-3" variants={container} initial="hidden" animate="show">
            {games.map((game, index) => (
              // O li anima a entrada; o arraste move o div interno, então os dois transforms não brigam
              <motion.li key={game.id} variants={item}>
                {/* Bloqueia novos arrastes enquanto a API não confirma o anterior */}
                <SortableGameCard game={game} position={index + 1} disabled={saving} />
              </motion.li>
            ))}
          </motion.ol>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default ListGames
