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
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(e) {
        this.setState({
            bio: e.target.value
        });
    }

    handleSave(e) {
        e.preventDefault();

        //request to the server
        axios
            .post("/bio", this.state)
            .then(response => {
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

    handleClose(e) {
        e.preventDefault();
        this.setState({
            isEditing: false
        });
    }

    render() {
        return (
            <div>
                {this.props.bio ? (
                    <div className="bioeditor">
                        <h2>About me:</h2>
                        <p>{this.props.bio}</p>
                        <button onClick={this.editBio}>Change bio</button>
                    </div>
                ) : (
                    <button onClick={this.editBio}>Add bio</button>
                )}

                {this.state.isEditing && (
                    <form onSubmit={this.handleSave} className="bioeditor">
                        <button onClick={this.handleClose}>Close</button>
                        <label htmlFor="bio">
                            <textarea name="bio" onChange={this.handleChange} />
                        </label>

                        <button>Save</button>
                    </form>
                )}
            </div>
        );
    }
}
