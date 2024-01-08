import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const ChatBox = ({ messages, onSendMessage }) => {

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            onSendMessage({
                id: uuidv4(),
                text: inputMessage,
                timestamp: new Date().toLocaleTimeString(),
            });
            setInputMessage('');
        }
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll' }}>
                {messages.map((message) => (
                    <div key={message.id}>
                        {`${message.timestamp} - ${message.text}`}
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
