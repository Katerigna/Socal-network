import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class Registation extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handldeSubmit(e) {
        e.preventDefault();
        axios
            .post("/register", this.state)
            .then(response =>
                console.log("Response from post register: ", response)
            )
            .catch(err => console.log("err on post register: ", err));
    }

    render() {
        return (
            <div>
                <h2>Please register</h2>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="first" />
                    <input name="first" onChange={this.handleChange} />
                    <label htmlFor="last" />
                    <input name="last" onChange={this.handleChange} />
                    <label htmlFor="email" />
                    <input name="email" onChange={this.handleChange} />
                    <label htmlFor="password" />
                    <input name="password" onChange={this.handleChange} />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
