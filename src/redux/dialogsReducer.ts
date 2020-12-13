import {
    AddMessageActionType,
    DialogActionsTypes,
    DialogType,
    MessageType,
    UpdateNewMessageTextActionType
} from "./Types/DialogsReducerTypes";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

let startState = {
    dialogs: [
        {id: 1, name: 'Anton'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Roman'},
        {id: 4, name: 'Ivan'},
        {id: 5, name: 'Sergei'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Bonjour'},
        {id: 3, message: 'Comment ca va?'}
    ] as Array<MessageType>,
    newMessage: "Darova"
};

type StartStateType = typeof startState

let dialogsReducer = (state = startState, action: DialogActionsTypes): StartStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id: (state.messages).length + 1,
                message: action.newMessageText
            };
            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessage: ""
            }
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessage: action.text
            }
        }
        default:
            return state
    }
};

export let actionCreator = {
    updateNewMessageText(text: string): UpdateNewMessageTextActionType {
        return {
            type: UPDATE_NEW_MESSAGE_TEXT,
            text: text
        }
    },
    addMessage(text: string): AddMessageActionType {
        return {
            type: ADD_MESSAGE,
            newMessageText: text
        }
    }
};

export default dialogsReducer