import {authMeThunkCreator} from "./authReducer";
import {AppActionsTypes, InitializedSuccessActionType, StartStateType, ThunkType} from "./Types/AppReducerTypes";


export const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

let startState:StartStateType = {
    initialized: false
};

let appReducer = (state:StartStateType = startState, action:AppActionsTypes):StartStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }

        default:
            return state
    }
};

//actionCreators
export let initializedSuccess = ():InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS
    }
};
//actionCreators

//thunkCreators
// @ts-ignore
export let initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(authMeThunkCreator());
    // Обычно dispatch выполняется и уничтожается.
    // Но тут он что-то возвращает(в нашем случае промис).
    // Мы собираем все промисы в массив, и когда они все будут выполнены, то кидаем в Redux статут инициализации true
    Promise.all([promise]).then(()=>{
        dispatch(initializedSuccess())
    })
};

//thunkCreators


export default appReducer


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