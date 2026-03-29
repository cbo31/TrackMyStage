import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from '/src/components/Login.jsx'
import SignUp from '/src/components/SignUp.jsx'
import Dashboard from '/src/components/Dashboard';
import './App.css'

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
