import { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from '/src/components/Login.jsx'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Login />
    </ThemeProvider>
  )
}

export default App
