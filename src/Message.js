import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import "./Message.css"

function Message({ message, username }) {
    const isUser = username === message.username
    return (
        <div className={(window.innerWidth >=500) ? `message ${isUser && 'message__user'}` : `messageM ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                        color="initial"
                        variant="h6"
                        component="h2" 
                    >
                        {!isUser && `${message.username || 'Unknown User'}:`} {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message
