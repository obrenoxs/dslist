import { MotionConfig } from 'motion/react'
import { Link, Outlet } from 'react-router'

function App() {
  return (
    // reducedMotion="user": respeita a preferência do sistema por menos animação
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="border-b border-zinc-800">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              DS<span className="text-violet-400">List</span>
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Outlet />
        </main>
      </div>
    </MotionConfig>
  )
}

export default App
