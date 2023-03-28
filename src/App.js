import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Nav from "./Nav";
import Food from "./components/food/Food";
import Travelling from './components/travelling/Travelling';
import Entertainment from "./components/entertainment/Entertainment";
import Profile from "./components/profile/Profile";
import SignIn from "./components/sign in/SignIn";
import SignUp from "./components/sign up/SignUp";
import Footer from './Footer';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from "@mui/material/styles";
import AddBlogs from './components/add blogs/AddBlogs';
import ContentPage from './components/content page/ContentPage';
import Followers from './components/follow page/Followers';
import Followings from './components/follow page/Followings';
import UserDetails from './components/user detail/UserDetails';
import Messenger from './components/messenger/Messenger';
import ChatRoom from './components/messenger/ChatRoom';
import ApiUrl from "./api/api.json";
import io from 'socket.io-client';

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  width: "80%",
  marginTop: "2%",
  marginBottom: "5%",
  backgroundColor: "rgb(249, 249, 249)",
  [theme.breakpoints.down("md")]: {
    marginTop: "4%",
    marginBottom: "9%",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "6%",
    marginBottom: "15%",
  },
}));


function App() {
  const path = window.location.pathname;
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(ApiUrl.service);
    socketInstance.on("connect", () => {
      console.log("user connected: ", socketInstance.id);
    })
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (path === "/" && login === null) {
      localStorage.clear();
      navigate("/Signin");
    }
    else if (path === "/" && login === "true") {
      navigate("/Travelling");
    }
    else if (path !== "/" && login === null) {
      if (path === "/Signup") {
        navigate("/Signup")
      }
      else {
        navigate("/Signin");
      }
    }
  }, [path])


  return (
    <div className="App">
      <Nav />
      <Grid container justifyContent="center" alignItems={"center"}>
        <Wrapper elevation={0}>
          <Routes>
            <Route exact path='/Travelling' element={<Travelling />} />
            <Route exact path='/Food' element={<Food />} />
            <Route exact path='/Entertainment' element={<Entertainment />} />
            <Route exact path='/Profile' element={<Profile />} />
            <Route exact path='/Profile/details' element={<UserDetails />} />
            <Route exact path='/Signin' element={<SignIn />} />
            <Route exact path='/Signup' element={<SignUp />} />
            <Route exact path="/appBlog" element={<AddBlogs />} />
            <Route exact path="/:type/:title" element={<ContentPage />} />
            <Route exact path="/user/followres" element={<Followers />} />
            <Route exact path="/user/following" element={<Followings />} />
            <Route exact path="/user/details" element={<UserDetails />} />
            {/* <Route exact path="/messenger" element={<Messenger />} /> */}
            <Route exact path="/messenger" element={<ChatRoom socket={socket} />} />
          </Routes>
        </Wrapper>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
