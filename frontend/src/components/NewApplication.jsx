import { Dialog, Typography, Button, DialogTitle, DialogActions, DialogContent, TextField, IconButton, Stack, Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr'
import dayjs from "dayjs";
import { useState } from "react";

// bug 'Ancestor with aria-hidden: <div#root aria-hidden="true">' on closing button

function NewApplication({open, onClose}) {
  //onClose is a function send from dashboard to close dialog
  const [date, setDate] = useState(dayjs());

  const initialFormData = {
    'company': '',
    'town': '',
    'position': '',
    'date': date.format('YYYY-MM-DD'),
    'status': '',
    'note': '',
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setFormData(initialFormData);
  }

  const handleSubmit = () => {
    console.log("formData :", formData);
    handleClose
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1}}>
        <DialogTitle sx={{ textTransform: "uppercase", m:0, p:2 }}>nouvelle candidature</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField type="text" name="company" label="Entreprise" size="small"
              value={formData.company} onChange={handleChange} 
            />
            <TextField type="text" name="town" label="Ville" size="small" 
              value={formData.town} onChange={handleChange} 
            />
          </Stack>
          
          <TextField type="text" name="position" label="Poste" size="small" 
            value={formData.position} onChange={handleChange} 
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DatePicker 
                label="Quand ?"
                name="date"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                value={date}
                onChange={(e) => setDate(e)}
              />
            </LocalizationProvider>
          
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
              </Select>
            </FormControl>
          </Stack>

          <TextField type="text" label="Notes" name="note" multiline rows={4} fullWidth
            value={formData.note} onChange={handleChange} 
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>ajouter</Button>
      </DialogActions>
    </Dialog>
  )

}

export default NewApplication