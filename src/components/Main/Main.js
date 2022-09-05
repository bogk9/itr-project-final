import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { toggleRegisterPrompt, toggleLoginPrompt } from "../../actions/prompt";
import { StyledBox } from "../styling";
import { Button } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../actions/data";
import ItemEntity from "../CollectionItems/ItemEntity";

export const Main = () => {
  const theme = useTheme();
  const stateItems = useSelector(state => state.data.items)
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems("", "item"));
  }, [])

  useEffect(() => {
    setItems(stateItems);
  }, [stateItems])

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
        <StyledBox sx={{ height: "100% !important", padding: "0px !important", minHeight: "100vh", alignItems: "flex-start !important" }}>


            <Grid container spacing={4} sx={{padding: "15px 25px 15px 25px"}}>
                  {items.map(item => {
                      return (
                      <Grid item xs={6} sm={4} md={4} lg={3} xl={3} style={{transition: theme.transitions.create("all", {
                        easing: theme.transitions.easing.sharp, 
                        duration: theme.transitions.duration.leavingScreen,
                })}}>
                            <ItemEntity itemData={item}/>
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
