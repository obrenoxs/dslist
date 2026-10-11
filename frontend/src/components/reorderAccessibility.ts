import type { Active, Announcements, Over, ScreenReaderInstructions } from '@dnd-kit/core'

// Textos lidos por leitores de tela durante o arraste (o padrão do dnd-kit é em inglês)

const title = (item: Active) => item.data.current?.title as string
const position = (item: Over) => (item.data.current?.sortable.index as number) + 1

export const screenReaderInstructions: ScreenReaderInstructions = {
  draggable:
    'Para mover um jogo, pressione espaço ou enter. Use as setas para cima e para baixo para escolher a nova posição. Pressione espaço ou enter de novo para confirmar, ou esc para cancelar.',
}

export const announcements: Announcements = {
  onDragStart: ({ active }) => `${title(active)} selecionado.`,
  onDragOver: ({ active, over }) => (over ? `${title(active)} na posição ${position(over)}.` : undefined),
  onDragEnd: ({ active, over }) =>
    over ? `${title(active)} movido para a posição ${position(over)}.` : `${title(active)} solto.`,
  onDragCancel: ({ active }) => `Movimento de ${title(active)} cancelado.`,
}
