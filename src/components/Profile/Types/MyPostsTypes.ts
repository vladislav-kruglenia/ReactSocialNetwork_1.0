import {
    MyPostsContainerDispatchPropsTypes,
    MyPostsContainerMapStatePropsTypes,
    MyPostsContainerOwnPropsTypes
} from "./MyPostsContainerTypes";
import {PostDataType} from "../../../redux/Types/ProfileReducerTypes";

export type AddNewPostFormData = PostDataType

export type AddNewPostOwnPropsType = {}

export type AddNewPostFormValuesTypeKeys = Extract<keyof AddNewPostFormData, string>

export type MyPostsPropsType = MyPostsContainerMapStatePropsTypes
    & MyPostsContainerDispatchPropsTypes
    & MyPostsContainerOwnPropsTypes