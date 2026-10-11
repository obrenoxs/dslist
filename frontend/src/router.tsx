import { createBrowserRouter } from 'react-router'
import App from './App'
import GameDetailsPage from './pages/GameDetailsPage'
import HomePage from './pages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'lists/:listId', element: <HomePage /> },
      { path: 'games/:gameId', element: <GameDetailsPage /> },
    ],
  },
])
