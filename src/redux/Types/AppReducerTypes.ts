import {INITIALIZED_SUCCESS} from "../appReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../storeRedux";


export type StartStateType = {
    initialized: boolean
}

export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export type AppActionsTypes = InitializedSuccessActionType

export type ThunkType = ThunkAction<Promise<true>, AppStateType, unknown, AppActionsTypes>