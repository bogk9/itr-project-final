import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Input, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { authHeader } from "../../services/auth-header";
import LinearProgress from "@mui/material/LinearProgress";
import { StyledBox } from "../styling";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FieldDialog } from "./FieldDialog";
import { keyframes } from "@mui/material";
import styled from "@emotion/styled";
import { ErrorSection } from "../utils/ErrorSection";
import MDEditor from "@uiw/react-md-editor";


export const NewCollection = () => {
  const headers = authHeader();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [availableTopics, setAvailableTopics] = useState([]);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [richDescription, setRichDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm();
  const form = useRef(null);


  const scaleAnimationIn = keyframes`
    100% { left: 0; }
    100% { opacity: 1; }
  `

  const QuestionHeaderPausedText = styled.div`
   animation: ${scaleAnimationIn} 0.7s forwards;
   -webkit-animation: ${scaleAnimationIn} 0.7s forwards;
   animation-delay: 0s;
   animation-fill-mode: forwards;
   background-color: grey;
   border-radius: 20px;
   padding: 10px;
   margin: 5px;
   left: -100px;
   position: relative;
   opacity: 0;
  `


  const onSubmit = async (fdata) => {
    const formData = new FormData(form.current);
    formData.append('additionalFields', JSON.stringify(additionalFields));
    formData.append('description', richDescription);
    axios.post("/api/post/" + "addCollection", formData, {headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        ...headers
      }})
      .then(() => navigate('/collections'))
      .catch(error => {
        console.log(error.response);
        setError(error)
      })
     
    
  }

  const getData = (action, targets, headers, extraParams = {}) => {
    const params = new URLSearchParams(targets.map((s) => ["id", s]));
    Object.entries(extraParams).forEach(([key, value]) => params.append(key, value));
    return fetch(`/api/get/${action}?${params.toString()}`,{method: "GET", headers })
    .then((res) => {
      if (!res.ok)
        return res.json().then((error) => {throw new Error(error.message);});
      return res.json();
    });
  };

  const loadTopics = () => {
    setIsLoading(true);
    getData("topics", [], headers)
      .then((response) => setAvailableTopics(response))
      .catch((error) => {
        setError(error.message); setAvailableTopics([]);
        console.log(error);
        setTimeout(() => { navigate("/"); dispatch(logout());}, 1500);
      })
      .finally(() => setIsLoading(false));
  };
    
  useEffect(() => {
    loadTopics();
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
        <StyledBox>
            <Box sx={{justifySelf: "start"}}>
            <Button
              variant="contained"
              sx={{ margin: 1 }}
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => navigate(-1)}
            >
              GO Back
            </Button>
            </Box>
            <ErrorSection error={error} />
          </StyledBox>
        </Grid>
        <Grid item xs={12}>
          <StyledBox sx={{ height: "100% !important", flexDirection: "row"}}>
          <form ref={form} onSubmit={handleSubmit(onSubmit)} id="colform">
                <input placeholder="Collection name" {...register("name", { required: true })}  />
                {errors.name && <span>This field is required</span>}
                <MDEditor height={200} value={richDescription} onChange={setRichDescription} />
                <select placeholder="Topic" {...register("topic_id", { required: true })}>
                  <option value="" disabled selected hidden>Topic...</option>
                  {availableTopics.map(topic => <option value={topic.id}>{topic.name}</option>)}
                </select>
                {errors.topic_id && <span>This field is required</span>}
                <input type="file" placeholder="File" {...register("image")} />
                {errors.image&& <span>This field is required</span>}
                <FieldDialog additionalFields={additionalFields} setAdditionalFields={setAdditionalFields}/>
              <input type="submit" />
             </form>
          </StyledBox>
        </Grid>
      </Grid>
    </>
  );
};
