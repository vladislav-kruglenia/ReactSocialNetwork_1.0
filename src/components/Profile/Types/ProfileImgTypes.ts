import {PhotosType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfileImgProps = {
    photos: PhotosType,
    isOwner: boolean,


    savePhoto: (e:any) => void,
}