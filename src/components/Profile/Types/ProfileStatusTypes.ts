export type ProfileStatusProps = {
    status: string,
    nameUser: string,
    isOwner: boolean,
    updateStatus: (status: string) => void,
}