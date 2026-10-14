import { useState } from 'react'
import { Avatar, Box, Button, Tab, Tabs, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import Applications from '/src/components/Applications.jsx';


function Dashboard({ user }) {
  const [tab, setTab] = useState(0);  // 0 = stages, 1 = emplois
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* "glass" header : translucent white + blur of what scrolls behind */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          bgcolor: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          TrackMyStage
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32, fontSize: 16, bgcolor: "white", color: "primary.main", fontWeight: 600 }}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Typography sx={{ color: "white", display: { xs: "none", sm: "block" } }}>{user.name}</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", '&:hover': { borderColor: "white" } }}
          >
            Déconnexion
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1000, px: 2, pt: 3, mx: 'auto' }}>
        <Tabs
          value={tab}
          onChange={(e, newTab) => setTab(newTab)}
          textColor="inherit"
          sx={{
            color: "white",
            mb: 3,
            '& .MuiTab-root': { textTransform: "none", fontSize: 16, fontWeight: 600 },
            '& .MuiTabs-indicator': { bgcolor: "white", height: 3, borderRadius: 2 },
          }}
        >
          <Tab label="Stages" />
          <Tab label="Emplois" />
        </Tabs>

        {/* kind keys must stay in sync with Application.KIND_CHOICES (backend/users/models.py) */}
        {tab === 0 && <Applications user={user} kind="internship" />}
        {tab === 1 && <Applications user={user} kind="job" />}
      </Box>
    </>
  )
};

export default Dashboard
