import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authHeader } from '../../services/auth-header';
import { fetchCollections } from '../../actions/data';

export default function Collection(props) {
  const header = authHeader();
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.currentUser);
  const isOwner = (props.user_id == user.id) || user.role == "2";
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

  const onDeleteClick = () => {
    putData("deleteCollection", [props.id], header)
    .then(result => {
      dispatch(fetchCollections(user.id));
    });
  }

  return (
    <Card sx={{ aspectRatio: "1 / 1", borderRadius: "22.37%", padding: 0 }}>
      <CardActionArea component={Link} to={`/collection/${props.id}`} state={{ name: props.name }}>
        <CardMedia
          component="img"
          height="100"
          image={props.img_url || "https://upload.wikimedia.org/wikipedia/commons/1/15/Iguana_iguana_colombia3.jpg"}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

        {isOwner && <Button size="small" color="primary" onClick={onDeleteClick}>
          Delete
        </Button>}
      </CardActions>
    </Card>
  );
}
