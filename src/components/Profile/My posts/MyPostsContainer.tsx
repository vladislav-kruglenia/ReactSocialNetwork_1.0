import {actionCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import { reset} from "redux-form";
import {AppStateType} from "../../../redux/storeRedux";
import {PostDataType} from "../../../redux/Types/ProfileReducerTypes";
import {
    MyPostsContainerDispatchPropsTypes,
    MyPostsContainerMapStatePropsTypes,
    MyPostsContainerOwnPropsTypes
} from "../Types/MyPostsContainerTypes";

let mapStateToProps = (state:AppStateType):MyPostsContainerMapStatePropsTypes =>{
    return{
        profilePage: state.profilePage,
    }
};

let mapDispatchToProps = (dispatch:any):MyPostsContainerDispatchPropsTypes =>{
    return{
        addPostCollback: (data:PostDataType) => {
            dispatch(actionCreator.addPost(data))
        },
        resetText:(formName: string) => dispatch(reset(formName))
    }

};

const MyPostsContainer = connect<MyPostsContainerMapStatePropsTypes,
    MyPostsContainerDispatchPropsTypes,
    MyPostsContainerOwnPropsTypes,
    AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer