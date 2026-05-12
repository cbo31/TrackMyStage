import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Typography, Button, DialogTitle, DialogActions, DialogContent, TextField, IconButton, Stack, Box, Divider } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/fr'
import Notification from '/src/components/Notification.jsx';

function Details({open, onClose, onSuccess, application}) {
  //onClose is a function send from dashboard to close dialog
  const [formData, setFormData] = useState(application);
  const [errorMessage, setErrorMessage] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();

  useEffect( () => {
    if (application) {
      setFormData(application);
    }
  }, [application]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
  }

  const showError = (msg) => {
    setErrorMessage(msg);
    setOpenNotification(true);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/applications/${application.id}/update/`, {
        method: 'PATCH',
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        if (res.status === 401) {
          showError('Session Expiré, reconnectez-vous');
          setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
          }, 2000);
        } else {
          showError(`Erreur server : ${res.status}`);
        }
        return ;
      }
      
      if(res.ok){
        onSuccess();
        handleClose();
      }
    } catch (error) {
      showError('Impossible de joindre le serveur');
    };
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/applications/${application.id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          showError('Session Expiré, reconnectez-vous');
          setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
          }, 2000);
        } else {
          showError(`Erreur server : ${res.status}`);
        }
        return ;
      }
      
      if(res.ok){
        onSuccess();
        handleClose();
      }
    } catch (error) {
      showError('Impossible de joindre le serveur')
    };
  };

  return (
    <Box>
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1}}>
        <DialogTitle sx={{ m:0, p:2 }}>Détails pour "{application.position.toUpperCase()}" chez "{application.company.toUpperCase()}"</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>

        <Stack spacing={2}>
          <TextField type="text" name="position" label="Poste" size="small" 
            value={formData.position} onChange={handleChange}
            slotProps={{
              input: { sx: {fontSize: 20 }}
            }}
          />

          <Divider />

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 2 }}>

            <Stack spacing={2}>
              <TextField type="text" name="company" label="Entreprise" size="small"
                value={formData.company} onChange={handleChange} 
              />
              <TextField type="text" name="city" label="Ville" size="small" 
                value={formData.city} onChange={handleChange} 
              />
              <TextField type="text" name="contact" label="Contact" size="small" 
              value={formData.contact} onChange={handleChange} 
            />
            </Stack>

            <Divider orientation="vertical" flexItem />

            <Stack spacing={2}>
              <TextField type="text" name="date" label="Date" size="small" 
                value={formData.date} onChange={handleChange} 
              />
              <FormControl fullWidth size="small">
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="status-select"
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value={`sent`}>Envoyée</MenuItem>
                  <MenuItem value={`to_apply`}>A envoyer</MenuItem>
                  <MenuItem value={`no_response`}>Sans réponse</MenuItem>
                  <MenuItem value={`interview`}>Entretien</MenuItem>
                  <MenuItem value={`rejected`}>Refusé</MenuItem>
                </Select>
              </FormControl>
            </Stack>

          </Box>

          <Divider />

          <TextField type="text" label="Notes" name="note" multiline rows={4} fullWidth
            value={formData.note} onChange={handleChange} 
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleDelete}>supprimer</Button>
        <Button onClick={handleSubmit}>modifier</Button>
      </DialogActions>
    </Dialog>

    <Notification 
            message={errorMessage}
            open={openNotification}
            onClose={() => setOpenNotification(false)}
    />
    </Box>
  )

}

export default Details