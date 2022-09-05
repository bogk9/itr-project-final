import { Box, Button } from "@mui/material"
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";



export const Likes = (props) => {

const [isSelfLiked, setIsSelfLiked] = useState(false);
const user = useSelector(state => state.auth.currentUser);

const checkIsSelfLiked = () => {
    setIsSelfLiked(props.likes.some(like => like.user_id = user?.id));
}

useEffect(() => {
    checkIsSelfLiked();
}, [props.likes])

    return (
        <>
        {props.likes.length}L {user && <Button onClick={props.onLikeClick}>{isSelfLiked ? "Unlike":"Like"}</Button>}    
        </>
    )

}