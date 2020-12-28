import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";
import {AppStateType} from "../../redux/storeRedux";
import {MapStatePropsType, MapDispatchPropsType, HeaderContainerPropsType} from "./Types/HeaderContainerTypes";


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header
            login={this.props.auth.login}
            isAuth={this.props.auth.isAuth}
            logout={this.props.logout}
        />
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        auth: state.auth
    }
};

let dispatchObject: MapDispatchPropsType = {
    logout: logoutThunkCreator
};

export default connect<
    MapStatePropsType,
    MapDispatchPropsType,
    {},
    AppStateType>(mapStateToProps, dispatchObject)(HeaderContainer)