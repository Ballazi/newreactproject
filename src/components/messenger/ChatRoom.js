import { TextField, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ApiUrl from "../../api/api.json"
import Chat from './Chat';

const socket = io(ApiUrl.service);

const ChatRoom = () => {
    const [userName, setUserName] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        socket.on("join_response", (data) => {
            if (data) {
                setShowChat(true);
            }
        })
    }, [])


    const joinRoom = () => {
        if (userName !== "" || room !== "") {
            socket.emit("join_room", room);
        }
    }


    return (
        <>
            {!showChat ? (
                <Grid container spacing={2} sx={{ width: "30%", margin: "8% auto" }}>
                    <Grid item xs={12} sm={12} md={12}><h3>Join a chat</h3></Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            variant='outlined'
                            label="join..."
                            size='small'
                            fullWidth
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            variant='outlined'
                            label="Room Id"
                            size='small'
                            fullWidth
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={() => joinRoom()}
                        >
                            Join A Room
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Chat socket={socket} userName={userName} room={room} />
            )}
        </>
    )
}

export default ChatRoom