import profileReducer, {actionCreator} from "./profileReducer";

let startState = {
    posts: [
        {id: 1, message: "This my first post", likeCounts: '26'},
        {id: 2, message: "This my second post", likeCounts: '27'}
    ],
};

test('new post should be added', () => {
    //1. test data
    let action = actionCreator.addPost("89 level");

    // 2. action
    let newState = profileReducer(startState, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3)
});

test('message of new post should be correct', () => {
    //1. test data

    let action = actionCreator.addPost("89 level");

    // 2. action
    let newState = profileReducer(startState, action);

    // 3. expectation
    expect(newState.posts[2].message).toBe("89 level")
});



test('delete post should be correct', () => {
    //1. test data

    let action = actionCreator.deletePost(1);

    // 2. action
    let newState = profileReducer(startState, action);

    // 3. expectation
    expect(newState.posts.length).toBe(1)
});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    //1. test data

    let action = actionCreator.deletePost(2005880);

    // 2. action
    let newState = profileReducer(startState, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2)
});
