import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Notification from '../../Notification';
import apiUrl from "../../api/api.json";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AddBlogs = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem("currentUserId");
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

  const addBlogsController = () => {
    setOpen(true);
    axios.post(
      apiUrl.addBlog,
      {
        "blog_type" : type,
        "title" : title,
        "description" : description,
        "user_id" : currentUserId,
        "image" : image
      },
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
          setTitle("");
          setType("");
          setDescription("");
          setImage("");
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

      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item sx={{ width: "40%" }}>
          <Grid sx={{ my: "2%" }}>
            <FormControl fullWidth size='small'>
              <InputLabel id="demo-simple-select-label">Type *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='small'
                value={type}
                label="Type *"
                onChange={e => setType(e.target.value)}
              >
                <MenuItem value={"Travelling"}>Travelling</MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid sx={{ my: "2%" }}>
            <TextField
              size='small'
              required
              fullWidth
              variant='outlined'
              label='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Grid>
          <Grid sx={{ my: "2%" }}>
            <TextField
              size='small'
              required
              fullWidth
              variant='outlined'
              label='Image'
              value={image}
              onChange={e => setImage(e.target.value)}
            />
          </Grid>
          <Grid sx={{ my: "2%" }}>
            <TextField
              size='small'
              required
              fullWidth
              variant='outlined'
              label='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid sx={{ my: "2%" }}>
            <Button
              size='small'
              variant='contained'
              color='success'
              sx={{ bgcolor: "black" }}
              onClick={addBlogsController}
            >
              ADD
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AddBlogs