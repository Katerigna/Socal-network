import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveUsers } from './actions';

export default function HotOrNot() {
    const dispatch = useDispatch();
    const users = useSelector(
        state => state.users && state.users.filter(
            user => user.hot == null
        )
    );

    useEffect(
        () => {
            dispatch(
                receiveUsers()
            );
        },
        []
    );

    if (!users) {
        return null;
    }

    return (
        <div id="hot-or-not">
            <div className="user">
                <img src={users[0].image} />
                <div className="buttons">
                    <button>Hot</button>
                    <button>Not</button>
                </div>
            </div>
            <nav>
                <Link to="/hot">See who&apos;s hot</Link>
                <Link to="/not">See who&apos;s not</Link>
            </nav>
        </div>
    );
}
