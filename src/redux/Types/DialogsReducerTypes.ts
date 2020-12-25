import {actionCreators} from "../dialogsReducer";
import {InferActionsTypes} from "../storeRedux";

export type DialogType = {
    id: number,
    name: string
}

export type MessageType = {
    id: number,
    message: string
}

export type DialogActionsTypes = InferActionsTypes<typeof actionCreators>

/*export type UpdateNewMessageTextActionType = {
    type: typeof UPDATE_NEW_MESSAGE_TEXT,
    text: string
}
export type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    newMessageText: string
}*/

//export type DialogActionsTypes = UpdateNewMessageTextActionType | AddMessageActionType