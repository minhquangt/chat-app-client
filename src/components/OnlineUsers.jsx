import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../api/axiosClient';
import { createConversaction } from '../store/reducer/conversactionReducer';

function OnlineUsers({ onlineUserList }) {
    const [listFriend, setListFriend] = useState([]);
    const user = useSelector((state) => state.userReducer.user);
    const conversactionList = useSelector(
        (state) => state.conversactionReducer.conversactions
    );
    const dispatch = useDispatch();
    useEffect(() => {
        const getFriend = async () => {
            const response = await axiosClient.get(`/user/${user._id}`);
            setListFriend(response.data);
        };
        getFriend();
    }, []);
    const handleAddConversaction = async (receiverId) => {
        try {
            dispatch(
                createConversaction({
                    senderId: user._id,
                    receiverId: receiverId,
                })
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h3>Online Users</h3>
            {listFriend.map((user) => (
                <div key={user._id} className='onlineUser'>
                    <div className='infoOnlineUser'>
                        <div className='profilePicContainer'>
                            {onlineUserList.find(
                                (o) => o.userId === user._id
                            ) && <span className='activeUser'></span>}
                            <img
                                src={user.profilePic}
                                alt='pic'
                                className='profilePic'
                            />
                        </div>
                        <span>{user.username}</span>
                    </div>
                    {!conversactionList.find((c) =>
                        c.members.includes(user._id)
                    ) && (
                        <button
                            className='btn btn-primary'
                            onClick={() => handleAddConversaction(user._id)}
                        >
                            Add conversaction
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default OnlineUsers;
