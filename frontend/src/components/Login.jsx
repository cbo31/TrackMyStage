import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // disable refresh page by wrong submit

    try {
      console.log('Tentative de connexion...', {email, password});

      const res = await fetch('/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('Réponse reçue :', {statue: res.status, ok: res.ok});

      const data = await res.json();
      console.log('Données parsées :', data);

      if(res.ok) {
        console.log('✅ Connexion réussie');
        onLoginSuccess(data.user, data.access);
      } else {
        console.log('❌ Erreur API:', data.error);
        setMessage(data.error);
      }
    } catch (error) { // error message if fetch does not work
      console.error('💥 Exception:', error);
      setMessage('probleme de connexion au serveur');
    };
  };

  const handleSignUp = () => {
    navigate("/signup");
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" sx={{ color: "text.white", mb: 4 }}>Track My Stage</Typography>

      <Box component="form" onSubmit={handleLogin}>
        <Card 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            flexDirection: "column", 
            boxShadow: 16, 
            bgcolor: "#F9FAFB", 
            width: 400, 
            maxHeight: 410, 
            justifyContent: "center"
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>L'application pour garder un suivi de vos candidatures</Typography>
            <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "text.secondary" 
            }}>se connecter</Typography>
            {message && <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "error.main"
            }}>{message}</Typography>}

            <TextField type="email" label="EMAIL" size="small" value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
            <TextField type="password" label="MOT DE PASSE" size="small" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </CardContent>

          <CardActions sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button type="submit" variant="contained" size="medium" sx={{ width: 194 }}>se connecter</Button>
            <Button size="small" onClick={handleSignUp}>S'inscrire</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default Login