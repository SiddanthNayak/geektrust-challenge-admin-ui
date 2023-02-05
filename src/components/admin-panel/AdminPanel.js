import React, { useEffect, useState } from "react";
import { getUser } from "../../util/API";
import {
  TextField,
  CircularProgress,
  Container,
  InputAdornment,
  Box,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "./AdminPanel.css";
import { ITEMS_PER_PAGE } from "../../util/Constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "./EditModal";

const AdminPanel = () => {
  const [userList, setUserList] = useState([]);
  const [tempUserList, setTempUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState();

  const getUsersList = () => {
    setIsLoading(true);
    getUser()
      .then((response) => {
        setTempUserList(response);
        setUserList(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleOpen = (userId) => {
    setEditUser(userList.find((user) => user.id === userId));
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const selectAll = (event) => {
    const { checked } = event.target;
    setIsSelectAll(checked);
    userList
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      .map((item) => {
        return (item.isSelected = checked);
      });
    setUserList([...userList]);
  };

  const selectUser = (event) => {
    const { value, checked } = event.target;
    userList.map((user) =>
      user.id === value ? (user.isSelected = checked) : user
    );
    setUserList([...userList]);
  };

  const searchUser = (search) => {
    const searchText = search.toLowerCase();
    const searchResult = tempUserList.filter((user) => {
      return (
        user.name.toLowerCase().search(searchText) !== -1 ||
        user.email.toLowerCase().search(searchText) !== -1 ||
        user.role.toLowerCase().search(searchText) !== -1
      );
    });
    setUserList(searchResult);
  };

  const onPageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (userId) => {
    if (userId) {
      const newUserList = userList.filter((user) => user.id !== userId);
      setUserList(newUserList);
      setTempUserList(newUserList);
    } else {
      const newUserList = userList.filter((user) => user.isSelected !== true);
      setUserList(newUserList);
      setTempUserList(newUserList);
    }
    if (isSelectAll) {
      setIsSelectAll(!isSelectAll);
    }
  };

  const handleEdit = (user) => {
    const newUserList = userList.map((item) => {
      return item.id === user.id ? user : item;
    });
    setUserList(newUserList);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Container sx={{ paddingTop: "5rem" }} maxWidth="lg">
      <TextField
        sx={{ marginBottom: "2rem", borderColor: "black" }}
        size="small"
        InputProps={{
          className: "search",
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => searchUser(e.target.value)}
        placeholder="Search by name, email or role"
        name="search"
      />
      {isLoading ? (
        <Box className="loading">
          <CircularProgress />
          <h4>Loading Users...</h4>
        </Box>
      ) : userList.length ? (
        <Box>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    checked={isSelectAll}
                    value="selectAll"
                    onChange={(event) => selectAll(event)}
                    type="checkbox"
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList
                .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                .map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={user?.isSelected || false}
                          value={user.id}
                          onChange={(event) => selectUser(event)}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{capitalizeString(user.role)}</td>
                      <td>
                        <Stack direction="row" spacing={2}>
                          <EditIcon
                            onClick={() => handleOpen(user.id)}
                            sx={{ cursor: "pointer" }}
                            color="primary"
                          />
                          <DeleteIcon
                            onClick={() => handleDelete(user.id)}
                            sx={{ cursor: "pointer" }}
                            color="error"
                          />
                        </Stack>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {open ? (
            <EditModal
              open={open}
              user={editUser}
              onClose={() => handleClose()}
              handleEdit={(user) => handleEdit(user)}
            />
          ) : null}

          <Stack
            marginY="1rem"
            direction="row"
            justifyContent="center"
            spacing={4}
          >
            <Button
              onClick={() => handleDelete()}
              variant="contained"
              color="error"
            >
              Delete Selected
            </Button>
            <Pagination
              color="primary"
              sx={{ margin: "auto" }}
              page={page}
              onChange={onPageChange}
              count={Math.ceil(userList.length / ITEMS_PER_PAGE)}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      ) : (
        <Box className="loading">
          <h4>No users found.</h4>
        </Box>
      )}
    </Container>
  );
};

export default AdminPanel;
