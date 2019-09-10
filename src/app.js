import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            imageurl: "",
            id: "",
            bio: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);

        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    componentDidMount() {
        //axios request to server to find user based on req.session.userId
        axios
            .get("/user")
            .then(response => {
                //add it to state using setState
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    imageurl: response.data.url,
                    id: response.data.id,
                    bio: response.data.bio
                });
            })
            .catch(err => {
                console.log("error on get user", err);
            });
    }

    toggleModal() {
        if (this.state.uploaderIsVisible == true) {
            this.setState({
                uploaderIsVisible: false
            });
        } else {
            this.setState({
                uploaderIsVisible: true
            });
        }
    }

    setImage(profilepic) {
        this.setState({
            imageurl: profilepic,
            uploaderIsVisible: false
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio
        });
    }

    render() {
        return (
            <React.Fragment>
                <img className="logo" width="100" height="100" src="logo.png" />
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageurl={this.state.imageurl}
                    toggleModal={this.toggleModal}
                />
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageurl={this.state.imageurl}
                    toggleModal={this.toggleModal}
                    bio={this.state.bio}
                    setBio={this.setBio}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </React.Fragment>
        );
    }
}
