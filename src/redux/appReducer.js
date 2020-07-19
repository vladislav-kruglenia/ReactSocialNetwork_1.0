import {authMeThunkCreator} from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"


let startState = {
    initialized: false
}

let appReducer = (state = startState, action) => {
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
}

//actionCreators
export let initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}
//actionCreators

//thunkCreators
export let initializeApp = () => (dispatch) => {
    let promise = dispatch(authMeThunkCreator())
    Promise.all([promise]).then(()=>{
        dispatch(initializedSuccess())
    })
}

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