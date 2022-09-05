import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { StyledBox } from "./styling";

const ResponsiveAppBar = (props) => {
  const navigate = useNavigate();
  return (
    <StyledBox 
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            2022, task#4 for intern developer training by Bogumił Kania
          </Typography>
        </Toolbar>
      </Container>
    </StyledBox>
  );
};
export default ResponsiveAppBar;
