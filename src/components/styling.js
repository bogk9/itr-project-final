import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";

export const LoginBox = styled(Box)({
  "& ": {
    borderColor: "black",
    backgroundColor: "#3A3A3C",
    borderWidth: 2,
    borderRadius: "10%",
    padding: 25,
    marginTop: 0,
    marginBottom: 16,
    borderWidth: "10px",
    textAlign: "center",
  },
});

export const DetailsBox = styled(Box)({
  "& ": {
    borderColor: "black",
    color: "white",
    backgroundColor: "#3A3A3C",
    borderWidth: 2,
    borderRadius: "10%",
    padding: 25,
    marginTop: 0,
    marginBottom: 16,
    borderWidth: "10px",
    textAlign: "center",
  },
});

export const ValidationTextField = styled(TextField)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 25,
    padding: "4px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 25,
    paddingLeft: "4px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const InputField = styled(Input)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& fieldset": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
    borderRadius: 20,
    borderColor: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    padding: "8px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    paddingLeft: "5px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white!important",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const ValidationTextFieldMultiline = styled(TextField)({
  "&": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& fieldset": {
    marginTop: 3,
    marginBottom: 3,
    borderColor: "white",
    color: "white",
  },
  "& input": {
    color: "white",
    borderRadius: 20,
    borderColor: "white",
  },
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:hover + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    padding: "8px!important",
    borderRadius: 20,
    color: "white",
  },
  "& input:valid:focus + fieldset": {
    borderColor: "white",
    borderRightWidth: 15,
    paddingLeft: "5px",
    borderRadius: 20,
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "white!important",
    borderWidth: 2,
    borderRadius: 20,
    color: "white",
  },
});

export const SubmitButton = styled(Button)({
  "& ": {
    borderColor: "white",
    backgroundColor: "white",
    height: "50px",
    borderRadius: 20,
    textAlign: "left",
    marginTop: 3,
  },
});

export const NavigationButton = styled(Button)({
  "& ": {
    borderColor: "white",
    color: "white",
    backgroundColor: "#8E8E93",
    height: "50px",
    borderRadius: 20,
    textAlign: "left",
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 2,
    marginLeft: 6,
    marginRight: 6,
    width: "100%",
    padding: "27px !important"
  },
});

export const StyledBox = styled(Box, {
  name: "StyledBox",
  slot: "Wrapper",
})({
  border: "solid",
  borderColor: "#3A3A3C",
  backgroundColor: "#3A3A3C",
  borderRadius: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "left",
  alignItems: "center",
  padding: "20px 20px 20px 20px",
  height: "5vh",
  marginBottom: 20,
  color: "white"
});

export const TagWrapper = styled(Box, {
  name: "TagWrapper",
  slot: "Wrapper",
})({
  borderColor: "#3A3A3C",
  borderRadius: 20,
  width: "max-content",
  padding: "2px 5px 2px 5px",
  color: "white",
  margin: "0px 5px 0px 0px"
});
