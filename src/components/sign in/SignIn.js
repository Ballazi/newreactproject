import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Notification from '../../Notification';
import axios from 'axios';
import apiUrl from "../../api/api.json";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obj, setObj] = useState({
    type: "",
    message: ""
  });
  const [opneNotification, setOpneNotification] = useState(false);

  const setNotification = () => {
    setOpneNotification(false);
    setObj({ type: "", message: "" });
  }

  const signInClicked = () => {
    if (email === "" || password === "") {
      setObj({ type: "warning", message: "All fields are required...!" });
      setOpneNotification(true);
    }
    else {
      setOpen(true);
      axios.post(
        apiUrl.login,
        {
          email,
          password
        }
      )
        .then(res => {
          if (res.data.success) {
            // console.log("datas...!", res.data.data);
            localStorage.setItem("login", true);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("currentUserId", res.data.data.currentUser.id);
            localStorage.setItem("currentUserName",res.data.data.currentUser.name);
            setObj({ type: "success", message: res.data.message });
            setOpneNotification(true);
            setEmail("");
            setPassword("");
            navigate("/");
          }
          else {
            setObj({ type: "warning", message: res.data.message });
            setOpneNotification(true);
          }
        })
        .catch(error => {
          // console.log("catch block", error.response);
          if (error.response.status === 400) {
            setObj({ type: "warning", message: error.response.data.message });
            setOpneNotification(true);
            setTimeout(() => navigate("/Signup"), 1000);
          }
          else {
            setObj({ type: "warning", message: error.response.data.message });
            setOpneNotification(true);
          }
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
            onClick={signInClicked}
          >
            SIGN IN
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUp