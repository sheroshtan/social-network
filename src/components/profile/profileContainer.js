import React from "react";
import Profile from "./profile";
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-page-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(res => this.props.setUserProfile(res.data))
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ profile: state.profilePage.profile });


export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);