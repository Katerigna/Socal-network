import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input name="email" placeholder="email" onChange={ this.handleChange }/>
                    <input type='password' name="password" placeholder="password" onChange={ this.handleChange }/>
                    <button>submit</button>
                </form>
            </div>
        );
    }
}
