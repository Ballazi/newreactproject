import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from '../../Notification';
import apiUrl from "../../api/api.json";
import axios from 'axios';
import { Grid } from '@mui/material';
import Follower from './Follower';


const Followings = () => {
    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('currentUserId');
    const [open, setOpen] = useState(false);
    const [obj, setObj] = useState({
        type: "",
        message: ""
    });
    const [opneNotification, setOpneNotification] = useState(false);
    const [followingList, setFollowingList] = useState([]);

    const setNotification = () => {
        setOpneNotification(false);
        setObj({ type: "", message: "" });
    }

    useEffect(() => {
        getAllBlogs();
    }, [])

    const getAllBlogs = () => {
        setOpen(true);
        axios.get(
            apiUrl.allFollowings + currentUserId,
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(response => {
                if (response.data.success) {
                    setObj({ type: "success", message: response.data.message });
                    setOpneNotification(true);
                    setFollowingList(response.data.data);
                }
                else {
                    setObj({ type: "warning", message: response.data.message });
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

            {
                <Grid container spacing={2}>
                    {
                        followingList.length === 0 && open === false ? "Oops...! There is no any Following List" :
                            followingList.map(ele => {
                                return (
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Follower ele={ele} />
                                    </Grid>
                                )
                            })
                    }
                </Grid>
            }
        </>
    )
}

export default Followings