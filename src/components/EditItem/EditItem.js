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
import { useForm } from "react-hook-form";
import axios from "axios";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TagInput } from "../NewItem/TagInput";

export const EditItem = () => {
  const headers = authHeader();
  const navigate = useNavigate();
  const { id } = useParams(); // item id, for edit
  const [itemData, setItemData] = useState();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraFieldsState, setExtraFieldsState] = useState({});
  const [error, setError] = React.useState();
  const form = useRef(null);
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();

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

  function onExtraFieldChanged(fieldId) {
    return (event) => {
        let currentState = {...extraFieldsState};
        currentState[fieldId] = event.target.value;
        setExtraFieldsState(currentState);
    };
  }

  const onSubmit = async () => {
    const formData = new FormData(form.current);
    formData.append('extraFields', JSON.stringify(extraFieldsState));
    formData.append('tags', JSON.stringify(tags));
    formData.append('id', id);
    axios.post("/api/post/" + "editItem", formData, {headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        ...headers
      }})
    .then(() => navigate(-1))
  }
  
  const loadItemData = () => {
    setIsLoading(true);
    return sendRequest("itemData", [id], authHeader)
      .then(response => {
        setTags(response.item_tags.map(tag => {return {id: String(tag.tag_id), text: tag.tag.name}}))
        setItemData(response);
        let fields = {};
        response.field_data.map(field => {fields[field.field_id] = field.value;})
        setExtraFieldsState(fields);
        reset({name: response.name})
    })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadItemData()
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
            <Typography>Editing item: {id}</Typography>
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
                <input placeholder="Item name" {...register("name", { required: false })}  />
                {errors.name && <span>This field is required</span>}
                <TagInput setTags={setTags} tags={tags} loadFields={loadItemData} />
                <input type="file" placeholder="File" {...register("image", { required: false })} />
                <Typography>Custom fields:</Typography>
                {(itemData?.field_data || []).map((field, index) => {
                    if(field.field.type=="string" ) return <input value={extraFieldsState[field.field_id]} placeholder={field.field.name} onChange={onExtraFieldChanged(field.field_id)} />
                    if(field.field.type=="multiline" ) return <textarea value={field.value} placeholder={field.field.name} onChange={onExtraFieldChanged(field.field_id)}/>
                    if(field.field.type=="integer") return <input type="number" placeholder={field.field.name} onChange={onExtraFieldChanged(field.id)} />
                    if(field.field.type=="boolean" ) {
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
