import type { Game, GameMin } from '../types'
import { api } from './client'

export const getGames = () => api.get<GameMin[]>('/games')

export const getGameById = (id: number) => api.get<Game>(`/games/${id}`)
