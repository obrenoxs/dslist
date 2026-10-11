import { useCallback } from 'react'
import { getGameById } from '../api/games'
import { useFetch } from './useFetch'

export function useGame(gameId: number) {
  const fetcher = useCallback(() => getGameById(gameId), [gameId])
  return useFetch(fetcher)
}
