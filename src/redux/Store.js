import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello, how are you?", likeCounts: '15'},
                {id: 2, message: "This my first post", likeCounts: '26'},
                {id: 3, message: "This blalala", likeCounts: '27'}
            ],
            newPostText: ""
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Anton'},
                {id: 2, name: 'Alex'},
                {id: 3, name: 'Roman'},
                {id: 4, name: 'Ivan'},
                {id: 5, name: 'Sergei'}
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'Bonjour'},
                {id: 3, message: 'Comment ca va?'}
            ],
            newMessage: "Darova"
        }
    },
    getState() {
        return this._state
    },

    _callSubscriber() {
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)

        this._callSubscriber(this._state)
    }
}

export default store
window.store = store
