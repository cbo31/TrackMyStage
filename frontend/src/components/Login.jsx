import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField, Card, CardContent, Typography } from '@mui/material'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // disable refresh page by wrong submit

    try {
      const res = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if(res.ok) {
        onLoginSuccess(data.user, data.access);
      } else {
        setMessage(data.error);
      }
    } catch (error) { // error message if fetch does not work
      setMessage('Problème de connexion au serveur');
    };
  };

  const handleSignUp = () => {
    navigate("/signup");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center',
      minHeight: '100vh', px: 2, py: 4
    }}>
      <Typography variant="h3" sx={{ color: "text.white", mb: 1, textAlign: 'center' }}>TrackMyStage</Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4, textAlign: 'center' }}>
        L'application pour garder un suivi de vos candidatures
      </Typography>

      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardContent
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 3, sm: 4 } }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Se connecter</Typography>

          {message && <Alert severity="error">{message}</Alert>}

          <TextField fullWidth type="email" label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <TextField fullWidth type="password" label="Mot de passe" value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          <Button fullWidth type="submit" variant="contained" size="large">Se connecter</Button>
          <Button fullWidth onClick={handleSignUp}>Pas encore de compte ? S'inscrire</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
