import {actionCreator} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HighOrderComponents/widthAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) =>{
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
let mapDispatchToProps = (dispatch) =>{
    return{
        onMessageChangeCollBack: (newText) =>{
            dispatch(actionCreator.updateNewMessageText(newText))
        },
        addMessageCollBack: (text) =>{
            dispatch(actionCreator.addMessage(text))
        }
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,mapDispatchToProps)
)(Dialogs)