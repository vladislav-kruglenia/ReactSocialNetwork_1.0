import {StartStateType} from "../../../redux/dialogsReducer";

export type MapStatePropsType = {
    dialogsPage: StartStateType,
    isAuth: boolean
}

export type MapDispatchPropsType = {
    onMessageChangeCollBack: (newText: string) => void,
    addMessageCollBack: (text: string) => void,
    resetText: (formName: string) => void,
}

export type OwnPropsType = {}