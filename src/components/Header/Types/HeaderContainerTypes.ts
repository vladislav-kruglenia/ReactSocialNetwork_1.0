import {StartStateType} from "../../../redux/Types/AuthReducerTypes";

export type MapStatePropsType = {
    auth: StartStateType
}

export type MapDispatchPropsType = {
    logout: () => void
}

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

export type HeaderPropsType = {
    login: null | string,
    isAuth: boolean
} & MapDispatchPropsType