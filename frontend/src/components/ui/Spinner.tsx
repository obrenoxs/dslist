function Spinner() {
  return (
    <div role="status" className="flex justify-center py-16">
      <span className="size-8 animate-spin rounded-full border-2 border-zinc-700 border-t-violet-400" />
      <span className="sr-only">Carregando…</span>
    </div>
  )
}

export default Spinner
