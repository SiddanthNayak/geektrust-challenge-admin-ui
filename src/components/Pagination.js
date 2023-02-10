import React from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { ITEMS_PER_PAGE } from "../util/Constants";
import { Box, IconButton } from "@mui/material";
import "./Pagination.css";

const Pagination = ({ users, hanldePagination, pageNo }) => {
  const numberOfPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  let pages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        disabled={pageNo === 1 ? true : false}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#85CDFD",
          },
        }}
        onClick={() => hanldePagination(1)}
      >
        <FirstPageIcon />
      </IconButton>

      <IconButton
        disabled={pageNo === 1 ? true : false}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#85CDFD",
          },
        }}
        onClick={() => hanldePagination(pageNo - 1)}
      >
        <ChevronLeftIcon />
      </IconButton>
      {pages.map((page, pageIndex) => {
        return (
          <IconButton
            className={`${page === pageNo ? "active" : null}`}
            sx={{
              margin: "0 1rem",
              cursor: "pointer",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#85CDFD",
              },
            }}
            aria-label="pageNos"
            key={pageIndex}
            onClick={() => hanldePagination(page)}
          >
            {page}
          </IconButton>
        );
      })}
      <IconButton
        disabled={pageNo === numberOfPages ? true : false}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#85CDFD",
          },
        }}
        onClick={() => hanldePagination(pageNo + 1)}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        disabled={pageNo === numberOfPages ? true : false}
        sx={{
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#85CDFD",
          },
        }}
        onClick={() => hanldePagination(numberOfPages)}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
