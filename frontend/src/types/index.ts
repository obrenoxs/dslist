export interface GameList {
  id: number
  name: string
}

export interface GameMin {
  id: number
  title: string
  year: number
  imgUrl: string
  shortDescription: string
}

export interface Game extends GameMin {
  genre: string
  platforms: string
  score: number
  longDescription: string
}

export interface ApiErrorBody {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}
