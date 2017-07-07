import React from 'react';
import { Link } from 'react-router-dom';

export default function Not() {
    const users = null;
    if (!users) {
        return null;
    }
    const notUsers = (
        <div className="users">
            {users.map(user => (
                <div className="user">
                    <img src={user.image} />
                    <div className="buttons">
                        <button>Hot</button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="not">
            {!users.length && <div>Nobody is not hot!</div>}
            {!!users.length && notUsers}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/hot">See who&apos;s hot</Link>
            </nav>
        </div>
    );
}
