import {PhotosType} from "../../../redux/Types/ProfileReducerTypes";

export type ProfileImgProps = {
    photos: PhotosType | null,
    isOwner: boolean,


    savePhoto: (e:any) => void,
}