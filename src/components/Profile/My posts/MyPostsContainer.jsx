import {actionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import { reset} from "redux-form";

// commit!!!!!!!!!!!
let mapStateToProps = (state) =>{
    return{
        profilePage: state.profilePage
    }
};

let mapDispatchToProps = (dispatch) =>{
    return{
        addPostCollback: (text) => {
            dispatch(actionCreator.addPost(text))
        },
        resetText:(formName) => dispatch(reset(formName))
    }

};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer