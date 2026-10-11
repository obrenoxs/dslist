import { useCallback, useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  setData: (data: T) => void
}

interface Result<T> {
  source: () => Promise<T>
  data: T | null
  error: string | null
}

/**
 * Busca dados com a função recebida. A função precisa ser estável
 * (função de módulo ou useCallback): quando ela muda, uma nova busca começa.
 */
export function useFetch<T>(fetcher: () => Promise<T>): FetchState<T> {
  const [result, setResult] = useState<Result<T> | null>(null)

  useEffect(() => {
    // Ignora respostas que chegam depois de o parâmetro mudar ou o componente desmontar
    let ignore = false

    fetcher()
      .then((data) => {
        if (!ignore) setResult({ source: fetcher, data, error: null })
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'Ocorreu um erro inesperado.'
        if (!ignore) setResult({ source: fetcher, data: null, error: message })
      })

    return () => {
      ignore = true
    }
  }, [fetcher])

  // Permite alterar os dados localmente (ex.: reordenar antes de a API confirmar)
  const setData = useCallback((data: T) => {
    setResult((current) => (current ? { ...current, data } : current))
  }, [])

  // Resultado de outra busca (ou nenhum ainda) significa que a atual está em andamento
  if (result?.source !== fetcher) return { data: null, loading: true, error: null, setData }
  return { data: result.data, loading: false, error: result.error, setData }
}
