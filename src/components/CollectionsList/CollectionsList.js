import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress from "@mui/material/LinearProgress";
import { NavigationButton, StyledBox } from "../styling";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import Collection from "./CollectionEntity";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { fetchCollections } from "../../actions/data";
import { authHeader } from "../../services/auth-header";

export const Collections = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const header = authHeader();
  const user = useSelector(state => state.auth.currentUser);
  const collections = useSelector(state => state.data.collections);
  const [error, setError] = React.useState();

  useEffect(() => {
     dispatch(fetchCollections(user.id, header))
      .catch(err => {
        setError(err);
        setTimeout(() => { navigate("/"); dispatch(logout());}, 2500);
      });
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <StyledBox>
            <Box sx={{justifySelf: "start" , width: "100%"}}>
            <Typography>Your colletions are shown below.</Typography>
            </Box>
            <Box sx={{justifySelf: "end", display: "flex", justifyContent: "end", width: "100%"}}>
            <NavigationButton
              variant="contained"
              sx={{ margin: 1 }}
              endIcon={<SendIcon />}
              component={Link}
              to={'/new-collection'}
            >
              Add new collection
            </NavigationButton>
            </Box>
            {error && (
              <Typography sx={{ color: "white" }}>
                <b>Error:</b> {error} Redirecting to home page.
              </Typography>
            )}
          </StyledBox>
        </Grid>
        <Grid item xs={12} align="center">
          <StyledBox sx={{ height: "100% !important", padding: "0 !important" }}>
            <Grid container spacing={2} sx={{padding: '20px 20px 20px 20px'}}>
                {collections.map(item => {
                    return (
                    <Grid item xs={3}>
                        <Collection id={item.id} name={item.name} description={item.description} img_url={item.img_url} user_id={item.user_id} />
                    </Grid>
                    )
                })}
                
            </Grid>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
