
const initialState = {
    loaded: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOAD_DONE':
            // console.log("action in AppReducer.js", action);
            return { loaded: action.payload }
        default:
            return state;
    }
}