import {actionCreators} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect";
import {compose} from "redux";
import {reset} from "redux-form";

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        onMessageChangeCollBack: (newText) => {
            dispatch(actionCreators.updateNewMessageText(newText))
        },
        addMessageCollBack: (text) => {
            dispatch(actionCreators.addMessage(text))
        },
        resetText: (formName) => dispatch(reset(formName))
    }
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)