import {applyMiddleware, combineReducers, createStore, compose, Action, Store} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
});

type RootReducerType = typeof rootReducer

export type AppStateType = ReturnType<RootReducerType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store:AppStateType = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
const store:Store<AppStateType> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));


// @ts-ignore
window.store = store;

export default store


//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>