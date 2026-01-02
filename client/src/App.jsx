import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getSession } from "./services/auth";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./App.css";
import "./styles/auth.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadSession = async () => {
    try {
      const res = await getSession();
      console.log("Session: ", res);

      setIsAuthenticated(res.authenticated);
      setUser(res.user || null);
    } catch (error) {
      console.error(err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  const handleAuthSuccess = () => {
    setLoading(true);
    loadSession();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Register onAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
