import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Typography, Button, DialogTitle, DialogActions, DialogContent, TextField, IconButton, Stack, Box, Divider } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/fr'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import Notification from '/src/components/Notification.jsx';

function Details({open, onClose, onSuccess, application}) {
  //onClose is a function send from dashboard to close dialog
  const [formData, setFormData] = useState(application);

  // variables to display expire ession
  const [errorMessage, setErrorMessage] = useState('');
  const [openNotification, setOpenNotification] = useState(false);

  // first click on 'supprimer' asks for a confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);

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
    setConfirmDelete(false);
    onClose();
  }

  const showError = (msg) => {
    setErrorMessage(msg);
    setOpenNotification(true);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`/api/applications/${application.id}/update/`, {
        method: 'PATCH',
        headers: {
          'Authorization' : `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          // the API refuses "" for a number : an empty salary is sent as null
          salary_expected: formData.salary_expected === '' ? null : formData.salary_expected,
        }),
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
      const res = await fetch(`/api/applications/${application.id}/delete/`, {
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
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth >

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1}}>
          <DialogTitle sx={{ m:0, p:2, flex: 1, wordBreak: 'break-word' }}>Détails pour "{application.position.toUpperCase()}" chez "{application.company.toUpperCase()}"</DialogTitle>
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

            <Box sx={{ display: "grid", gridTemplateColumns: {xs: '1fr', sm: '1fr auto 1fr'}, gap: 2 }}>
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

              <Divider orientation="vertical" flexItem sx={{ display: {xs: 'none', sm: 'block'} }} />

              <Stack spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <DatePicker 
                    label="Quand ?"
                    name="date"
                    slotProps={{ textField: { size: "small", fullWidth: true } }}
                    value={formData.date ? dayjs(formData.date) : null}
                    onChange={(newDate) => {
                      setFormData({...formData, date: newDate.format('YYYY-MM-DD')})
                    }}
                  />
                </LocalizationProvider>
                
                <FormControl fullWidth size="small">
                  <InputLabel id="status">Statut</InputLabel>
                  <Select
                    labelId="status"
                    id="status-select"
                    label="Statut"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <MenuItem value={`sent`}>Envoyée</MenuItem>
                    <MenuItem value={`to_apply`}>À postuler</MenuItem>
                    <MenuItem value={`no_response`}>Sans réponse</MenuItem>
                    <MenuItem value={`interview`}>Entretien</MenuItem>
                    <MenuItem value={`rejected`}>Refusée</MenuItem>
                  </Select>
                </FormControl>

                {application.kind === 'job' && (
                  <>
                    {/* salary_expected is null when empty, a TextField needs '' */}
                    <TextField type="number" name="salary_expected" label="Salaire souhaité (€ brut/an)" size="small"
                      value={formData.salary_expected ?? ''} onChange={handleChange}
                    />
                    <FormControlLabel label="Négociable" control={
                      <Checkbox checked={formData.salary_negotiable}
                        onChange={(e) => setFormData({ ...formData, salary_negotiable: e.target.checked })}
                      />
                    } />
                  </>
                )}
              </Stack>
            </Box>

            <Divider />

            <TextField type="text" label="Notes" name="note" multiline rows={4} fullWidth
              value={formData.note} onChange={handleChange} 
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          {confirmDelete ? (
            <>
              <Typography sx={{ mr: 'auto' }}>Supprimer définitivement ?</Typography>
              <Button onClick={() => setConfirmDelete(false)}>Annuler</Button>
              <Button variant="contained" color="error" onClick={handleDelete}>Confirmer</Button>
            </>
          ) : (
            <>
              <Button color="error" onClick={() => setConfirmDelete(true)} sx={{ mr: 'auto' }}>Supprimer</Button>
              <Button variant="contained" onClick={handleSubmit}>Modifier</Button>
            </>
          )}
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