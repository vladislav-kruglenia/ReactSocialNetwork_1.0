import React from 'react';
import Profile from "./Profile";
import {
    getProfileInfoThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let numberID = this.props.match.params.userId
        if(!numberID) {
            numberID = this.props.authorizedUserId
            if(!numberID){
                this.props.history.push("/login")
            }
        } //8845}
        this.props.getProfileInfo(numberID)
        this.props.getUserStatus(numberID)
    }

    render() {
         return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}
            />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}
let dispatchObject ={
    getProfileInfo: getProfileInfoThunkCreator,
    getUserStatus: getStatusThunkCreator,
    updateUserStatus: updateStatusThunkCreator
}

export default compose(
    connect(mapStateToProps, dispatchObject),
    withRouter,
    withAuthRedirect
)(ProfileContainer)