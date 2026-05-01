import { Dialog, Typography, Button, DialogTitle, DialogActions, DialogContent, TextField, IconButton, Stack, Box, Divider } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr'
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// bug 'Ancestor with aria-hidden: <div#root aria-hidden="true">' on closing button

// TODO : add contact field

function Details({open, onClose, onSuccess, application}) {
  //onClose is a function send from dashboard to close dialog
  const [formData, setFormData] = useState(application);

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

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/applications/${application.id}/update/`, {
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });
    
    if(res.ok){
      onSuccess();
      handleClose();
    }
  }

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/applications/${application.id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    
    if(res.ok){
      onSuccess();
      handleClose();
    }
  }

  return (
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
  )

}

export default Details