import { Grid } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    const isLoggedIn = localStorage.getItem("login");
    return (
        <>
            <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} sx={{p:"10px",backgroundColor:"black",color:"white", fontWeight:"400"}}>
                <Grid item >
                    <NavLink to={"/Travelling"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>Travelling</NavLink>
                </Grid>
                <Grid item >
                    <NavLink to={"/Food"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>Food</NavLink>
                </Grid>
                <Grid item >
                    <NavLink to={"/Entertainment"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>Entertainment</NavLink>
                </Grid>
                <Grid item >
                    <NavLink to={"/AddBlog"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}></NavLink>
                </Grid>
                {
                    isLoggedIn !== "true" ?
                    <Grid item >
                    <NavLink to={"/Signup"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>SIGNUP</NavLink>
                    </Grid>
                    : ""
                }
                <Grid item >
                    {
                        isLoggedIn === "true" ?
                            <NavLink to={"/Profile"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>Profile</NavLink>
                            :
                            <NavLink to={"/Signin"} style={({ isActive }) => { return { color: isActive ? "blue" : "white", textDecoration: "none" } }}>SIGNIN</NavLink>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Nav