import {FollowResType, GetUsersResType} from "./ApiTypes";
import {instance} from "./api";
import {FilterType} from "../redux/Types/UsersReducerTypes";

export let usersApi = {
    getUsers(currentPage: number, pageSize: number, filter: FilterType) {
        return instance.get<GetUsersResType>(`users?page=${currentPage}&count=${pageSize}&term=${filter.term}`+
        (filter.friend === null ? '' : `&friend=${filter.friend}`))
            .then(response => {
                return response.data
            })
    },
    follow(userID: number) {
        debugger
        return instance.post<FollowResType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })

    },
    unFollow(userID: number) {
        return instance.delete<FollowResType>(`follow/${userID}`)
            .then(response => {
                return response.data
            })
    }
};