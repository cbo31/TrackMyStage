import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// read-only dialog : the note is edited in Details.jsx
function Notes({open, onClose, application}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pr: 1}}>
        <DialogTitle sx={{ m:0, p:2, flex: 1, wordBreak: 'break-word' }}>Notes — {application.company}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        {application.note ? (
          // pre-line keeps the line breaks typed in the multiline field
          <Typography sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{application.note}</Typography>
        ) : (
          <Typography color="text.secondary">Aucune note pour cette candidature.</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Notes
