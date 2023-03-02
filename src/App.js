import React, { useEffect } from 'react';
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

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  width: "80%",
  marginTop:"2%",
  marginBottom:"5%",
  [theme.breakpoints.down("md")]: {
    marginTop:"4%",
    marginBottom:"9%",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop:"6%",
    marginBottom:"15%",
  },
}));


function App() {
  const path = window.location.pathname;
  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  useEffect(() => {
    if(path === "/" && login === null)
    {
      localStorage.clear();
      navigate("/Signin");
    }
    else if(path === "/" && login === "true")
    {
      navigate("/Travelling");
    }
    else if (path !== "/" && login === null) {
      if(path === "/Signup")
      {
        navigate("/Signup")
      }
      else{
        navigate("/Signin");
      }
    }
  }, [path])
  
  
  return (
    <div className="App">
      <Nav />
      <Grid container justifyContent="center" alignItems={"center"}>
        <Wrapper elevation={3}>
          <Routes>
            <Route exact path='/Travelling' element={<Travelling />} />
            <Route exact path='/Food' element={<Food />} />
            <Route exact path='/Entertainment' element={<Entertainment />} />
            <Route exact path='/Profile' element={<Profile />} />
            <Route exact path='/Signin' element={<SignIn />} />
            <Route exact path='/Signup' element={<SignUp />} />
            <Route exact path="/appBlog" element={<AddBlogs />} />
            <Route exact path="/:type/:title" element={<ContentPage />} />
          </Routes>
        </Wrapper>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
