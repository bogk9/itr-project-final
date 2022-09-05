import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Main } from "./components/Main/Main";
import { LoginPrompt } from "./components/LoginPrompt/LoginPrompt";
import { Collections } from "./components/CollectionsList/CollectionsList";
import { CollectionItems } from "./components/CollectionItems/CollectionItems";
import { RegisterPrompt } from "./components/RegisterPrompt/RegisterPrompt";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { Panel } from "./components/Panel/Panel";
import AppBar from "./components/Appbar";
import Footer from "./components/Footer";
import "./App.css";
import { NewCollection } from "./components/NewCollection/NewCollection";
import { NewItem } from "./components/NewItem/NewItem";
import { ItemDetails } from "./components/ItemDetails/ItemDetails";
import { EditItem } from "./components/EditItem/EditItem";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ marginTop: 1, paddingLeft: 2, paddingRight: 2 }}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} align="center">
              <AppBar />
            </Grid>
          </Grid>
        </Box>
        <Box mt={2} sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Grid container direction="row" spacing={2} sx={{marginBottom: 2}}>
            <Grid item xs={12} sm={12} md={10} lg={10}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/panel" element={<Panel />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collection/:id" element={<CollectionItems />} />
                <Route path="/collection/:type/:id" element={<CollectionItems />} />
                <Route path="/new-collection" element={<NewCollection/>}/>
                <Route path="/new-item" element={<NewItem/>}/>
                <Route path="/edit-item/:id" element={<EditItem/>}/>
              </Routes>
            </Grid>
            <Grid item xs={0} sm={0} md={2} lg={2}>
              <Box sx={{ height: "100%", display: "flex" }}>
                <SideMenu />
              </Box>
            </Grid>
            <Grid item xs={12} align="center">
              <Box>
                <Footer />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <LoginPrompt />
        <RegisterPrompt />
        <ItemDetails/>
      </div>
    </BrowserRouter>
  );
}
export default App;
