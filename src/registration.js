import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Registation extends React.Component {
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
            () => console.log("this.state in handleChange: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("this.state in  handleSubmit: ", this.state);
        axios
            .post("/register", this.state)
            .then(response => {
                if (response.data.id == undefined) {
                    this.setState({
                        error:
                            "Oooops! Something went wrong... Please try again."
                    });
                } else {
                    this.setState({ id: response.data.id });
                    console.log(
                        "this.state after db response: ",
                        this.state.id
                    );
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
                <h2>Please register</h2>

                <h3>{this.state.error}</h3>

                <form onSubmit={this.handleSubmit} className="form-wrap">
                    <label htmlFor="first" />
                    <input
                        type="text"
                        name="first"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="last" />
                    <input
                        type="text"
                        name="last"
                        value={this.state.last}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="email" />
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password" />
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
