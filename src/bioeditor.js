import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.editBio = this.editBio.bind(this);
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
        axios
            .post("/bio", this.state)
            .then(response => {
                console.log("response from bio request", response.data.bio);
                this.props.setBio(response.data.bio);
                this.setState({
                    isEditing: false
                });
            })
            .catch(err => console.log("error on getting bio", err));
    }

    editBio(e) {
        e.preventDefault();
        this.setState({
            isEditing: true
        });
    }

    render() {
        return (
            <div>
                {this.props.bio ? (
                    <div>
                        <h3>About me:</h3>
                        <p>{this.props.bio}</p>
                        <button onClick={this.editBio}>Edit</button>
                    </div>
                ) : (
                    <button onClick={this.editBio}>Add bio</button>
                )}

                {this.state.isEditing && (
                    <form onSubmit={this.handleSave}>
                        <label htmlFor="bio">
                            Tell us about yourself:
                            <textarea name="bio" onChange={this.handleChange} />
                        </label>

                        <button>Save</button>
                    </form>
                )}
            </div>
        );
    }
}
