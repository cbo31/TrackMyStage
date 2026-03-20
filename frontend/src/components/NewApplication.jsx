import { Dialog, Typography, Button } from "@mui/material";
import { useState } from "react";

// bug 'Ancestor with aria-hidden: <div#root aria-hidden="true">' on closing button

function NewApplication({open, onClose}) {
  return (
    <Dialog open={open} onClose={onClose} container={document.body}>
      <Typography variant="h3">Test</Typography>
      <Button onClick={onClose}>cancel</Button>
    </Dialog>
  )

}

export default NewApplication