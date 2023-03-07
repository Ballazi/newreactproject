import React from 'react';
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



export default function RecipeReviewCard(props) {

    return (
        <>
            <NavLink to={`/${props.type}/${props.ele.title}`} state={[{ blogId: props.ele.blog_id }, { bloggerId: props.ele.bloggerId }]} style={{ textDecoration: "none" }}>
                <Card sx={{
                    maxWidth: "100%",
                    height: "350px",
                    transition: "200ms",
                    '&:hover': {
                        transform: "Scale(1.01)"
                    },
                }}
                >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {props.ele.bloggerName.charAt(0)}
                            </Avatar>
                        }
                        title={props.ele.bloggerName}
                        subheader={moment(props.ele.created_at).format("MMMM D, YYYY")}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={props.ele.image}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            {props.ele.title}
                        </Typography>
                    </CardContent>
                    <CardActions >
                    </CardActions>
                </Card>
            </NavLink>
        </>
    );
}