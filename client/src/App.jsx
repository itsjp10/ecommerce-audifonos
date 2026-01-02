import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/auth.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [view, setView] = useState('register') // 'register' | 'login'

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const handleAuth = (token) => {
    // token: string from backend after successful login/register
    if (token) {
      localStorage.setItem('token', token)
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setView('register')
  }

  if (isAuthenticated) {
    return <Home onLogout={handleLogout} />
  }

  return (
    <>
      {view === 'register' ? (
        <Register onAuth={handleAuth} switchToLogin={() => setView('login')} />
      ) : (
        <Login onAuth={handleAuth} switchToRegister={() => setView('register')} />
      )}
    </>
  )
}

export default App
