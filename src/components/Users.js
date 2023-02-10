import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Stack, TextField } from "@mui/material";
import "./Users.css";

const Users = ({ user, hanldeSelect, deleteHandler, editHandler }) => {
  const [isEdit, setIsEdit] = useState(false);

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    user = { ...user, [id]: value };
  };

  return (
    <>
      {isEdit ? (
        <>
          <td>
            <input
              checked={user?.isSelected || false}
              value=""
              type="checkbox"
              disabled
            />
          </td>
          <td>
            <TextField
              id="name"
              defaultValue={user.name}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <TextField
              id="email"
              defaultValue={user.email}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <TextField
              id="role"
              defaultValue={capitalizeString(user.role)}
              variant="standard"
              onChange={(e) => handleChange(e)}
            />
          </td>
          <td>
            <Stack direction="row" spacing={2}>
              <SaveIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  editHandler(user);
                  setIsEdit(false);
                }}
                color="success"
              />
              <DeleteIcon
                onClick={() => deleteHandler(user.id)}
                sx={{ cursor: "pointer" }}
                color="error"
              />
            </Stack>
          </td>
        </>
      ) : (
        <tr
          className={`${user.isSelected === true ? "selected" : "notSelected"}`}
          key={user.id}
        >
          <td>
            <input
              type="checkbox"
              checked={user?.isSelected || false}
              value={user.id}
              onChange={(event) => hanldeSelect(event)}
            />
          </td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{capitalizeString(user.role)}</td>
          <td>
            <Stack direction="row" spacing={2}>
              <EditIcon
                onClick={() => setIsEdit(true)}
                sx={{ cursor: "pointer" }}
                color="primary"
              />
              <DeleteIcon
                onClick={() => deleteHandler(user.id)}
                sx={{ cursor: "pointer" }}
                color="error"
              />
            </Stack>
          </td>
        </tr>
      )}
    </>
  );
};

export default Users;
