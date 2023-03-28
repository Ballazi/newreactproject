import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import moment from 'moment';
import { styled } from "@mui/material/styles";


const Wrapper = styled(Grid)(({ theme }) => ({
    width: "30%",
    margin: '8% auto',
    backgroundColor: '#fff',
    [theme.breakpoints.down("md")]: {
        width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));




const Chat = ({ socket, room }) => {
    const [messageData, setMessageData] = useState('');
    const [messageList, setMessageList] = useState([]);
    const currentUserId = localStorage.getItem('currentUserId');

    useEffect(() => {
        const chatBox = document.querySelector(".chat-box");
        chatBox.scrollBy(0,chatBox.scrollHeight);
    }, [messageList])
    

    useEffect(() => {
        socket.on('message_recive', (data) => {
            setMessageList((currentList) => [...currentList, data]);
        });
        return () => {
            socket.off('message_recive');
        };
    }, [socket]);

    const messageHandler = () => {
        if (messageData.trim() !== '') {
            const obj = {
                room,
                currentUserId,
                message: messageData,
                time: moment(new Date()).format('HH:MM'),
            };
            setMessageList((currentList) => [...currentList, obj]);
            socket.emit('message_sent', obj);
            setMessageData('');
        }
    };

    return (
        <Wrapper container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography>Live chat</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={{height: "300px", overflowY: 'scroll', '&::-webkit-scrollbar': { width: '0px'}}} className="chat-box">
                {messageList.length !== 0 ? (
                    messageList.map((ele, ind) => {
                        return (
                            <Typography variant="h5" key={ind}>
                                {ele.message}
                            </Typography>
                        );
                    })
                ) : (
                    <Typography variant="h6">Start Conversation 😎</Typography>
                )}
            </Grid>
            <Grid item>
                <Grid container direction={'row'}>
                    <Grid item>
                        <TextField
                            placeholder="Hey..."
                            size="small"
                            fullWidth
                            value={messageData}
                            onChange={(e) => setMessageData(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    messageHandler();
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="medium" onClick={() => messageHandler()}>
                            &#9658;
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default Chat;