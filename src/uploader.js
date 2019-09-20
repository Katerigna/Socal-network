import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0]
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        //send file to server with formData
        const formData = new FormData();
        formData.append("file", this.state.file);

        axios
            .post("/upload", formData)
            .then(response => {
                this.props.setImage(response.data.url);
            })
            .catch(err => {
                console.log("error on uploading image", err);
            });
    }

    render() {
        return (
            <div className="uploader">
                <form onSubmit={this.handleSubmit} className="uploader-form">
                    <h3>Choose your image:</h3>

                    <label htmlFor="file">Choose</label>

                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={this.handleChange}
                    ></input>

                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
