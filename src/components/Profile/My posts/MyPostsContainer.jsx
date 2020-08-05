import {actionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

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
        }
    }

};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer