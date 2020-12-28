import {MapDispatchPropsType, MapStatePropsType} from "./DialogsContainerTypes";

export type AddMessageFormDataType = {
    newMessage: string
}

export type OwnFormPropsType = {}

export type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormDataType, string>

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType