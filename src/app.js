import React from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Summer",
            last: "Lover",
            imageurl: "",
            uploaderIsVisible: false
        };
        this.showModal = this.showModal.bind(this);
    }

    componentDidMount() {
        console.log("App mounted");
        //axios request to server to find user based on req.session.userId
        //add it to state using setState
    }

    showModal() {
        this.setState({
            uploaderIsVisible: true
        });
    }

    render() {
        return (
            <React.Fragment>
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
