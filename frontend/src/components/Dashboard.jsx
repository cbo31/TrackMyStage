import { useState } from 'react';
import { Box, Button, Card, Chip, CardContent, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import NewApplication from '/src/components/NewApplication.jsx';
import data from '/src/data.js'

function Dashboard() {
  const [open, setOpen] = useState(false);

  // function to open/close dialog 'nouvelle candidature' throught properties
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const statusConfig = {
    SENT: {label: "envoyée", color: "warning"},
    INTERVIEW: {label: "Entretien", color: "success"},
    REJECTED: {label: "Refusée", color: "error"},
    TO_APPLY: {label: "A postuler", color: "default"},
    NO_RESPONSE: {label: "Sans réponse", color: "secondary"},
  }

  const columns = [
    {label:"Entreprise", key:"company"},
    {label: "Poste", key:"position"},
    {label: "Contact", key:"contact"},
    {label: "Date", key:"nextActionDate"},
    {
      label: "Etat",
      key: "status",
      render: (row) => (
        <Chip
          label={statusConfig[row.status].label}
          color={statusConfig[row.status].color}
          sx={{
            textTransform: 'uppercase',
          }}
        />
      )
    },
    {label: "Ville", key:"town"},
    { // add button beside backend data inside Table
      label: "Actions",
      key: "actions",
      hideHeader: true, // enable hide row "actions" in th
      render: (row) => (
        <Button variant="contained" size="small"> details</Button>
      )
    }
  ];

  return (
    <Box sx={{ width: 1000 }}>
      <Box sx= {{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h3" sx={{ color: "text.white" }}>Track My Stage</Typography>
        <Button variant="contained" onClick={handleOpen} sx={{ alignSelf: 'center' }}>nouvelle candidature</Button>

        <NewApplication open={open} onClose={handleClose} />
      </Box>
  
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
                    !col.hideHeader && (
                    <TableCell key={col.key} align="center" sx={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 600 }}>
                      {col.label}
                    </TableCell>
                  )
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d) =>(
                  <TableRow key={d.id}>
                    {columns.map((col) => (
                      <TableCell key={col.key} align="center" sx={{ fontSize: 16 }}>
                        {col.render ? col.render(d) : d[col.key]}
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