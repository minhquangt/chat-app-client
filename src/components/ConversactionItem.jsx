import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../api/axiosClient';

function ConversactionItem({ members }) {
    const [userGuest, setUserGuest] = useState({});
    const user = useSelector((state) => state.userReducer.user);
    useEffect(() => {
        const getUser = async () => {
            const userGuestId = members.find((m) => m !== user._id);
            const response = await axiosClient.get(`/user/info/${userGuestId}`);
            setUserGuest(response.data);
        };
        getUser();
    }, []);
    return (
        <div className='infoOnlineUser'>
            <div className='profilePicContainer'>
                <img
                    src={userGuest.profilePic}
                    alt='pic'
                    className='profilePic'
                />
            </div>
            <span>{userGuest.username}</span>
        </div>
    );
}

export default ConversactionItem;
