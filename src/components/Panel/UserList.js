import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const columns = [
  { field: "id", headerName: "ID", width: 300, flex: 1 },
  { field: "username", headerName: "Name", width: 100, flex: 1 },
  { field: "email", headerName: "E-mail", width: 150, flex: 1 },
  { field: "created_at", headerName: "Joined date", width: 120, flex: 1 },
  {
    field: "role",
    headerName: "Status",
    width: 80,
    flex: 1,
    renderCell: (params) => {
      if (params.row.role == "1") {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CheckCircleRoundedIcon
              sx={{ marginRight: 0.5, color: "#57cc99" }}
            />{" "}
            User
          </Box>
        );
      }
      else if (params.row.role == "2"){
      return (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
           <CheckCircleRoundedIcon
              sx={{ marginRight: 0.5, color: "#57cc99" }}
            />{" "}
          Admin
        </Box>
      )}
      else if (params.row.role == "0"){
        return (
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <RemoveCircleRoundedIcon
              sx={{ marginRight: 0.5, color: "#f94144" }}
            />{" "}
            Blocked
          </Box>
        )}

      
    },
  },
];

export const UserList = (props) => {
  return (
    <DataGrid
      rows={props.users}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={9}
      rowsPerPageOptions={[5]}
      checkboxSelection
      sx={{
        color: "white",
        borderRadius: 5,
      }}
      onSelectionModelChange={(newSelection) => {
        props.setChecked(newSelection);
      }}
      selectionModel={props.checked}
    />
  );
};
