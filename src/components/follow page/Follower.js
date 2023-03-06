import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment/moment';
import { NavLink } from "react-router-dom";
import IconButton from '@mui/material/IconButton';


export default function Follower(props) {
    const [userObject, setUserObject] = useState({});


    return (
        <>
            <NavLink to={"/user/details"} state={props.ele} style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: "100%", height: "260px" }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={props.ele.followerPic}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        {props.ele.followerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        Total Blogs : {props.ele.followerTotlaBlogs}
                    </Typography>
                </CardContent>
                {/* <CardActions >
                    <IconButton aria-label="add to favorites" title='Like'>
                        Following : 
                    </IconButton>
                    {
                        userObject.following
                    }
                    <IconButton aria-label="add to favorites" title='Unlike'>
                        Follow :
                    </IconButton>
                    {
                        userObject.follow
                    }
                    <IconButton aria-label="share" edge="end">
                        <ShareIcon />
                    </IconButton>
                </CardActions> */}
            </Card>
            </NavLink>
        </>
    );
}