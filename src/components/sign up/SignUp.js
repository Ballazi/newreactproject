import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Notification from '../../Notification';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import apiUrl from "../../api/api.json";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({
    type: "",
    message: ""
  });
  const [opneNotification, setOpneNotification] = useState(false);
  const navigate = useNavigate();

  const setNotification = () => {
    setOpneNotification(false);
    setObj({ type: "", message: "" });
  }

  const signUpClicked = () => {
    if (name === "" || email === "" || password === "") {
      setObj({ type: "warning", message: "All fields are required...!" });
      setOpneNotification(true);
    }
    else {
      setOpen(true);
      axios.post(
        apiUrl.register,
        {
          name,
          email,
          password,
          pic
        }
      )
        .then(response => {
          if (response.data.success) {
            setObj({ type: "success", message: response.data.message });
            setOpneNotification(true);
            setEmail("");
            setPassword("");
            setName("");
            setTimeout(() => { navigate("/Signin") }, 1000);
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

      <Grid container spacing={2} justifyContent="center" alignItems={"center"}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            size='small'
            variant='outlined'
            label="Profile pic url"
            value={pic}
            onChange={e => setPic(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            size='small'
            variant='outlined'
            label="Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            size='small'
            type={"email"}
            variant='outlined'
            label="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            size='small'
            type={"password"}
            variant='outlined'
            label="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button
            size='small'
            variant='contained'
            sx={{ backgroundColor: "black" }}
            onClick={signUpClicked}
          >
            SIGN UP
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp