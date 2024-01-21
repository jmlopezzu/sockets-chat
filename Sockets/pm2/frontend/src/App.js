import React, { useState, useEffect } from 'react';
    import io from 'socket.io-client';

    const socket = io('http://localhost:5000'); // Adjust the URL based on your backend deployment

    function App() {
        const [message, setMessage] = useState('');
        const [receivedMessage, setReceivedMessage] = useState('');

        useEffect(() => {
            socket.on('message', (data) => {
                setReceivedMessage(data);
            });

            return () => {
                socket.disconnect();
            };
        }, []);

        const sendMessage = () => {
            socket.emit('message', message);
            setMessage('');
        };

        return (
            <div>
                <h1>WebSocket Example</h1>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
                <p>Received Message: {receivedMessage}</p>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"></link>
            </div>
        );
    }

    export default App;