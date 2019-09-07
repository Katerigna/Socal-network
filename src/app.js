import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            imageurl: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");

        //axios request to server to find user based on req.session.userId
        axios
            .get("/user")
            .then(response => {
                console.log("response from userdata", response);
                //add it to state using setState
                this.setState({
                    first: response.data.first,
                    last: response.data.last,
                    imageurl: response.data.url,
                    id: response.data.id,
                    bio: response.data.bio
                });
                console.log("this.state", this.state);
            })
            .catch(err => {
                console.log("error on get user", err);
            });
    }

    showModal() {
        this.setState({
            uploaderIsVisible: true
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
                    showModal={this.state.showModal}
                />
                <Profile
                    first={this.state.first}
                    url={this.state.image}
                    last={this.state.last}
                    showModal={() => {
                        this.setState({ uploaderIsVisible: true });
                    }}
                    bio={this.state.bio}
                    setBio={bio => {}}
                />
                //this is the conditional rendering: is left hand side is true,
                //it will show right hand side as well
                {this.state.uploaderIsVisible && <Uploader />}
            </React.Fragment>
        );
    }
}
