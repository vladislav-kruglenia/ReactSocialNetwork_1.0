import {AppStateType} from "../storeRedux";
import {Dispatch} from "redux";
import {UsersActionsTypes} from "./UsersReducerTypes";
import {ThunkAction} from "redux-thunk";

type ActionsTypes = UsersActionsTypes

// Для типизации thunkCreators можно типизировать каждый dispatch
export type GetStateType = () => AppStateType
export type DispatchType = Dispatch<ActionsTypes>
// либо типизировать то, что отдает thunk-функция
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>