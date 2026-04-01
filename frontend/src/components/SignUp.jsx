import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

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

    if (message) {
      const timer = setTimeout(() => setMessage(''), 1000);
      return () => clearTimeout(timer);
    }
  })

  const handleSignup = async (e) => {
    e.preventDefault(); // disable refresh page by wrong submit

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
        const errorMessages = Object.entries(data) // Modify data from object to list to get key/value in one field, ex : {"email": "test@test.fr"} => ["email : test@test.fr"]
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
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" sx={{ color: "text.white", mb: 4 }}>Track My Stage</Typography>

      <Box component="form" onSubmit={handleSignup}>
        <Card 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            flexDirection: "column", 
            boxShadow: 16, 
            bgcolor: "#F9FAFB", 
            width: 400, 
            maxHeight: 465, 
            justifyContent: "center"
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>Créer son compte</Typography>
            <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "text.secondary" 
            }}>s'inscrire</Typography>
            {message && <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "error.main", textAlign: "center", whiteSpace: "pre-line"
            }}>{message}</Typography>}

            {success && <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "success.main", textAlign: "center", whiteSpace: "pre-line"
            }}>{success}</Typography>}

            <TextField type="email" label="EMAIL" size="small" value={email} 
              onChange={(e) => setEmail(e.target.value)}/>
            <TextField type="text" label="NOM" size="small" value={name} 
              onChange={(e) => setName(e.target.value)}/>
            <TextField type="password" label="MOT DE PASSE" size="small" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </CardContent>

          <CardActions sx={{ display: "flex", flexDirection: "column", mb: 1, gap: 1 }}>
            <Button type="submit" variant="contained" size="medium" sx={{ width: 194 }}>s'inscrire</Button>
            <Button size="small" onClick={handleSignin}>se connecter</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default SignUp