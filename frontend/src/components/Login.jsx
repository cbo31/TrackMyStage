import { useState } from "react";
import { Box, Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material'

function Login() {
  return (
    <Box component="form">
      <Card sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Typography variant="h2">TrackMyStage</Typography>
          <Typography variant="h5">The app to track your intership's application</Typography>
          <Typography variant="h6" sx={{ textTransform: "uppercase" }}>Login</Typography>

          <TextField type="email" id="login-email" label="email" size="small"/>
          <TextField type="password" id="login-pwd" label="password" size="small"/>
        </CardContent>

        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <Button type="submit" variant="contained" size="medium">Log In</Button>
          <Button size="small">Sign Up</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login