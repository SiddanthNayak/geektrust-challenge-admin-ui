import React, { useEffect, useState } from "react";
import { getUser } from "../../util/API";
import {
  TextField,
  CircularProgress,
  Container,
  InputAdornment,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "./AdminPanel.css";
import { ITEMS_PER_PAGE } from "../../util/Constants";
import Pagination from "./Pagination";
import Users from "./Users";
import { useSnackbar } from "notistack";

const AdminPanel = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState();

  const getUsersList = () => {
    setIsLoading(true);
    getUser()
      .then((response) => {
        setUserList(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar("Something went wrong. Check network", {
          variant: "error",
        });
      });
  };

  const selectAll = (event) => {
    const { checked } = event.target;
    setIsSelectAll(checked);
    filteredUsers
      .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
      .map((item) => {
        return (item.isSelected = checked);
      });
  };

  const selectUser = (event) => {
    const { value, checked } = event.target;
    userList.map((user) =>
      user.id === value ? (user.isSelected = checked) : user
    );
    setUserList([...userList]);
  };

  const searchUser = (search) => {
    if (search) {
      const searchText = search.toLowerCase();
      const searchResult = userList.filter((user) => {
        return (
          user.name.toLowerCase().search(searchText) !== -1 ||
          user.email.toLowerCase().search(searchText) !== -1 ||
          user.role.toLowerCase().search(searchText) !== -1
        );
      });
      return searchResult;
    } else {
      return userList;
    }
  };

  const onPageChange = (pageNo) => {
    setPage(pageNo);
  };

  const handleDelete = (userId) => {
    if (userId) {
      const newUserList = userList.filter((user) => user.id !== userId);
      setUserList(newUserList);
      enqueueSnackbar("Successfully deleted user", { variant: "success" });
    } else {
      const newUserList = userList.filter((user) => user.isSelected !== true);
      newUserList.length === userList.length
        ? enqueueSnackbar("No Users have been selected", {
            variant: "error",
          })
        : enqueueSnackbar("Successfully deleted selected users", {
            variant: "success",
          });

      setUserList(newUserList);
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

  const filteredUsers = searchUser(searchTerm);

  useEffect(() => {
    getUsersList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, email or role"
        name="search"
      />
      {isLoading ? (
        <Box className="loading">
          <CircularProgress />
          <h4>Loading Users...</h4>
        </Box>
      ) : filteredUsers.length ? (
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
              {filteredUsers
                .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
                .map((user) => {
                  return (
                    <Users
                      key={user.id}
                      user={user}
                      hanldeSelect={(event) => selectUser(event)}
                      deleteHandler={(id) => handleDelete(id)}
                      editHandler={(user) => handleEdit(user)}
                    ></Users>
                  );
                })}
            </tbody>
          </table>
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
              users={filteredUsers}
              hanldePagination={(pageNo) => onPageChange(pageNo)}
              pageNo={page}
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
