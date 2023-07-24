import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const SecondPageFirstComponent = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      cellClassName: "name-column--cell",
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 0.1,
      cellClassName: "name-column--cell",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.4,
      cellClassName: "name-column--cell",
    },
    {
      field: "body",
      headerName: "Phone Number",
      flex: 0.4,
      cellClassName: "name-column--cell",
    },
  ];

  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setUserdata(json));
  }, []);

  const rows = userData.map((row) => ({
    // id: startId +1 ,
    userId: row.userId,
    id: row.id,
    empLastName: row.empLastName,
    title: row.title,
    body: row.body,
  }));

  return (
    <div>
      <Box m="20px">
        <Box
          m="10px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#94e2cd",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1F2A40",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: "#3e4396",
            },
            "& .MuiCheckbox-root": {
              color: `${"#b7ebde"} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${"#b72354"} !important`,
            },
          }}
        >
          {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
          <DataGrid
            checkboxSelection
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            components={{ Toolbar: GridToolbar }}
          />
          {/* <DataGrid checkboxSelection rows= { rows.map((userData, index) => ({ id: index + 1, ...userData }))} columns={columns} /> */}
        </Box>
      </Box>
    </div>
  );
};

export default SecondPageFirstComponent;
