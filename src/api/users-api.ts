import {FollowResType, GetUsersResType} from "./ApiTypes";
import {instance} from "./api";

export let usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResType>(`users?page=${currentPage}&count=${pageSize}`)
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