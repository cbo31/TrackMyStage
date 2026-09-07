import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from '/src/components/Login.jsx'
import SignUp from '/src/components/SignUp.jsx'
import Dashboard from '/src/components/Dashboard';
import Maintenance from '/src/components/Maintenance.jsx'
import './App.css'

async function checkApiHealth() {
  const res = await fetch("/api/health/");
  if (!res.ok) {
    throw new Error("unhealthy");
  }
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // prevent flash login view
  const [apiDown, setApiDown] = useState(false);
  const navigate = useNavigate();

  const probeHealth = async () => {
    try {
      await checkApiHealth();
      setApiDown(false);
      return true;
    } catch {
      setApiDown(true);
      return false;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      const healthy = await probeHealth();
      if (cancelled) return;

      if (!healthy) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');

      if (token) {
        fetch("/api/me/", {
          headers: { 'Authorization' : `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => {
          if (cancelled) return;
          setUser(data.user)                        // reconnect user
          navigate(`/${data.user.name.replace(' ', '')}/dashboard`)  // navigate to user's dashboard
        })
        .catch(() => {
          localStorage.removeItem('token')          // remove invalid token
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
      } else {
        setLoading(false);                          // any token -> stop loading
      }
    };

    boot();

    // Re-check every 30s so the app comes back after containers restart
    const intervalId = setInterval(() => {
      probeHealth();
    }, 30000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return null;  // any display during verification

  if (apiDown) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Maintenance onRetry={probeHealth} />
      </ThemeProvider>
    );
  }

  const handleLoginSuccess = (userData, token) => {
    setUser(userData); // user get from Login.jsx based on fetch
    localStorage.setItem('token', token); // Stock token in local storage under name 'token'
    navigate(`${userData.name.replace(' ', '')}/dashboard`); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/:userName/dashboard" element={user ? <Dashboard user={user}/> : <Navigate to="/login"/>}/>
          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
    </ThemeProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  )
}

export default App
