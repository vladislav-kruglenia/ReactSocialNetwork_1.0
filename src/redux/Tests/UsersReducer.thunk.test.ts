import {actions, followUserThunkCreator, unFollowUserThunkCreator} from "../usersReducer";
import {usersApi} from "../../api/users-api";
import {FollowResType, ResultCodesEnum} from "../../api/ApiTypes";
jest.mock("../../api/users-api");

let userApiMock = usersApi as jest.Mocked<typeof usersApi>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();
// Обновляем моки перед каждым запуском
beforeEach(() =>{
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userApiMock.follow.mockClear();
    userApiMock.unFollow.mockClear();
});


let result: FollowResType = {
    data: {},
    resultCode: ResultCodesEnum.Success,
    messages: [],
};

userApiMock.follow.mockReturnValue(Promise.resolve(result));
userApiMock.unFollow.mockReturnValue(Promise.resolve(result));

test("Success followUserThunkCreator", async () => {
    const thunk = followUserThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});

    // dispatchMock был вызван 3 раза
    expect(dispatchMock).toBeCalledTimes(3);

    // dispatchMock был вызван какой раз и с каким объектом
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.changeFollowingProgress(false, 1));
});

test("Success unFollowUserThunkCreator", async () => {
    const thunk = unFollowUserThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});

    // dispatchMock был вызван 3 раза
    expect(dispatchMock).toBeCalledTimes(3);

    // dispatchMock был вызван какой раз и с каким объектом
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.changeFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.changeFollowingProgress(false, 1));
});