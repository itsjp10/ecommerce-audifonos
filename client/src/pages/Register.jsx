import { useState } from 'react'

export default function Register({ onAuth, switchToLogin }) {
  const [name, setName] = useState('')
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
      // const res = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // })
      // const data = await res.json()
      // if (!res.ok) throw new Error(data.message || 'Error')
      // const token = data.token

      // Simulación temporal (remover en producción)
      await new Promise(r => setTimeout(r, 800))
      const token = 'demo-token-register'

      onAuth(token)
    } catch (err) {
      setError(err.message || 'Error en el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Crear cuenta</h2>
        <p className="auth-sub">Regístrate para acceder a la tienda</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input className="auth-input" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
          <input className="auth-input" type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-btn" type="submit" disabled={loading}>{loading ? 'Creando...' : 'Registrarme'}</button>
        </form>
        <div className="auth-footer">
          <span>¿Ya tienes cuenta?</span>
          <button className="link-btn" onClick={switchToLogin}>Iniciar sesión</button>
        </div>
      </div>
    </div>
  )
}
