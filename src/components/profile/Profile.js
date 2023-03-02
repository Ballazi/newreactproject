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


const Wrapper = styled(Grid)(({ theme }) => ({
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));



const Profile = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("currentUserId");
  const navigate = useNavigate();
  const [profileObject, setProfileObject] = useState({});
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

  useEffect(() => {
    profileController();
  }, [])


  const profileController = (id) => {
    setOpen(true);
    axios.get(
      apiUrl.profile + userId,
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

  const logOutController = () => {
    localStorage.clear();
    navigate("/Signin");
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
      {console.log("profile...!", profileObject)}

      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Wrapper item sx={{ width: "70%" }}>
          <Grid container direction={"row"}>
            <Grid item xs={12} sm={12} md={6}>
              <CardMedia
                component="img"
                // height="400"
                image={profileObject.pic === "" || profileObject === null ? pic : profileObject.pic}
                alt="Paella dish"
                sx={{
                  height: "450px",
                  width: '100%'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container spacing={2} sx={{ pt: "20%" }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h4' fontWeight={"600"}>
                    {profileObject.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h6' fontWeight={"600"} color="blue">
                    Followers : {profileObject.follow}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h6' fontWeight={"600"} color="blue">
                    Following : {profileObject.following}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant='h6' fontWeight={"600"} color="blue">
                    Total Blogs : {profileObject.total_blogs}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    size='small'
                    variant="contained"
                    sx={{ bgcolor: "black" }}
                    onClick={logOutController}
                  >
                    SIGN OUT
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Wrapper>
      </Grid>
    </>
  )
}

export default Profile