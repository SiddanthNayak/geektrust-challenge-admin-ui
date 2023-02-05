import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, user, onClose, handleEdit }) => {
  const [editUser, setEditUser] = useState(user);

  const handleChange = (event) => {
    setEditUser({
      ...editUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#AFAFAF",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" gutterBottom>
            Edit User
          </Typography>
          <CloseIcon
            sx={{ cursor: "pointer", color: "#AFAFAF" }}
            onClick={onClose}
          />
        </Box>
        <TextField
          sx={{ margin: ".5rem 0" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          value={editUser?.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          sx={{ margin: ".5rem 0" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={editUser?.email}
          onChange={handleChange}
          // helperText="This link will be used to derive the video"
          fullWidth
        />
        <TextField
          sx={{ margin: ".5rem 0" }}
          id="outlined-basic"
          label="Role"
          name="role"
          value={editUser?.role}
          onChange={handleChange}
          variant="outlined"
          // helperText="This link will be used to derive the video"
          fullWidth
        />
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ marginRight: ".5em" }}
            variant="contained"
            color="success"
            onClick={() => {
              handleEdit(editUser);
              onClose();
            }}
          >
            Save Changes
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
