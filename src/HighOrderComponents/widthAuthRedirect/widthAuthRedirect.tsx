import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/storeRedux";
import {MapDispatchPropsType, MapStatePropsType} from "./WidthAuthRedirectTypes";

let mapStateToPropsForRedirect = (state:AppStateType):MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
};

// WCP - Wrapped Component Props

export function withAuthRedirect <WCP>(WrappedComponent:React.ComponentType<WCP>) {
    const RedirectComponent:FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, fake, ...restProps} = props;

        if (!isAuth) return <Redirect to={'/login'}/>;
        return <WrappedComponent {...restProps as WCP}/>
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

/*
class RedirectComponent extends React.Component{
    render() {
        if(!this.props.isAuth) return <Redirect to={'/login'} />
        return <Component {...this.props}/>
    }
}*/
/*
let RedirectComponent = (props) =>{
    if(!props.isAuth) return <Redirect to={'/login'} />
    return <Component {...props}/>
}*/
