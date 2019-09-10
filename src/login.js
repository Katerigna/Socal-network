import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state in handleChange Login: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("this.state in  handleSubmit Login: ", this.state);
        axios
            .post("/login", this.state)
            .then(response => {
                console.log("Response from post Login: ", response);
                if (!response.data) {
                    this.setState({
                        error:
                            "Oooops! Something went wrong... Please try again."
                    });
                    console.log("this.state in submit error: ", this.state);
                } else {
                    this.setState({ id: response.data.id });
                    console.log("cookie to give", response.data);
                    location.replace(`/app`);
                }
            })
            .catch(err => {
                console.log("err on post register: ", err);
            });
    }

    render() {
        return (
            <div>
                <h2>Please enter your email and password</h2>

                <h3>{this.state.error}</h3>

                <form onSubmit={this.handleSubmit} className="form-wrap">
                    <label htmlFor="email" />
                    <input
                        type="email"
                        name="email"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password" />
                    <input
                        type="password"
                        name="password"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
