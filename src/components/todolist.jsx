import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import img from "../assets/Avatar.png";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AddTaskIcon from "@mui/icons-material/AddTask";
import InfoIcon from "@mui/icons-material/Info";
import Menu from "@mui/material/Menu";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


export default function Todolists() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Stive Jobss",
      email: "jackson.graham@example.com",
      phone: "88880090",
      country: "Dushanbe",
      completed: true,
      photo: img,
    },
    {
      id: "2",
      name: "Elena Moarz",
      email: "elena@example.com",
      phone: "88880091",
      country: "Dushanbe",
      completed: true,
      photo: img,
    },
    {
      id: "3",
      name: "Steve Jobs",
      email: "steve@example.com",
      phone: "88880092",
      country: "Khujand",
      completed: false,
      photo: img,
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoUser, setInfoUser] = useState(null);
  const cities = ["All", "Dushanbe", "Khujand", "Bokhtar", "Hisar", "Kulob"];
  const [anchorEl, setAnchorEl] = useState(null);
 


 

  

  const handleDelete = (id) => {
    setUsers(users.filter((el) => el.id !== id));
  };

  const open1 = Boolean(anchorEl);

  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleEdit = (user) => {
    setCurrentUser({ ...user });
    setOpen(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdd = () => {
    setCurrentUser({
      id: Date.now().toString(),
      name: "",
      email: "",
      phone: "",
      country: "",
      completed: false,
      photo: img,
    });
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !currentUser.name ||
      !currentUser.email ||
      !currentUser.phone ||
      !currentUser.country
    )
      return;

    const exists = users.some((el) => el.id === currentUser.id);
    if (exists) {
      setUsers(
        users.map((el) => (el.id === currentUser.id ? currentUser : el))
      );
    } else {
      setUsers([...users, currentUser]);
    }

    setOpen(false);
  };

  const handleCompleteToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, completed: !user.completed } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    return (
      (statusFilter === "All" ||
        (statusFilter === "Active" ? user.completed : !user.completed)) &&
      (cityFilter === "All" || user.country === cityFilter) &&
      `${user.name} ${user.email} ${user.phone} ${user.country}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">User List</Typography>

        <Button variant="contained" onClick={handleAdd}>
          +Add
        </Button>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {" "}
          <Button variant="outlined">
            light
            <LightModeIcon />
          </Button>
          <Button variant="outlined">
            dark <DarkModeIcon />
          </Button>
        </div>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
        <TextField
          label="Search"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
          label="Status"
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <TextField
          label="City"
          select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img
                      src={user.photo}
                      alt="avatar"
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                    <Box>
                      <Typography>{user.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <Typography
                    color={user.completed ? "green" : "red"}
                    fontWeight="bold"
                  >
                    {user.completed ? "ACTIVE" : "INACTIVE"}
                  </Typography>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      id="basic-button"
                      aria-controls={open1 ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open1 ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <LinearScaleIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open1}
                      onClose={handleClose1}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose1}>
                        {" "}
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={handleClose1}>
                        {" "}
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleCompleteToggle(user.id)}
                        >
                          <AddTaskIcon />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={handleClose1}>
                        {" "}
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(user)}
                        >
                          <ModeEditOutlineIcon />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={handleClose1}>
                        {" "}
                        <Button
                          variant="outlined"
                          onClick={() => setInfoUser(user)}
                        >
                          <InfoIcon />
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentUser?.id ? "Edit User" : "Add User"}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              fullWidth
              value={currentUser?.name || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              fullWidth
              value={currentUser?.email || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
            />
            <TextField
              label="Phone"
              fullWidth
              value={currentUser?.phone || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, phone: e.target.value })
              }
            />
            <TextField
              label="City"
              fullWidth
              value={currentUser?.country || ""}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, country: e.target.value })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.completed || false}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      completed: e.target.checked,
                    })
                  }
                />
              }
              label="Completed"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/*infomodal*/}
      <Dialog
        open={Boolean(infoUser)}
        onClose={() => setInfoUser(null)}
        fullWidth
        maxWidth="sm"
        style={{marginLeft:"60%",width:"60%",height:"100vh"
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setInfoUser(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {infoUser && (
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <img
                  src={infoUser.photo}
                  alt="avatar"
                  width={60}
                  height={60}
                  style={{ borderRadius: "50%" }}
                />
                <Box>
                  <Typography variant="h6">{infoUser.name}</Typography>
                  <Typography color="text.secondary">
                    {infoUser.email}
                  </Typography>
                </Box>
              </Stack>
              <Typography>
                <strong>Phone:</strong> {infoUser.phone}
              </Typography>
              <Typography>
                <strong>City:</strong> {infoUser.country}
              </Typography>
              <Typography>
                <strong>Status:</strong>{" "}
                {infoUser.completed ? "Active" : "Inactive"}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoUser(null)}>Close</Button>
        </DialogActions>
      </Dialog>
       <div>
     
    </div>

    </Container>
  );
}
