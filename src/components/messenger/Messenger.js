import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ApiUrl from "../../api/api.json"

const socket = io(ApiUrl.service);

const Messenger = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            console.log("message...!", msg);
        });
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        socket.emit('message', inputValue);
        setInputValue('');
    };

    return (
        <div>
            <h1>Socket.io Chat App</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleFormSubmit}>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Messenger