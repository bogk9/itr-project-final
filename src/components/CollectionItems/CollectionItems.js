import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { StyledBox } from "../styling";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import ItemEntity from "./ItemEntity";
import { Link } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';
import { fetchItems } from "../../actions/data";
import { Sort } from "./Sort";


export const CollectionItems = (props) => {
  const theme = useTheme();
  const fetchedItems = useSelector(state => state.data.items);
  const [error, setError] = React.useState();
  const [ascendingOrder, setAscendingOrder] = React.useState(true);
  const { id, type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useState(location.state || {}); 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems(id, type))
    .catch(err => {
      setError(err);
      setTimeout(() => { navigate("/"); dispatch(logout());}, 2500);
    });
  }, [id, type]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
        <StyledBox>
            <Box sx={{display: "flex", justifySelf: "start" , width: "max-content"}}>
              {type && <Typography>Criteria: {type} of ID: {id} </Typography>}
              {!type && state.name && <Typography>Collection: {state.name}</Typography>}
            </Box>
            <Box sx={{display: "flex", justifySelf: "start" , width: "max-content"}}>
              <Typography>Order: </Typography>
              <Typography sx={{fontWeight: ascendingOrder && "bold"}} onClick={() => setAscendingOrder(true)}>ascending</Typography>
              <Typography>|</Typography>
              <Typography sx={{fontWeight: !ascendingOrder && "bold"}} onClick={() => setAscendingOrder(false)}>descending</Typography>
            </Box>
            <Box sx={{justifySelf: "end", display: "flex", justifyContent: "end", width: "100%"}}>
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              endIcon={<SendIcon />}
              component={Link}
              to={'/new-item'}
              state={{ id: id }}
            >
              Add new item
            </Button>
            </Box>
            {error && (
              <Typography sx={{ color: "white" }}>
                <b>Error:</b> {error} Redirecting to home page.
              </Typography>
            )}
          </StyledBox>
        </Grid>
        <Grid item xs={12} align="center">
          <StyledBox sx={{ height: "100% !important", padding: "0px !important", minHeight: "100vh", alignItems: "flex-start !important" }}>
            <Grid container spacing={4} sx={{padding: "15px 25px 15px 25px"}}>
            <Sort ascending={ascendingOrder}>
                {fetchedItems.map(item => {
                    return (
                    <Grid item xs={6} sm={4} md={4} lg={3} xl={3} style={{transition: theme.transitions.create("all", {
                      easing: theme.transitions.easing.sharp, 
                      duration: theme.transitions.duration.leavingScreen,
              })}}>
                          <ItemEntity itemData={item}/>
                    </Grid>
                    )
                })}
            </Sort>
            </Grid>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
