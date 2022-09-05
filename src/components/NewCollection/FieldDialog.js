import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react";
import { SubmitButton } from "../styling";


export const FieldDialog = (props) => {
    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState(''); 
    const [error, setError] = useState();
    const onAddButtonClick = (e) => {
        if (props.additionalFields.filter(field => field.type == newFieldType).length > 2) setError("Too many fields of same type!")
        else props.setAdditionalFields([...props.additionalFields, {id: props.additionalFields.length, name: newFieldName, type: newFieldType}]);
    }
    return (
            <FormControl fullWidth>
              <Box sx={{backgroundColor: "gray", borderRadius: 8, padding: 2, margin: 0.5}}>
                <Typography>Custom fields</Typography>
              <Box sx={{display: "flex", flexDirection: "row", alignItems: "stretch"}}>
                  <input sx={{flex: 1, width: "100%"}} placeholder="field name" onChange={(e) => setNewFieldName(e.target.value)}/>
                  <Select
                    sx={{flex: 1, width: "100%"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newFieldType}
                    onChange={(e) => {setNewFieldType(e.target.value); console.log("setting type: " + e.target.value)}}
                  >
                    <MenuItem value={"boolean"}>Boolean</MenuItem>
                    <MenuItem value={"integer"}>Number</MenuItem>
                    <MenuItem value={"date"}>Date</MenuItem>
                    <MenuItem value={"string"}>String</MenuItem>
                    <MenuItem value={"multiline"}>Multiline</MenuItem>
                  </Select>
                  <SubmitButton sx={{flex: 1, width: "100%"}} onClick={onAddButtonClick}>Add field</SubmitButton>
              </Box>
              <Box sx={{display: "flex", flexDirection: "row"}}>
                {props.additionalFields.map(field => {return (
                    <Box sx={{backgroundColor: "black", padding: "1px 5px 1px 5px", borderRadius: 10, margin: 0.5}}>
                      <Typography>{field.name}: {field.type}</Typography>
                    </Box>
                  )})}
              </Box>
              </Box>
            </FormControl>
    )
}