import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import moment from 'moment';

const Chat = ({ socket, userName, room }) => {
    const [messageData, setMessageData] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on("message_recive", data => {
            setMessageList(currentList => [...currentList, data]);
        })
    }, [])


    const messageHandler = () => {
        if (messageData !== null) {
            const obj = {
                room: room,
                author: userName,
                message: messageData,
                time: moment(new Date()).format("HH:MM")
            }
            socket.emit("message_sent", obj);
        }
    }



    return (
        <Grid container spacing={2} sx={{ width: "30%", margin: "8% auto" }}>
            <Grid item xs={12} sm={12} md={12}><Typography>Live chat</Typography></Grid>
            <Grid item xs={12} sm={12} md={12}>
                {
                    messageList.length !== 0 ?
                        messageList.map(ele => {
                            return (
                                <Typography variant='h5'>{ele.message}</Typography>
                            )
                        })
                        : ""
                }
            </Grid>
            <Grid item>
                <Grid container direction={"row"}>
                    <Grid item>
                        <TextField
                            placeholder='Hey...'
                            size='small'
                            fullWidth
                            value={messageData}
                            onChange={e => setMessageData(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant='contained'
                            size='medium'
                            onClick={() => messageHandler()}
                        >
                            &#9658;
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Chat