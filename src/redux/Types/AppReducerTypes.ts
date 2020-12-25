import {actions} from "../appReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../storeRedux";


export type StartStateType = {
    initialized: boolean
}

export type AppActionsTypes = InferActionsTypes<typeof actions>

export type ThunkType = ThunkAction<unknown, AppStateType, unknown, AppActionsTypes>