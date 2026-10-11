import { Link, useLocation, useNavigate } from 'react-router'

function BackLink() {
  const navigate = useNavigate()
  const location = useLocation()
  // "default" = página aberta direto pela URL, sem histórico dentro do app para voltar
  const hasHistory = location.key !== 'default'

  return (
    <Link
      to="/"
      onClick={(event) => {
        if (!hasHistory) return
        // Volta pelo histórico para manter a lista que estava aberta
        event.preventDefault()
        navigate(-1)
      }}
      className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-100"
    >
      <span aria-hidden="true">←</span> Voltar
    </Link>
  )
}

export default BackLink
