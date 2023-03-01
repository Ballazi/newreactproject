import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import img from "../../asset/images.jpg";
import moment from 'moment/moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import apiUrl from "../../api/api.json";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from '../../Notification';


export default function RecipeReviewCard(props) {
    const [like, setLike] = useState(false);
    const [unLike, setUnLike] = useState(false);
    const [follow, setFollow] = useState(false);
    const currentUserId = localStorage.getItem("currentUserId");
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);
    const [obj, setObj] = useState({
        type: "",
        message: ""
    });
    const [opneNotification, setOpneNotification] = useState(false);
    const setNotification = () => {
        setOpneNotification(false);
        setObj({ type: "", message: "" });
    }


    const followController = (id) => {
        setOpen(true);
        axios.post(
            apiUrl.follow,
            {
                "user_id": currentUserId,
                "bloger_id": id
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    setFollow(!follow);
                }
                else {
                    setObj({ type: "warning", message: res.data.message });
                    setOpneNotification(true);
                }
            })
            .catch(error => {
                setObj({ type: "warning", message: error.response.data.message });
                setOpneNotification(true);
            })
            .finally(() => {
                setOpen(false);
            })
    }

    const likeController = (id) => {
        setOpen(true);
        axios.post(
            apiUrl.like,
            {
                "user_id": currentUserId,
                "blog_id": id
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    setFollow(!follow);
                }
                else {
                    setObj({ type: "warning", message: res.data.message });
                    setOpneNotification(true);
                }
            })
            .catch(error => {
                setObj({ type: "warning", message: error.response.data.message });
                setOpneNotification(true);
            })
            .finally(() => {
                setOpen(false);
            })
    }



    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {opneNotification ? <Notification setNotification={setNotification} obj={obj} /> : ""}


            <Card sx={{ maxWidth: "100%", height: "380px" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {props.ele.bloggerName.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="add to favorites" title='Follow Blogger'>
                            {
                                follow ? <PersonIcon onClick={() => followController(props.ele.bloggerId)} /> : <PersonOutlineIcon onClick={() => followController(props.ele.bloggerId)} />
                            }
                        </IconButton>
                    }
                    title={props.ele.bloggerName}
                    subheader={moment(props.ele.created_at).format("MMMM D, YYYY")}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.ele.image}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        {props.ele.title}
                    </Typography>
                </CardContent>
                <CardActions >
                    <IconButton aria-label="add to favorites" title='Like'>
                        {
                            like ? <ThumbUpAltIcon onClick={() => likeController(props.ele.blog_id)} /> : <ThumbUpOffAltIcon onClick={() => likeController(props.ele.blog_id)} />
                        }
                    </IconButton>
                    <IconButton aria-label="add to favorites" title='Unlike'>
                        {
                            unLike ? <ThumbDownAltIcon onClick={() => { setUnLike(!unLike) }} /> : <ThumbDownOffAltIcon onClick={() => { setUnLike(!unLike) }} />
                        }
                    </IconButton>
                    {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                </CardActions>
            </Card>
        </>
    );
}