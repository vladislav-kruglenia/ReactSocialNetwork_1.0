import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SER_USER_DATA = "SER_USER_DATA"


let startState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

let authReducer = (state = startState, action) => {
    switch (action.type) {
        case SER_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }

        default:
            return state
    }
}

//actionCreators
export let setUserData = (id, email, login, isAuth) => {
    return {
        type: SER_USER_DATA,
        data: {id, email, login, isAuth}
    }
}
//actionCreators

//thunkCreators
export let authMeThunkCreator = () => (dispatch) => {
    return authAPI.me()
        .then(response => {
            if (response.resultCode === 0) {
                let {id, email, login} = response.data
                dispatch(setUserData(id, email, login, true))
            }
        })
}


export let loginThunkCreator = (login, password, rememberMe = false) => (dispatch) => {
    authAPI.login(login, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authMeThunkCreator())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: message}))
            }
        })
}
export let logoutThunkCreator = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
}
//thunkCreators


export default authReducer


/*[
    {
    id: 1,
    imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
    followed: true,
    name: 'Anton',
    status: "i'm not alcoholic",
    location: {city: "Minsk", country: "Belarus"}
},
    {
        id: 2,
        imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
        followed: true,
        name: 'Vlad',
        status: "i'm alcoholic",
        location: {city: "Soligorsk", country: "Belarus"}
    },
    {
        id: 3,
        imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
        followed: false,
        name: 'Alexei',
        status: "i'm alcoholic",
        location: {city: "Minsk", country: "Belarus"}
    },
    {
        id: 4,
        imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
        followed: true,
        name: 'Arthur',
        status: "i'm not alcoholic",
        location: {city: "Soligorsk", country: "Belarus"}
    },
    {
        id: 5,
        imgURL: "http://images6.fanpop.com/image/photos/40300000/Vlad-Was-Looking-For-His-Wife-Mirena-vlad-tepes-iii-40312885-300-447.jpg",
        followed: true,
        name: 'Roma',
        status: "i'm alcoholic",
        location: {city: "Soligorsk", country: "Belarus"}
    }
]*/