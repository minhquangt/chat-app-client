import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Conversaction from '../components/Conversaction';
import MessageBox from '../components/MessageBox';
import OnlineUsers from '../components/OnlineUsers';
import { logoutUser } from '../store/reducer/userReducer';

function Chat() {
    const [conversaction, setConversaction] = useState(null);
    const [onlineUserList, setOnlineUserList] = useState([]);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };
    return (
        <div className='container chat'>
            <div className='d-grid'>
                <button className='btn btn-danger' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className='row'>
                <div className='col-2'>
                    <Conversaction setConversaction={setConversaction} />
                </div>
                <div className='col-7' style={{ height: '100vh' }}>
                    {conversaction ? (
                        <MessageBox
                            conversaction={conversaction}
                            setOnlineUserList={setOnlineUserList}
                        />
                    ) : (
                        <h3 className='text-center'>
                            No Conversaction. Please select conversaction
                        </h3>
                    )}
                </div>
                <div className='col-3'>
                    <OnlineUsers onlineUserList={onlineUserList} />
                </div>
            </div>
        </div>
    );
}

export default Chat;
