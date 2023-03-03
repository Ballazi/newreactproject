import React, { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid } from '@mui/material';
import pic from "../../asset/pic.png";
import { styled } from "@mui/material/styles";
import apiUrl from "../../api/api.json";
import Notification from '../../Notification';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import moment from 'moment/moment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

// const theme = createTheme({
//     overrides: {
//         Typography: {
//             root: {
//                 background: 'radial-gradient(circle, #00e676, #009688)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//             },
//         },
//     },
// });

const CustomTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(#f7efd7, #00e676, #009688)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));


const ContentPage = (props) => {
    const data = useLocation();
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("currentUserId");
    const userId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();
    const [blogObject, setBlogObject] = useState({});
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
    const [like, setLike] = useState(false);
    const [unLike, setUnLike] = useState(false);
    const [followData, setFollowData] = useState([]);
    const [followStatusData, setFollowStatusData] = useState([]);
    const [follow, setFollow] = useState(false);



    useEffect(() => {
        blogDetailController();
        followCheckController();
    }, [])


    const blogDetailController = () => {
        setOpen(true);
        axios.get(
            apiUrl.blogDetail + data.state[0].blogId,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    setObj({ type: "success", message: res.data.message });
                    setOpneNotification(true);
                    setBlogObject(...res.data.data);
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

    const likeController = () => {

    }

    const followCheckController = () => {
        setOpen(true);
        axios.post(
            apiUrl.followStatus,
            {
                "user_id": currentUserId,
                "bloger_id": data.state[1].bloggerId
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    if (res.data.data !== null) {
                        setFollow(true);
                    }
                    else if(res.data.data === null)
                    {
                        setFollow(false);
                    }
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


    const followController = (bloggerId) => {
        setOpen(true);
        axios.post(
            apiUrl.follow,
            {
                "user_id": currentUserId,
                "bloger_id": bloggerId
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.message);
                    followCheckController();
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

            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CustomTypography
                            fontSize={"40px"}
                            fontWeight={"800"}
                        >
                            {blogObject.title}
                        </CustomTypography>
                        <CardHeader
                            subheader={moment(blogObject.created_at).format("MMMM D, YYYY")}
                        />
                        <CardMedia
                            component="img"
                            // height="400"
                            image={blogObject.image}
                            alt="Paella dish"
                            sx={{
                                height: "350px",
                                width: '100%',
                                objectFit: "contain"
                            }}
                        />
                        <CardContent>
                            <Typography
                                fontSize={"18px"}
                                fontWeight="500"
                            >
                                {blogObject.description}
                            </Typography>
                        </CardContent>
                        <hr />
                        <CardActions >
                            <IconButton aria-label="add to favorites" title='Like'>
                                {
                                    like ? <ThumbUpAltIcon onClick={() => likeController(props.ele.blog_id)} /> : <ThumbUpOffAltIcon onClick={() => likeController(props.ele.blog_id)} />
                                }
                            </IconButton>
                            {
                                blogObject.likes
                            }
                            <IconButton aria-label="add to favorites" title='Unlike'>
                                {
                                    unLike ? <ThumbDownAltIcon onClick={() => { setUnLike(!unLike) }} /> : <ThumbDownOffAltIcon onClick={() => { setUnLike(!unLike) }} />
                                }
                            </IconButton>
                            {
                                0
                            }
                            {/* <IconButton aria-label="share" edge="end">
                        <ShareIcon />
                    </IconButton> */}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Grid container spacing={4} direction="row">
                        <Grid item>
                            <Avatar
                                alt="Remy Sharp"
                                src={blogObject.bloggerPic === "" || blogObject === null ? pic : blogObject.bloggerPic}
                                sx={{ width: 200, height: 200 }}
                            />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={3} direction="column" justifyContent={"center"}>
                                <Grid item>
                                    <CustomTypography fontSize={"21px"} fontWeight="600" align="left">{blogObject.bloggerName}</CustomTypography>
                                    <CustomTypography align="left">{blogObject.bloggerEmail}</CustomTypography>
                                </Grid>
                                <Grid item>
                                    {
                                        !follow ?
                                            <Button
                                                size='small'
                                                variant='contained'
                                                sx={{ bgcolor: "black" }}
                                                onClick={() => followController(blogObject.bloggerId)}
                                            >
                                                FOLLOW
                                            </Button>
                                            :
                                            <Button
                                                size='small'
                                                variant='contained'
                                                sx={{ bgcolor: "green" }}
                                                onClick={() => followController(blogObject.bloggerId)}
                                            >
                                                FOLLOWING
                                            </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ContentPage