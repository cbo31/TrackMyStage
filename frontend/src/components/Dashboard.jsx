import { Box, AppBar, Toolbar, Button, Typography, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Applications from '/src/components/Applications.jsx';


function Dashboard({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };  

  return (
    <>
      <Box
      sx={{
        width: "100%",
        px: 3,                   // padding horizontal (3 * 8px = 24px)
        py: 2,                   // padding vertical
        boxShadow: "0px 3px 12px rgba(0,0,0,0.3)",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 5
      }}
    >
      <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
        TrackMyStage
      </Typography>
      <Button variant='contained' onClick={handleLogout}>déconnexion</Button>
    </Box>

    <Applications user={user}/>
    </>
  )
  
};

export default Dashboard