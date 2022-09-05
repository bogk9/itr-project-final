import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DetailsBox, LoginBox, StyledBox, SubmitButton, ValidationTextField } from "../styling";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { toggleDetailsPrompt, toggleLoginPrompt } from "../../actions/prompt";
import { ListItemButton, Paper, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { CLEAR_MESSAGE } from "../../actions/types";
import { Tags } from "../CollectionItems/Tags";
import { Box } from "@mui/system";
import { NewComment } from "./NewComment";
import { authHeader } from "../../services/auth-header";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export const ItemDetails = (props) => {
  const headers = authHeader();
  const navigate = useNavigate();
  const openDetailsPrompt = useSelector((state) => state.prompt.openDetailsPrompt);
  let [comments, setComments] = useState(openDetailsPrompt.comments);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(toggleDetailsPrompt(false))

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

  const refetchComments = () => {
    getData('comments', [openDetailsPrompt.id], headers)
    .then(response => setComments(response))
    .catch(err => console.log(err))
  }

  const onSubmit = async (fdata) => {
    const headers = authHeader();
    const formData = new FormData(form.current);
    axios.post("/api/post/" + "addComment", {value: fdata.value, item_id: props.itemID}, {headers})
      .catch(error => {
        console.log(error.response);
        setError(error)
      })
  }

  let interval;
  useEffect(() => {
    if(openDetailsPrompt) {
      interval = setInterval(refetchComments, 2000)
      setComments(openDetailsPrompt.comments)
    }
    return () => clearInterval(interval)
  }, [openDetailsPrompt])

  return (
    <Dialog
      open={openDetailsPrompt}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DetailsBox>
        <Typography>ID: {openDetailsPrompt.id}</Typography>
        <Typography>Name: {openDetailsPrompt.name}</Typography>
        <Typography sx={{display: "flex"}}><Tags tags={openDetailsPrompt.item_tags} /></Typography> 
        
        
        <TableContainer sx={{m:1, mt:2,  borderRadius: 6 , width: "auto"}} component={Paper}>
      <Table sx={{ minWidth: 200, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field type</TableCell>
            <TableCell align="right">Field name</TableCell>
            <TableCell align="right">Value</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(openDetailsPrompt.field_data || []).map((field) => (
            <TableRow
              key={field.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {field.field.type}
              </TableCell>
              <TableCell align="right">{field.field.name}</TableCell>
              <TableCell align="right">{field.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <List dense sx={{ width: 'auto', minWidth: 250, bgcolor: 'background.paper', m:1,  mt:2, borderRadius: 6 }}>
      {(comments || []).map((comment) => {
        const labelId = `checkbox-list-secondary-label-${comment.id}`;
        return (
          <ListItem
            key={comment.id}
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={comment.user_id}
                />
              </ListItemAvatar>
              <ListItemText sx={{color: "black"}} id={labelId} primary={comment.value} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
        <NewComment itemID={openDetailsPrompt.id} onSubmit={onSubmit}  />
      </DetailsBox>
    </Dialog>
  );
};
