import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from '/src/components/Login.jsx'
import SignUp from '/src/components/SignUp.jsx'
import Dashboard from '/src/components/Dashboard';
import './App.css'

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // prevent flash login view
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("http://127.0.0.1:8000/api/me/", {
        headers: { 'Authorization' : `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(data => {
        setUser(data.user)                        // reconnect user
        navigate(`/${data.user.name}/dashboard`)  // navigate to user's dashboard
      })
      .catch(() => {
        localStorage.removeItem('token')          // remove invalid token
      })
      .finally(() => setLoading(false));          // stop loading in anycase
    } else {
      setLoading(false);                          // any token -> stop loading
    }
  }, []);

  if (loading) return null;  // any display during verification 

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
