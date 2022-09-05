import { Typography } from "@mui/material";

export const ErrorSection = ({error}) => {
    if(!error) return (<></>);
    if(!error.response) return (<Typography>Network error.</Typography>)
    let errs = [];
    if(Array.isArray(error.response.data.message)) errs = error.response.data.message;
    else errs.push(error);
    return (
      <>
      <Typography>Server returned errors: {errs.map(err => `${err.msg || ""} `)}</Typography>
      </>
    )
  }