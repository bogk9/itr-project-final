import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { TagCloud } from 'react-tagcloud'
import { authHeader } from "../../services/auth-header";
import { useNavigate } from "react-router-dom";


export const SideMenu = () => {
  const headers = authHeader();
  const navigate = useNavigate();
  let [tags, setTags] = useState([]);
  let [collectionsChart, setCollectionsChart] = useState([]);
  const colors = ["#FF453A", "#FF9F0A", "#30D158", "#66D4CF", 
  "#40C8E0", "#64D2FF", "#0A84FF", "#5E5CE6", "#BF5AF2", "#FF375F", "#AC8E68"]
  const getData = (action, targets, headers, extraParams = {}) => {
    const params = new URLSearchParams(targets.map((s) => ["item_id", s]));
    Object.entries(extraParams).forEach(([key, value]) => params.append(key, value));
    return fetch(`/api/get/${action}?${params.toString()}`,{method: "GET" })
    .then((res) => {
      if (!res.ok)
        return res.json().then((error) => {throw new Error(error.message);});
      return res.json();
    });
  };


  useEffect(() => {
    getData('tagsChart', [], headers)
    .then(response => setTags(response.map(tag => {return {...tag, color: colors[Math.floor(Math.random()*colors.length)]}})))
  }, [])

  useEffect(() => {
    getData("collectionsChart", [], headers)
    .then(response => setCollectionsChart(response));
  }, [])

  const ContentHeader = styled(ListItem)({
    "& ": {
      borderColor: "black",
      backgroundColor: "#3A3A3C",
      borderWidth: 2,
      borderRadius: 20,
      padding: 15,
      borderWidth: "10px",
      textAlign: "left",
    },
  });
  const Content = styled(Typography)({
    "& ": {
      color: "white",
      fontWeight: 500,
      fontSize: 20,
    },
  });

  return (
    <div id="thread">
      <Box
        sx={{ height: "100%" }}
        display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}
      >
        <Grid container spacing={2}>
          <Grid sx={{ display: "flex" }} item xs={0} sm={12} md={12} lg={12}>
            <ContentHeader
              id="side"
              sx={{ flexDirection: "column", display: "flex" }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ backgroundColor: "#0097d7", height: 10 }} />
                <Box sx={{ backgroundColor: "#d0f4de", height: 10 }} />
              </Box>
              <Content id="sidetitle">Hello.</Content>
              <Content id="sidetext">
                This is a project for iTransition Intern Developer program.
              </Content>
              <Content id="sidetext">
                Tech stack includes: React, Redux, MUI, jsonwebtoken, bcryptjs,
                node, express, mysql, objection.js, aglolia-search and more...
              </Content>
            </ContentHeader>
          </Grid>

          <Grid sx={{ display: "flex" }} item xs={12}>
            <ContentHeader>
              <TagCloud tags={tags} minSize={12} maxSize={35} onClick={tag => navigate(`/collection/tag/${tag.tag_id}`)} />
            </ContentHeader>
          </Grid>

          <Grid sx={{ display: "flex" }} item xs={12}>
            <ContentHeader>
              <ListItemText
                secondary={
                  <React.Fragment>
                    {collectionsChart.map(col => <Content>{col.name}: {col.count} items</Content>)}
                  </React.Fragment>
                }
              />
            </ContentHeader>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
