import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import moment from 'moment';
import { styled } from "@mui/material/styles";
import styles from './ChatUI.module.css';


const Wrapper = styled(Grid)(({ theme }) => ({
    width: "30%",
    margin: '8% auto',
    backgroundColor: '#fff',
    [theme.breakpoints.down("md")]: {
        width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
        margin: 0,
    },
}));




const Chat = ({ socket, room }) => {
    const [messageData, setMessageData] = useState('');
    const [messageList, setMessageList] = useState([]);
    const currentUserId = localStorage.getItem('currentUserId');
    const currentUserName = localStorage.getItem("currentUserName");
    const chatHistoryRef = useRef(null);


    useEffect(() => {
        const chatBox = chatHistoryRef.current;
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [messageList]);


    useEffect(() => {
        socket.on('message_recive', (data) => {
            setMessageList((currentList) => [...currentList, data]);
        });
        return () => {
            socket.off('message_recive');
        };
    }, [socket]);

    const messageHandler = (e) => {
        e.preventDefault();
        if (messageData.trim() !== '') {
            const obj = {
                room,
                currentUserId,
                currentUserName,
                message: messageData,
                time: moment(new Date()).format('h:mm A'),
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
            <div className={styles.chatUI}>
                <div className={styles.chatHistory} ref={chatHistoryRef}>
                    {messageList.length !== 0 ? (
                        messageList.map((ele, ind) => {
                            return (
                                <div className={ele.currentUserId === currentUserId ? styles.messageMe : styles.messageOther} key={ind}>
                                    {
                                        ele.currentUserId === currentUserId ? "" :
                                            <div className={styles.sender}>{ele.currentUserName}</div>
                                    }
                                    <div className={ele.currentUserId === currentUserId ? styles.messageContentMe : styles.messageContentOther}>{ele.message}</div>
                                    <div className={styles.time_stamp}>{ele.time}</div>
                                </div>
                            );
                        })
                    ) : (
                        <Typography variant="h6">Start Conversation 😎</Typography>
                    )}

                </div>
                <form className={styles.chatForm} onSubmit={messageHandler}>
                    <input
                        className={styles.chatInput}
                        type="text"
                        placeholder="Type a message..."
                        value={messageData}
                        onChange={e => setMessageData(e.target.value)}
                    />
                    <button className={styles.chatButton} type="submit">
                        Send
                    </button>
                </form>
            </div>
        </Wrapper>
    );
};

export default Chat;