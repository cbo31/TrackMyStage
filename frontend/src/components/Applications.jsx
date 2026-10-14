import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, Chip, CardContent, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import NewApplication from '/src/components/NewApplication.jsx';
import Details from '/src/components/Details.jsx'
import Notes from '/src/components/Notes.jsx';
import Notification from '/src/components/Notification.jsx';
import dayjs from 'dayjs'

// keys must stay in sync with Application.STATUS_CHOICES (backend/users/models.py)
const statusConfig = {
  sent: {label: "Envoyée", color: "warning"},
  interview: {label: "Entretien", color: "success"},
  rejected: {label: "Refusée", color: "error"},
  to_apply: {label: "À postuler", color: "default"},
  no_response: {label: "Sans réponse", color: "secondary"},
}

// kind is 'internship' or 'job' : the same component is used for both tabs
function Applications({ user, kind }) {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);

  const navigate = useNavigate();

  // function to open/close dialog 'nouvelle candidature' throught properties
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // function to open/close dialog 'details' throught properties
  const handleDetailsOpen = () => setOpenDetails(true);
  const handleDetailsClose = () => setOpenDetails(false);

  // helper to display notification (error)
  const showError = (msg) => {
    setErrorMessage(msg);
    setOpenNotification(true);
  }

  const fetchApplication = async () => {
    const token = localStorage.getItem('token'); // enable access to token

    try {
      const res = await fetch(`/api/applications/?kind=${kind}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status===401) {
          showError('Session expirée, reconnectez-vous');
          setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login');
          }, 2000);
        } else {
          showError(`Erreur serveur : ${res.status}`);
        }
        return;
      }

      const data = await res.json();

      if (data.message) {
        setData([]);  // the API sends {message} instead of an empty list
      } else {
        setData(data);
      }
    } catch (error) {
      showError('Impossible de joindre le serveur');
    }
  };

  useEffect(() => {
    fetchApplication()
  }, []);

  // counters displayed in the stat cards
  const stats = [
    {label: "Total", value: data.length},
    {label: "Envoyées", value: data.filter((d) => d.status === 'sent').length},
    {label: "Entretiens", value: data.filter((d) => d.status === 'interview').length},
    {label: "Refusées", value: data.filter((d) => d.status === 'rejected').length},
  ];

  // rows displayed in the table : search on company/position + status filter
  const filteredData = data.filter((d) => {
    const text = `${d.company} ${d.position}`.toLowerCase();
    const matchSearch = text.includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    {label:"Entreprise", key:"company"},
    {label: "Poste", key:"position"},
    {label: "Contact", key:"contact"},
    {
      label: "Date",
      key:"date",
      nowrap: true, // short values stay on one line
      render: (row) => dayjs(row.date).format('DD-MM-YYYY')
    },
    {
      label: "Etat",
      key: "status",
      nowrap: true,
      render: (row) => (
        <Chip
          size="small"
          label={statusConfig[row.status].label}
          color={statusConfig[row.status].color}
        />
      )
    },
    {label: "Ville", key:"city"},
    { // notes button + chevron showing that the row can be opened
      label: "",
      key: "actions",
      nowrap: true,
      render: (row) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Voir les notes">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation(); // otherwise the row click also opens Details
              setSelectedApplication(row);
              setOpenNotes(true);
            }}>
              <StickyNote2OutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Voir les détails">
            <ChevronRightIcon sx={{ color: 'text.secondary', display: 'block' }} />
          </Tooltip>
        </Box>
      )
    }
  ];

  // jobs have one more column, inserted before "Ville"
  if (kind === 'job') {
    columns.splice(5, 0, {
      label: "Salaire",
      key: "salary_expected",
      nowrap: true,
      render: (row) => row.salary_expected ? `${row.salary_expected} €` : '—'
    });
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx= {{
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        alignItems: {xs: 'stretch', sm: 'center'},
        justifyContent: 'space-between',
        gap: 2,
        mb: 3
      }}>
        <Typography variant="h4" sx={{ color: "text.white", fontWeight: 600 }}>Vos candidatures, {user.name}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ bgcolor: "white", color: "primary.main", flexShrink: 0, '&:hover': { bgcolor: "#F3F4F6" } }}
        >
          Nouvelle candidature
        </Button>

        <NewApplication open={open} onClose={handleClose} onSuccess={fetchApplication} kind={kind} />
      </Box>

      {/* stat cards : 2 columns on mobile, 4 on desktop */}
      <Box sx={{ display: 'grid', gridTemplateColumns: {xs: '1fr 1fr', sm: 'repeat(4, 1fr)'}, gap: 2, mb: 3 }}>
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
              <Typography color="text.secondary">{stat.label}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card>
        <CardContent>
          {data.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 5, textAlign: 'center' }}>
              <WorkOutlineIcon sx={{ fontSize: 56, color: 'text.secondary' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Aucune candidature pour le moment</Typography>
              <Typography color="text.secondary">Ajoutez votre première candidature pour commencer le suivi.</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Nouvelle candidature</Button>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 2, mb: 2 }}>
                <TextField fullWidth label="Rechercher (entreprise, poste)" value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <TextField select label="Etat" value={statusFilter} sx={{ minWidth: 180 }}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Tous</MenuItem>
                  {Object.keys(statusConfig).map((key) => (
                    <MenuItem key={key} value={key}>{statusConfig[key].label}</MenuItem>
                  ))}
                </TextField>
              </Box>

              {filteredData.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                  Aucune candidature ne correspond à votre recherche.
                </Typography>
              ) : (
                <TableContainer sx={{ overflowX: 'auto', width: '100%' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((col) => (
                          <TableCell key={col.key} sx={{ fontSize: 13, textTransform: 'uppercase', fontWeight: 600, color: 'text.secondary' }}>
                            {col.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.map((d) =>(
                        <TableRow
                          key={d.id}
                          hover
                          onClick={() => { setSelectedApplication(d); handleDetailsOpen() }}
                          sx={{ cursor: 'pointer' }}
                        >
                          {columns.map((col) => (
                            <TableCell key={col.key} sx={{ fontSize: 15, whiteSpace: col.nowrap ? 'nowrap' : 'normal' }}>
                              {col.render ? col.render(d) : d[col.key]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
          {selectedApplication && (
            <>
              <Details open={openDetails} onClose={handleDetailsClose} onSuccess={fetchApplication} application={selectedApplication}/>
              <Notes open={openNotes} onClose={() => setOpenNotes(false)} application={selectedApplication} />
            </>
          )}
        </CardContent>
      </Card>

      <Notification
        message={errorMessage}
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      />
    </Box>
  )
};

export default Applications
