import { Box } from "@mui/material"
import axios from "axios";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { authHeader } from "../../services/auth-header";



export const NewComment = (props) => {
    const user = useSelector(state => state.auth.currentUser);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const form = useRef(null);

    const onSubmit = async (fdata) => {
        const headers = authHeader();
        const formData = new FormData(form.current);
        axios.post("/api/post/" + "addComment", {value: fdata.value, item_id: props.itemID}, {headers})
          .then(() => navigate('/collections'))
          .catch(error => {
            setError(error)
          })
      }

    return (
        user && <Box sx={{backgroundColor: "grey", borderRadius: 10, mt: 2}}>
             <form ref={form} onSubmit={handleSubmit(onSubmit)} id="colform">
                <input placeholder="Comment" {...register("value", { required: true })}  />
                {errors.name && <span>Write comment to post it.</span>}
                <input type="submit" />
             </form>
        </Box>
    )
}