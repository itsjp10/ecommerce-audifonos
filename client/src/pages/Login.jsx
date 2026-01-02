import { useState } from 'react'

export default function Login({ onAuth, switchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // TODO: reemplazar con la petición real al backend
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message || 'Error')
      // const token = data.token

      // Simulación temporal (remover en producción)
      await new Promise(r => setTimeout(r, 600))
      const token = 'demo-token-login'

      onAuth(token)
    } catch (err) {
      setError(err.message || 'Error en el inicio de sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Bienvenido</h2>
        <p className="auth-sub">Inicia sesión en tu cuenta</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="auth-input" type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Iniciar sesión'}</button>
        </form>
        <div className="auth-footer">
          <span>¿No tienes cuenta?</span>
          <button className="link-btn" onClick={switchToRegister}>Crear cuenta</button>
        </div>
      </div>
    </div>
  )
}
