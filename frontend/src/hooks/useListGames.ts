import { useCallback } from 'react'
import { getListGames } from '../api/lists'
import { useFetch } from './useFetch'

export function useListGames(listId: number) {
  const fetcher = useCallback(() => getListGames(listId), [listId])
  return useFetch(fetcher)
}
