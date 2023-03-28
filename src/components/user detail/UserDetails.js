import React, { useState, useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { Button, Grid } from '@mui/material';
import pic from "../../asset/pic.png";
import { styled } from "@mui/material/styles";
import apiUrl from "../../api/api.json";
import Notification from '../../Notification';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { style } from '@mui/system';
import RecipeReviewCard from '../card/Card';


const Wrapper = styled(Grid)(({ theme }) => ({
    width: "70%",
    [theme.breakpoints.down("md")]: {
        width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(#f7efd7, #00e676, #009688)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));


const CustomTypography2 = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(#f7efd7, blue)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));



const UserDetails = () => {
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("currentUserId");
    const userId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
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

    const locationData = useLocation();
    // console.log("location Data...!", locationData);
    const [follow, setFollow] = useState(false);
    const [profileObject, setProfileObject] = useState({})

    useEffect(() => {
        userBlogsController();
        profileController();
        followCheckController();
    }, [])


    const profileController = () => {
        setOpen(true);
        axios.get(
            apiUrl.profile + locationData.state.follower_id,
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
                    setProfileObject(res.data.data);
                    // console.log("profile Data",res.data.data);
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


    const userBlogsController = () => {
        setOpen(true);
        axios.get(
            apiUrl.userBlogs + locationData.state.follower_id,
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
                    setItems(res.data.data);
                    // console.log("data", res.data.data);
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
                "bloger_id": locationData.state.follower_id
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


    const followController = () => {
        setOpen(true);
        axios.post(
            apiUrl.follow,
            {
                "user_id": currentUserId,
                "bloger_id": locationData.state.follower_id
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
                    profileController();
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
            {/* {console.log("profile...!", profileObject)} */}

            <Grid container justifyContent={"center"} alignItems={"center"}>
                <Wrapper item sx={{ width: "70%" }}>
                    <Grid container direction={"row"}>
                        <Grid item xs={12} sm={12} md={6}>
                            <CardMedia
                                component="img"
                                // height="400"
                                image={profileObject.pic === "" || profileObject.pic === null ? pic : profileObject.pic}
                                alt="Paella dish"
                                sx={{
                                    height: "350px",
                                    width: '100%',
                                    objectFit: "contain"
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Grid container spacing={2} sx={{ pt: "20%" }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <CustomTypography variant='h4' fontWeight={"600"}>
                                        {profileObject.name}
                                    </CustomTypography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    {/* <Link to={"/user/followres"} style={{ textDecoration: "none" }}> */}
                                    <CustomTypography2 variant='h6' fontWeight={"600"}>
                                        Followers : {profileObject.follow}
                                    </CustomTypography2>
                                    {/* </Link> */}
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    {/* <NavLink to={"/user/following"} style={{ textDecoration: "none" }}> */}
                                    <CustomTypography2 variant='h6' fontWeight={"600"}>
                                        Following : {profileObject.following}
                                    </CustomTypography2>
                                    {/* </NavLink> */}
                                </Grid>
                                {/* <Grid item xs={12} sm={12} md={12}>
                                    <CustomTypography2 variant='h6' fontWeight={"600"}>
                                        Total Blogs : {profileObject.total_blogs}
                                    </CustomTypography2>
                                </Grid> */}
                                <Grid item xs={12} sm={12} md={12}>
                                    {locationData.state.follower_id !== currentUserId ?
                                        !follow ?
                                            <Button
                                                size='small'
                                                variant='outlined'
                                                sx={{ color: "black" }}
                                                onClick={() => followController()}
                                            >
                                                FOLLOW
                                            </Button>
                                            :
                                            <Button
                                                size='small'
                                                variant='contained'
                                                sx={{ bgcolor: "green" }}
                                                onClick={() => followController()}
                                            >
                                                FOLLOWING
                                            </Button>
                                        : ""
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Wrapper>
            </Grid>
            <Grid sx={{ my: "20px" }}>
                <CustomTypography variant='h6' fontWeight={"600"}>
                    All Blogs Of {locationData.state.followerName}
                </CustomTypography>
            </Grid>
            <Grid container spacing={2}>
                {
                    items.length === 0 && open === false ? "Oops...! There is no any blog" :
                        items.map(ele => {
                            return (
                                <Grid item xs={12} sm={6} md={4}>
                                    <RecipeReviewCard ele={ele} type={ele.blog_type} />
                                </Grid>
                            )
                        })
                }
            </Grid>
        </>
    )
}

export default UserDetails