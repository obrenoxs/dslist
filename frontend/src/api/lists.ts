import type { GameList, GameMin } from '../types'
import { api } from './client'

export const getLists = () => api.get<GameList[]>('/lists')

export const getListGames = (listId: number) => api.get<GameMin[]>(`/lists/${listId}/games`)

export const moveGame = (listId: number, sourceIndex: number, destinationIndex: number) =>
  api.post<void>(`/lists/${listId}/replacement`, { sourceIndex, destinationIndex })
