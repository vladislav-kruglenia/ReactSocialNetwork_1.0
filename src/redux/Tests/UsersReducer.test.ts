import usersReducer, {actions, StartStateType} from "../usersReducer";

let startState: StartStateType;

// Перед каждым тестом beforeEach обновляет State
beforeEach(() => {
    startState = {
        users: [
            {
                name: 'Maks_Samoylov19',
                id: 13578,
                uniqueUrlName: null,
                photos: {
                    small: null,
                    large: null
                },
                status: null,
                followed: false
            },
            {
                name: 'skane',
                id: 13577,
                uniqueUrlName: null,
                photos: {
                    small: null,
                    large: null
                },
                status: null,
                followed: true
            },
            {
                name: 'ooolll123123',
                id: 13576,
                uniqueUrlName: null,
                photos: {
                    small: null,
                    large: null
                },
                status: null,
                followed: true
            }
        ],
        pageSize: 5, // сколько элементов будет на странице (задается вручную)
        totalUsersCount: 0,
        currentPage: 1, // номер активной ссылки
        isFetching: false,
        followingInProgress: []
    };
})

test("Follow success(correct action)", () => {
    const newState = usersReducer(startState, actions.follow(13577));
    expect(newState.users[1].followed).toBeTruthy();
});

test("UnFollow success(correct action)", () => {
    const newState = usersReducer(startState, actions.unFollow(13577));
    expect(newState.users[1].followed).toBeFalsy();
});


