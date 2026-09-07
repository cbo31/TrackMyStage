import { Box, Button, Typography } from "@mui/material";

function Maintenance({ onRetry }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="primary">
        Service temporairement indisponible
      </Typography>
      <Typography color="text.secondary">
        TrackMyStage est en cours de redémarrage. Réessayez dans quelques instants.
      </Typography>
      <Button variant="contained" color="primary" onClick={onRetry}>
        Réessayer
      </Button>
    </Box>
  );
}

export default Maintenance;
