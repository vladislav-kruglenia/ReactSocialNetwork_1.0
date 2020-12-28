import React from 'react';
import Profile from "./Profile";
import {
    getProfileInfoThunkCreator,
    getStatusThunkCreator, savePhotoThunkCreator, saveProfileDataThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect/widthAuthRedirect";
import {compose} from "redux";
import {
    PrContDispatchPropsType,
    PrContMapStatePropsType,
    PrContOwnPropsType,
    ProfileContainerPropsType
} from "./Types/ProfileContainerTypes";
import {AppStateType} from "../../redux/storeRedux";


class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    updateUserParams(){
        let numberID = this.props.match.params.userId;
        if(!numberID) {
            numberID = this.props.authorizedUserId;
            if(!numberID){
                this.props.history.push("/login")
            }
        } //8845
        this.props.getProfileInfo(numberID);
        this.props.getUserStatus(numberID)
    }
    componentDidMount() {
        this.updateUserParams()
    }
    componentDidUpdate(prevProps:ProfileContainerPropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.updateUserParams()
        }
    }

    render() {
         return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateUserStatus}
                     savePhoto={this.props.savePhoto}
                     saveProfileData={this.props.saveProfileData}
            />
        )
    }

}

let mapStateToProps = (state:AppStateType):PrContMapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
    }
};

let dispatchObject:PrContDispatchPropsType = {
    getProfileInfo: getProfileInfoThunkCreator,
    getUserStatus: getStatusThunkCreator,
    updateUserStatus: updateStatusThunkCreator,
    savePhoto: savePhotoThunkCreator,
    // @ts-ignore
    saveProfileData: saveProfileDataThunkCreator
};

export default compose<React.ComponentType>(
    connect<PrContMapStatePropsType, PrContDispatchPropsType, PrContOwnPropsType, AppStateType>
    (mapStateToProps, dispatchObject),
    withRouter,
    withAuthRedirect
)(ProfileContainer)