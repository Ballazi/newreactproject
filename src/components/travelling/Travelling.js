import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Notification from '../../Notification';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import apiUrl from "../../api/api.json";
import RecipeReviewCard from "../card/Card";
import { Grid } from '@mui/material';

const Travelling = () => {
    const [value, setValue] = useState(null);
    const [options, setOptions] = useState([]);
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [obj, setObj] = useState({
        type: "",
        message: ""
    });
    const [opneNotification, setOpneNotification] = useState(false);
    const [items, setItems] = useState([]);

    const setNotification = () => {
        setOpneNotification(false);
        setObj({ type: "", message: "" });
    }

    useEffect(() => {
        getAllBlogs();
        getAllOptionsData();
    }, [])

    const getAllBlogs = () => {
        setOpen(true);
        axios.get(
            apiUrl.getCategoryBlogs + "Travelling",
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(response => {
                setOptions([]);
                if (response.data.success) {
                    setObj({ type: "success", message: response.data.message });
                    setOpneNotification(true);
                    setItems(response.data.data);
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

    const getAllOptionsData = () => {
        setOpen(true);
        axios.get(
            apiUrl.categoryBlogsSearch + "Travelling",
            {
                headers: {
                    Authorization: token
                }
            }
        )
            .then(response => {
                setOptions([]);
                if (response.data.success) {
                    setObj({ type: "success", message: response.data.message });
                    setOpneNotification(true);
                    (response.data.data).map(ele => setOptions(currentItem => [...currentItem, ele.title]));
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
                        items.length === 0 ? "Oops...! There is no any blogs in Travelling category" :
                        items.map(ele => {
                            return (
                                <Grid item xs={12} sm={6} md={4}>
                                    <RecipeReviewCard ele = {ele} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            }


            {/* <RecipeReviewCard /> */}
            {/* <Autocomplete
                freeSolo
                options={options}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search"
                        variant="outlined"
                        size='small'
                    />
                )}
            /> */}

        </>
    )
}

export default Travelling