import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Tags } from './Tags';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDetailsPrompt } from '../../actions/prompt';
import { Likes } from './Likes';
import axios from 'axios';
import { authHeader } from '../../services/auth-header';
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItems } from '../../actions/data';

export default function ItemEntity(props) {
  let navigate = useNavigate();
  let headers = authHeader()
  let dispatch = useDispatch();
  const {id} = useParams();
  let user = useSelector(state => state.auth.currentUser);
  const isOwner = (props.itemData.user_id == user?.id) || user?.role == "2";
  const [likes, setLikes] = useState(props.itemData.likes);

  const putData = (action, targets, headers, extraParams = {}) => {
    const params = new URLSearchParams(targets.map((s) => ["id", s]));
    Object.entries(extraParams).forEach(([key, value]) => params.append(key, value));
    return fetch(`/api/put/${action}?${params.toString()}`,{method: "PUT", headers })
    .then((res) => {
      if (!res.ok)
        return res.json().then((error) => {throw new Error(error.message);});
      return res.json();
    });
  };

  const onLikeClick = () => {
    axios.post("/api/post/" + "addLike", {item_id: props.itemData.id}, {headers})
    .then(res => res.data)
    .then((res) => setLikes(res))
  }

  const onEditClick = () => {
    navigate(`/edit-item/${props.itemData.id}`);
  }

  const onDeleteClick = () => {
    putData("deleteItem", [props.itemData.id], headers)
    .then(result => {
      dispatch(fetchItems(id));
    });
  }

  useEffect(() => {
  }, [likes])
  return (
    <Card sx={{ aspectRatio: "1 / 1", borderRadius: "22.37%", padding: 0 }}>
      <CardActionArea onClick={() => dispatch(toggleDetailsPrompt(props.itemData))}>
        <CardMedia
          component="img"
          height="75"
          image={props.itemData.img_url || "https://upload.wikimedia.org/wikipedia/commons/1/15/Iguana_iguana_colombia3.jpg"}
          alt="green iguana"
        />
        <CardContent sx={{padding: "5% 10% 5% 10%"}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.itemData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.itemData.description}
          </Typography>

          <Tags tags={props.itemData.item_tags}/>

         
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display: "flex", justifyContent: "center", flexDirection: "row", width: "100%"}}>
       <Box sx={{mt: -1}}><Likes onLikeClick={onLikeClick} likes={likes} /> {user && isOwner && id && <><Button sx={{justifySelf: 'flex-start'}} onClick={onEditClick}>Edit</Button><Button onClick={onDeleteClick} sx={{justifySelf: 'flex-end'}}>Del</Button></>}</Box>
      </CardActions>

    </Card>
  );
}
