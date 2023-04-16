import React, { useState, useEffect } from 'react';
import { Grid, Button, TextField } from '@mui/material';
// import io from 'socket.io-client';
// import moment from 'moment';
// import ApiUrl from "../../api/api.json"
import Chat from './Chat';

const ChatRoom = ({socket}) => {
    const [room, setRoom] = useState("12345");
    const [showChat, setShowChat] = useState(false);
    // const [socket, setSocket] = useState(null);
    const currentUserId = localStorage.getItem("currentUserId");
    const [previousChat, setPreviousChat] = useState([]);

    // useEffect(() => {
    //     const socketInstance = io(ApiUrl.service);
    //     socketInstance.on("connect", () => {
    //         console.log("user connected: ",socketInstance.id);
    //     })
    //     setSocket(socketInstance);
    //     return () => {
    //         socketInstance.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        if (socket) {
            socket.on("join_response", (data, previousChatData, message) => {
                // console.log("data", data);
                if (data) {
                    setShowChat(true);
                    setPreviousChat(previousChatData);
                    console.log(message);
                }
                else{
                    console.log(message);
                }
            });
        }
    }, [socket]);

    useEffect(() => {
        joinRoom();
    }, [])
    

    const joinRoom = () => {
        if (room !== "") {
            const joiningData = {
                currentUserId,
                room
            };
            socket.emit("join_room", joiningData);
        }
    };

    return (
        <>
            {!showChat ? (
                <Grid container spacing={2} sx={{ width: "30%", margin: "8% auto" }}>
                    <Grid item xs={12} sm={12} md={12}><h3>Join a chat</h3></Grid>
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
                <Chat socket={socket} room={room} previousChat={previousChat} />
            )}
        </>
    )
}

export default ChatRoom;