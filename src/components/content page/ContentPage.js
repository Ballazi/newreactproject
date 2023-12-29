import React, { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Tooltip } from '@mui/material';
import pic from "../../asset/pic.png";
import { styled } from "@mui/material/styles";
import apiUrl from "../../api/api.json";
import Notification from '../../Notification';
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
import ClearIcon from '@mui/icons-material/Clear';
import parse from 'html-react-parser';
import styles from "./ContentPage.module.css";
import EditIcon from '@mui/icons-material/Edit';
// import ShareIcon from '@mui/icons-material/Share';

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
    background: 'linear-gradient(90deg, #009688, #00e676, #009688)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));


const ContentPage = (props) => {
    const data = useLocation();
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("currentUserId");
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
    const [liked, setLiked] = useState(false);
    const [unLike, setUnLike] = useState(false);
    const [follow, setFollow] = useState(false);



    useEffect(() => {
        blogDetailController();
        followCheckController();
        likeCheckController();
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
                    // setObj({ type: "success", message: res.data.message });
                    // setOpneNotification(true);
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

    const likeCheckController = () => {
        setOpen(true);
        setOpen(true);
        axios.post(
            apiUrl.likeStatus,
            {
                "user_id": currentUserId,
                "blog_id": data.state[0].blogId
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                // console.log("data...!",res.data);
                if (res.data.success) {
                    if (res.data.likedData !== null) {
                        if (res.data.unLikedData === null) {
                            setUnLike(false);
                            setLiked(true);
                        }
                        else {
                            setUnLike(false);
                            setLiked(false);
                        }
                    }
                    else if (res.data.likedData === null) {
                        if (res.data.unLikedData !== null) {
                            setUnLike(true);
                            setLiked(false);
                        }
                        else {
                            setUnLike(false);
                            setLiked(false);
                        }
                    }
                    else if (res.data.unLikedData !== null) {
                        if (res.data.likedData === null) {
                            setLiked(false);
                            setUnLike(true);
                        }
                        else {
                            setUnLike(false);
                            setLiked(false);
                        }
                    }
                    else if (res.data.unLikedData === null) {
                        if (res.data.likedData !== null) {
                            setLiked(true);
                            setUnLike(false);
                        }
                        else {
                            setUnLike(false);
                            setLiked(false);
                        }
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


    const likeController = () => {
        setOpen(true);
        axios.post(
            apiUrl.like,
            {
                "user_id": currentUserId,
                "blog_id": data.state[0].blogId
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    // setObj({ type: "success", message: res.data.message });
                    // setOpneNotification(true);
                    // console.log(res.data.message);
                    likeCheckController();
                    blogDetailController();
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

    const unLikeController = () => {
        setOpen(true);
        axios.post(
            apiUrl.unLike,
            {
                "user_id": currentUserId,
                "blog_id": data.state[0].blogId
            },
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data.message);
                    likeCheckController();
                    blogDetailController();
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
                    else if (res.data.data === null) {
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
                    // console.log(res.data.message);
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

    const deleteController = (deleteBlog) => {
        setOpen(true);
        axios.delete(
            apiUrl.deleteBlog + blogObject.bloggerId + "/" + blogObject.blog_id,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
            .then(res => {
                if (res.data.success) {
                    setObj({ type: "warning", message: res.data.message });
                    setOpneNotification(true);
                    setTimeout(() => { navigate(`/${blogObject.blog_type}`) }, 1000);
                    // navigate(`/${blogObject.blog_type}`);
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

    // const editController = () => {
    //     navigate('/appBlog', {
    //         state: blogObject
    //     });
    // };

    const descriptionString = String(blogObject.description);

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {opneNotification ? <Notification setNotification={setNotification} obj={obj} /> : null}

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
                        <CardContent className={styles.card_content}>
                            {/* <Typography
                                fontSize={"18px"}
                                fontWeight="500"
                            > */}
                            {/* {descriptionString} */}
                            {parse(descriptionString)}
                            {/* </Typography> */}
                        </CardContent>
                        <hr />
                        <CardActions >
                            <Grid container justifyContent="space-between" alignItems={"center"}>
                                <Grid item>
                                    {/* <Grid container spacing={2}> */}
                                    <Tooltip title="Like">
                                        <IconButton aria-label="add to favorites">
                                            {
                                                liked ? <ThumbUpAltIcon sx={{ color: "green" }} onClick={() => likeController()} /> : <ThumbUpOffAltIcon sx={{ color: "green" }} onClick={() => likeController()} />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    {
                                        blogObject.likes
                                    }
                                    <Tooltip title="Dislike">
                                        <IconButton aria-label="add to favorites" >
                                            {
                                                unLike ? <ThumbDownAltIcon sx={{ color: "green" }} onClick={() => unLikeController()} /> : <ThumbDownOffAltIcon sx={{ color: "green" }} onClick={() => unLikeController()} />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    {
                                        blogObject.unlike
                                    }
                                    {/* </Grid> */}
                                </Grid>
                                <Grid item>
                                    {
                                        currentUserId === blogObject.bloggerId ? (
                                            <>
                                                {/* <Tooltip title="Edit blog">
                                                    <IconButton aria-label="settings">
                                                        <EditIcon color="warning" onClick={() => editController()} />
                                                    </IconButton>
                                                </Tooltip> */}
                                                <Tooltip title="Delete blog">
                                                    <IconButton aria-label="settings">
                                                        <ClearIcon color="error" onClick={() => deleteController()} />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )
                                            : null
                                    }
                                </Grid>
                            </Grid>
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
                                        data.state[1].bloggerId !== currentUserId ?
                                            !follow ?
                                                <Button
                                                    size='small'
                                                    variant='outlined'
                                                    sx={{ color: "black" }}
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
                                                </Button> : null
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