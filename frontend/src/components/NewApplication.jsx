import { Dialog, Typography, Button, DialogTitle, DialogActions, DialogContent, TextField, IconButton, Stack, Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fr'
import { useState } from "react";

// bug 'Ancestor with aria-hidden: <div#root aria-hidden="true">' on closing button

function NewApplication({open, onClose}) {
  return (
    <Dialog open={open} onClose={onClose} >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1}}>
        <DialogTitle sx={{ textTransform: "uppercase", m:0, p:2 }}>nouvelle candidature</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <TextField type="text" name="company" label="Entreprise" size="small" />
            <TextField type="text" name="town" label="Ville" size="small" />
          </Stack>
          
          <TextField type="text" name="position" label="Poste" size="small" />

          <Stack direction="row" spacing={2} alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <DatePicker 
                label="Quand ?"
                slotProps={{ textField: { size: "small", fullWidth: true } }}/>
            </LocalizationProvider>
          
            <FormControl fullWidth size="small">
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status-select"
                label="Status"
              >
                <MenuItem value={`sent`}>Envoyée</MenuItem>
                <MenuItem value={`to_apply`}>A envoyer</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TextField type="text" label="Notes" multiline rows={4} fullWidth/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ajouter</Button>
      </DialogActions>
    </Dialog>
  )

}

export default NewApplication