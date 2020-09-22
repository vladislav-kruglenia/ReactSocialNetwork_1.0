import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";


class HeaderContainer extends React.Component {
    render() {
        return <Header
            login={this.props.auth.login}
            isAuth={this.props.auth.isAuth}
            logout={this.props.logout}
        />
    }
}

let mapStateToProps = (state) =>{
    return{
        auth: state.auth
    }
}

let dispatchObject={
    logout: logoutThunkCreator
}

export default connect(mapStateToProps,dispatchObject)(HeaderContainer)