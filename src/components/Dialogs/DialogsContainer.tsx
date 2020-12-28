import {actionCreators} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect/widthAuthRedirect";
import {compose, Dispatch} from "redux";
import {reset} from "redux-form";
import {AppStateType} from "../../redux/storeRedux";
import {MapDispatchPropsType, MapStatePropsType, OwnPropsType} from "./Types/DialogsContainerTypes";
import React from "react";

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};
// @ts-ignore
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        onMessageChangeCollBack: (newText: string) => {
            dispatch(actionCreators.updateNewMessageText(newText))
        },
        addMessageCollBack: (text: string) => {
            dispatch(actionCreators.addMessage(text))
        },
        resetText: (formName: string) => dispatch(reset(formName))
    }
};

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStatePropsType,
        MapDispatchPropsType,
        OwnPropsType,
        AppStateType>(mapStateToProps, mapDispatchToProps)
)(Dialogs)