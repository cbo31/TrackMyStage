import { Box, Card, CardContent, Divider, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import data from '/src/data.js'

function Dashboard() {
  return (
    <Box sx={{ width: 1000 }}>
      <Typography variant="h3" sx={{ color: "text.white" }}>Track My Stage</Typography>
      <Divider sx={{ m: 2 }}/>

      <Card
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          flexDirection: "column", 
          boxShadow: 16, 
          bgcolor: "#F9FAFB",  
          justifyContent: "center"
        }}
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ fontSize: 16, textTransform: 'uppercase', fontWeight: 600 }}>
                  <TableCell>Entreprise</TableCell>
                  <TableCell>Poste</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Etat</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>


    </Box>
  )
};

export default Dashboard