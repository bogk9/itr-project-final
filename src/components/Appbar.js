import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginPrompt, toggleRegisterPrompt } from "../actions/prompt";
import { logout } from "../actions/auth";
import { Autocomplete } from "./Search/Autocomplete";
import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { ProductItem } from "./Search/ProductItem";
import { NavigationButton } from "./styling";
import { Grid } from "@mui/material";

const appId = 'TL13X0C6TX';
const apiKey = 'f744c2ff133836bfd53134b3af3f3e3d';
const searchClient = algoliasearch(appId, apiKey);

const ResponsiveAppBar = (props) => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorElNav(null);
    navigate("/");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        borderRadius: 5,
        marginTop: 1,
        backgroundColor: "#3A3A3C",
      }}
    >
      <Grid container wrap="nowrap" sx={{padding: 1}} direction="row" maxWidth="xl" alignItems="center" justifyContent="center">
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3} sx={{display: "flex", justifyContent: "flex-start", maxWidth: "none !important"}}>
        <NavigationButton onClick={() => navigate('/')}>Home</NavigationButton>
          {user?.role == "2" && <NavigationButton onClick={() => navigate('/panel')}>Panel</NavigationButton>}
          <NavigationButton onClick={() => navigate('/collections')}>My Collections</NavigationButton>
        </Grid>
          <Grid item sx={{display: { xs: "none", sm: "none", md: "flex", lg: "flex", xl: "flex"}, justifyContent: "stretch"}} md={6} lg={6} xl={6} >
              <Autocomplete
                sx={{width: "100%"}}
                openOnFocus={true}
                getSources={({ query }) => [
                  {
                    sourceId: 'products',
                    getItems() {
                      return getAlgoliaResults({
                        searchClient,
                        queries: [
                          {
                            indexName: 'test_index',
                            query,
                          },
                        ],
                      });
                    },
                    templates: {
                      item({ item, components }) {
                        return <ProductItem hit={item} components={components} />;
                      },
                    },
                  },
                ]}
              />
        </Grid>

        <Grid item xs={6} sm={6} md={3} lg={3} xl={3} sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
            <Box sx={{margin: "0px 5px 0px 5px"}}>
            <Typography>
              {user
                ? "Logged as: " + user.username
                : "Not logged in."}
            </Typography>
            </Box>
            <Box sx={{margin: "0px 5px 0px 5px"}}>
            <Button
              onClick={() => {
                dispatch(toggleLoginPrompt(true));
              }}
              sx={{ display: user ? "none" : "inline" }}
              hidden
            >
              {" "}
              Log In.{" "}
            </Button>
            <Button
              onClick={() => {
                dispatch(toggleRegisterPrompt(true));
              }}
              sx={{ display: user ? "none" : "inline" }}
              hidden
            >
              {" "}
              Sign Up.{" "}
            </Button>
            </Box>

          <Box sx={{margin: "0px 20px 0px 5px"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                disabled={!user}
                key="logout"
                onClick={handleLogout}
              >
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
};
export default ResponsiveAppBar;
