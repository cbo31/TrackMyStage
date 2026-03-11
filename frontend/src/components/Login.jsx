import { useState } from "react";
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

function Login() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" sx={{ color: "text.white", mb: 4 }}>Track My Stage</Typography>

      <Box component="form" sx={{  }}>
        <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column", boxShadow: 16, 
          bgcolor: "#F9FAFB", width: 400, height: 380, justifyContent: "center"
        }}>
          <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>L'application pour garder un suivi de vos candidatures</Typography>
            <Typography variant="h6" sx={{ textTransform: "uppercase", fontSize: 16, 
              color: "text.secondary" 
            }}>se connecter</Typography>

            <TextField type="email" id="login-email" label="EMAIL" size="small"/>
            <TextField type="password" id="login-pwd" label="PASSWORD" size="small"/>
          </CardContent>

          <CardActions sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button type="submit" variant="contained" size="medium" sx={{ width: 194 }}>se connecter</Button>
            <Button size="small">S'inscrire</Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default Login