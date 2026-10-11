import { motion } from 'motion/react'

const MAX_SCORE = 5
const STARS = '★★★★★'

interface Props {
  score: number
}

function ScoreStars({ score }: Props) {
  const percent = Math.min(score / MAX_SCORE, 1) * 100
  const label = score.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

  return (
    <div className="flex items-center gap-2">
      {/* Estrelas cinza por baixo; as amarelas por cima são cortadas na proporção da nota */}
      <div className="relative text-xl leading-none" aria-hidden="true">
        <span className="text-zinc-700">{STARS}</span>
        <motion.span
          className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          {STARS}
        </motion.span>
      </div>
      <span className="text-sm font-medium text-zinc-300">
        {label}
        <span className="sr-only"> de {MAX_SCORE}</span>
      </span>
    </div>
  )
}

export default ScoreStars
