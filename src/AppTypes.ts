import { ContainerPropsTypes } from "./CommonTypes"

export type mapStatePropsTypes = {
    initialized: boolean
}

export type mapDispatchPropsTypes = {
    authMe: () => void
}

export type OwnPropsType = {}

export type AppPropsTypes = ContainerPropsTypes<mapStatePropsTypes, mapDispatchPropsTypes, OwnPropsType>
