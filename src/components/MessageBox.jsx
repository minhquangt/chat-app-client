import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createMessage,
    getMessages,
    setMessages,
} from '../store/reducer/messageReducer';
import { io } from 'socket.io-client';

function MessageBox({ conversaction, setOnlineUserList }) {
    const user = useSelector((state) => state.userReducer.user);
    const messageList = useSelector((state) => state.messageReducer.messages);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const socket = useRef();
    const [messagesSocket, setMessagesSocket] = useState([]);
    useEffect(() => {
        const getMessageList = async () => {
            try {
                setLoading(true);
                await dispatch(getMessages(conversaction._id));
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        getMessageList();
    }, [conversaction._id]);

    useEffect(() => {
        socket.current = io('http://localhost:5001');
        socket.current.on('getMessage', (data) => {
            setMessagesSocket(data);
        });
    }, []);

    useEffect(() => {
        messagesSocket &&
            conversaction.members.includes(messagesSocket.senderId) &&
            dispatch(setMessages(messagesSocket));
    }, [messagesSocket, conversaction]);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users) => {
            setOnlineUserList(users);
        });
    }, [user]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        dispatch(
            createMessage({
                conversactionId: conversaction._id,
                sender: user._id,
                text,
            })
        );
        const receiverId = conversaction.members.find(
            (member) => member !== user._id
        );
        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text,
        });

        setText('');
    };
    return (
        <div className='message-box'>
            <h3 className='text-center'>MessageBox</h3>
            <div className='message-list'>
                {loading && (
                    <div
                        className='spinner-border text-primary'
                        role='status'
                    ></div>
                )}
                {!loading &&
                    messageList.map((message, index) => (
                        <div
                            className={`${
                                user._id === message.sender ? 'rightDiv' : ''
                            }`}
                            key={index}
                        >
                            <div
                                className={`message ${
                                    user._id === message.sender ? 'own' : ''
                                }`}
                            >
                                <span>{message.text}</span>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='inputMessageContainer'>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='inputMessage'
                        cols='30'
                        rows='5'
                    ></textarea>
                    <div className='d-grid'>
                        <button type='submit' className='btn btn-success'>
                            SEND
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MessageBox;
