import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversactions } from '../store/reducer/conversactionReducer';
import ConversactionItem from './ConversactionItem';

function Conversaction({ setConversaction }) {
    const user = useSelector((state) => state.userReducer.user);
    const conversactionList = useSelector(
        (state) => state.conversactionReducer.conversactions
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getConversactions(user._id));
    }, []);
    return (
        <div>
            <h3>Conversaction</h3>
            {conversactionList.map((conversaction) => (
                <div
                    key={conversaction._id}
                    className="onlineUser"
                    onClick={() => setConversaction(conversaction)}
                    style={{ cursor: 'pointer' }}
                >
                    <ConversactionItem members={conversaction.members} />
                </div>
            ))}
        </div>
    );
}

export default Conversaction;
