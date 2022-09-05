import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { authHeader } from "../../services/auth-header";
import LinearProgress from "@mui/material/LinearProgress";
import { StyledBox } from "../styling";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import axios from "axios";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TagInput } from "./TagInput";
import "react-datepicker/dist/react-datepicker.css";
import MDEditor from "@uiw/react-md-editor";


export const NewItem = () => {
  const headers = authHeader();
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useState(location.state || {}); // collection id
  const { id } = useParams(); // item id, for edit
  const [fetchedFields, setFetchedFields] = useState();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraFieldsState, setExtraFieldsState] = useState({});
  const [error, setError] = React.useState();
  const form = useRef(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const sendRequest = (action, ids, extraParams = {}) => {
    const params = new URLSearchParams(ids.map((s) => ["id", s]));
    Object.entries(extraParams).forEach(([key, value]) => params.append(key, value));
    return fetch(`/api/get/${action}?${params.toString()}`,{method: "GET", headers })
    .then((res) => {
      if (!res.ok)
        return res.json().then((text) => {throw new Error(text.message);});
      return res.json();
    });
  };

  function onExtraFieldChanged(fieldName) {
    return (e) => {
        let currentState = {...extraFieldsState};
        currentState[fieldName] = e?.target?.value || e;
        setExtraFieldsState(currentState);
    };
  }


  const onSubmit = async () => {
    const formData = new FormData(form.current);
    formData.append('extraFields', JSON.stringify(extraFieldsState));
    formData.append('tags', JSON.stringify(tags));
    formData.append('collection_id', state.id);
    axios.post("/api/post/" + "addItem", formData, {headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        ...headers
      }})
    .then(() => navigate(-1))
  }
  
  const loadData = (endpoint) => {
    setIsLoading(true);
    return sendRequest(endpoint, [state.id], authHeader)
      .then((response) => response)
      .catch((error) => {
        setError(error.message); setFetchedFields([]);
        setTimeout(() => { navigate("/"); /*dispatch(logout()); */}, 1500);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData("availableFields")
    .then(response => {if(response.length>0) setFetchedFields(response)})
  }, []);

 
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
        <StyledBox>
            <Box sx={{justifySelf: "start"}}>
            <Button variant="contained" sx={{ margin: 1 }} startIcon={<ArrowBackIosNewIcon />} onClick={() => navigate(-1)}>
              GO Back
            </Button>
            </Box>
            <Typography>Adding items to collection: {state.id}</Typography>
            {error && (
              <Typography sx={{ color: "white" }}>
                <b>Error:</b> {error} Redirecting to home page.
              </Typography>
            )}
          </StyledBox>
        </Grid>
        <Grid item xs={12} align="center">
          <StyledBox sx={{ height: "100% !important", flexDirection: "row"}}>
          <form ref={form} onSubmit={handleSubmit(onSubmit)} id="colform">
                <input placeholder="Item name" {...register("name", { required: true })}  />
                {errors.name && <span>This field is required</span>}
                <TagInput setTags={setTags} tags={tags} loadFields={loadData} />
                <input type="file" placeholder="File" {...register("image", { required: true })} />
                <Typography>Custom fields:</Typography>
                {(fetchedFields || []).map((field, index) => {
                   
                    if(field.type=="string" ) return <input placeholder={field.name} onChange={onExtraFieldChanged(field.id)} />
                    if(field.type=="multiline" ) return <MDEditor textareaProps={{placeholder: field.name}} height={200} value={extraFieldsState[String(field.id)]} onChange={onExtraFieldChanged(field.id)} />
                    if(field.type=="date" ) return <DatePicker placeholder={field.name} selected={extraFieldsState[String(field.id)]} onChange={onExtraFieldChanged(field.id)}/>
                    if(field.type=="integer") return <input type="number" placeholder={field.name} onChange={onExtraFieldChanged(field.id)} />
                    if(field.type=="boolean" ) {
                        return <Box className="bool-input">
                          <label for={field.name}>
                            <Typography sx={{mr: 2}}>{field.name}</Typography>
                            </label>
                            <Typography>True</Typography>
                            <input {...register('x', { required: true })} type="radio" className="bool-radio" name={field.name} value="true" onChange={onExtraFieldChanged(field.id)}/>
                            <Typography>False</Typography>
                            <input className="bool-radio"{...register('x', { required: true })}  type="radio" name={field.name} value="false" onChange={onExtraFieldChanged(field.id)}/>
                          </Box>
                    }
                })}
                <input type="submit" />
             </form>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
