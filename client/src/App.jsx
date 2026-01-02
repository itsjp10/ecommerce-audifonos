import { useEffect, useState } from "react";
import { getSession } from "./services/auth";
import "./App.css";
import "./styles/auth.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("register"); // 'register' | 'login'

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await getSession();
        console.log("App getSession result:", res);

        setIsAuthenticated(!!res.authenticated);
        setUser(res.user || null);
      } catch (error) {
        console.error("Session error:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    loadSession();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setView("register");
  };

  if (isAuthenticated) {
    return <Home onLogout={handleLogout} />;
  }

  return (
    <>
      {view === "register" ? (
        <Register switchToLogin={() => setView("login")} />
      ) : (
        <Login switchToRegister={() => setView("register")} />
      )}
    </>
  );
}

export default App;
