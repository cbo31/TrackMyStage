import { Snackbar, Alert } from "@mui/material";

function Notification({ message, open, onClose, severity = "error"}) {
  const handleClose = (event, reason) => {
    if ( reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'center', horizontal: 'center'}}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  )
};

export default Notification;