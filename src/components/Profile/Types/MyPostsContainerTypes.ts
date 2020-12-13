import {StartStateProfileType} from "../../../redux/profileReducer";
import {PostDataType} from "../../../redux/Types/ProfileReducerTypes";

export type MyPostsContainerMapStatePropsTypes = {
    profilePage: StartStateProfileType
}

export type MyPostsContainerDispatchPropsTypes ={
    addPostCollback: (data:PostDataType) => void,
    resetText: (formName: string) => void
}

export type MyPostsContainerOwnPropsTypes ={

}