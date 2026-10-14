import { Box, Button, Card, CardContent, Typography } from "@mui/material";

function Maintenance({ onRetry }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 480 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
            Service temporairement indisponible
          </Typography>
          <Typography color="text.secondary">
            TrackMyStage est en cours de redémarrage. Réessayez dans quelques instants.
          </Typography>
          <Button variant="contained" color="primary" onClick={onRetry}>
            Réessayer
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Maintenance;
