import { Box, Typography } from "@mui/material"
import { useMemo } from "react";
import { useState } from "react";
import { TagWrapper } from "../styling";


export const Tags = (props) => {
    const [color, setColor] = useState();
    const colors = ["#FF453A", "#FF9F0A", "#FFD60A", "#30D158", "#66D4CF", "#40C8E0", "#64D2FF", "#0A84FF", "#5E5CE6", "#BF5AF2", "#FF375F", "#AC8E68"]

    useMemo(() => {
        setColor(colors[Math.floor(Math.random()*colors.length)]);
    }, [])
    return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
        {(props.tags || []).map(tag => <TagWrapper sx={{backgroundColor: color}}><Typography>#{tag.tag.name}</Typography></TagWrapper>)}
    </Box>

    )
}