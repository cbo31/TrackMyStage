import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, TextField, Card, CardContent, Typography } from '@mui/material'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('')
        navigate("/login")
      }, 1000);
      return () => clearTimeout(timer);
    }
  })

  const handleSignup = async (e) => {
    e.preventDefault(); // disable refresh page by wrong submit
    setMessage('');

    try {
      const res = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if(res.ok) {
        setSuccess(data.message);
        setEmail('');
        setName('');
        setPassword('');
      } else {
        // Modify data from object to list to get key/value in one field, ex : {"email": "test@test.fr"} => ["email : test@test.fr"]
        const errorMessages = Object.entries(data)
          .map(([field, errors]) => `${field} : ${errors.join(', ')}`)
          .join('\n');
        setMessage(`${errorMessages}`);
      }
    } catch (error) { // error message if the server not working. Default give by JavaScript
      console.log(error);
      setMessage(`Network error : ${error.message}`);
    }
  }

  const handleSignin = () => {
      navigate("/login");
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
          onSubmit={handleSignup}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: { xs: 3, sm: 4 } }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Créer son compte</Typography>

          {message && <Alert severity="error" sx={{ whiteSpace: "pre-line" }}>{message}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField fullWidth type="email" label="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <TextField fullWidth type="text" label="Nom" value={name}
            onChange={(e) => setName(e.target.value)}/>
          <TextField fullWidth type="password" label="Mot de passe" value={password}
            onChange={(e) => setPassword(e.target.value)}/>

          <Button fullWidth type="submit" variant="contained" size="large">S'inscrire</Button>
          <Button fullWidth onClick={handleSignin}>Déjà un compte ? Se connecter</Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SignUp
