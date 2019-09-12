import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { receiveUsers, makeNot } from './actions';


export default function Hot() {
    const dispatch = useDispatch();
    const users = useSelector(
        state => state.users && state.users.filter(
            user => user.hot
        )
    );

    useEffect(
        () => {
            users || dispatch(
                receiveUsers()
            );
        },
        []
    );

    if (!users) {
        return null;
    }
    const hotUsers = (
        <div className="users">
            {users.map(user => (
                <div className="user">
                    <img src={user.image} />
                    <div className="buttons">
                        <button onClick={
                            e => {
                                dispatch(
                                    makeNot(user.id)
                                )
                            }
                        }>Not</button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="hot">
            {!users.length && <div>Nobody is hot!</div>}
            {!!users.length && hotUsers}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/not">See who&apos;s not</Link>
            </nav>
        </div>
    );
}
