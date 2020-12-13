import {ADD_MESSAGE, UPDATE_NEW_MESSAGE_TEXT} from "../dialogsReducer";

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type UpdateNewMessageTextActionType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    text: string
}
export type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}

export type DialogActionsTypes = UpdateNewMessageTextActionType | AddMessageActionType