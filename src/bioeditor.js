import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                bio: e.target.value
            },
            () => {
                console.log("this state in change bio", this.state.bio);
            }
        );
    }

    handleSave(e) {
        e.preventDefault();

        //request to the server
        axios.post("/bio", this.state).then(response => {
            console.log("response from bio request", response);
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSave}>
                    <label htmlFor="bio">
                        Tell us about yourself:
                        <textarea name="bio" onChange={this.handleChange} />
                    </label>

                    <button>Save</button>
                </form>
            </div>
        );
    }
}
