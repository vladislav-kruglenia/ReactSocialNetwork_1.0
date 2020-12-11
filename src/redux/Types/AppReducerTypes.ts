import {INITIALIZED_SUCCESS} from "../appReducer";


export type StartStateType = {
    initialized: boolean
}

export type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}