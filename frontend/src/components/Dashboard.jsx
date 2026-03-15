import { Box, Button, Card, CardContent, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import data from '/src/data.js'

function Dashboard() {

  const columns = [
    {label:"entreprise", key:"company"},
    {label: "poste", key:"position"},
    {label: "contact", key:"contact"},
    {label: "date", key:"nextActionDate"},
    {label: "etat", key:"status"},
    {label: "ville", key:"town"},
  ];
  
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
          justifyContent: "center",
        }}
      >
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.key} align="center" sx={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 600 }}>
                      {col.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d) =>(
                  <TableRow key={d.id}>
                    {columns.map((col) => (
                      <TableCell key={col.key} align="center" sx={{ fontSize: 16 }}>
                        {d[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>


    </Box>
  )
};

export default Dashboard