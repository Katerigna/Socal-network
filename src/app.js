import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";

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

                <BrowserRouter>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageurl={this.state.imageurl}
                        toggleModal={this.toggleModal}
                    />

                    <Link to="/users">Find People</Link>
                    <Route path="/users" component={FindPeople} />

                    <Route
                        exact
                        path="/app"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imageurl={this.state.imageurl}
                                toggleModal={this.toggleModal}
                                bio={this.state.bio}
                                setBio={this.setBio}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={props => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </React.Fragment>
        );
    }
}
