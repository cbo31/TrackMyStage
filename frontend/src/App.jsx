import { useState } from 'react'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Login from '/src/components/Login.jsx'
import SignUp from '/src/components/SignUp.jsx'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SignUp />
    </ThemeProvider>
  )
}

export default App
