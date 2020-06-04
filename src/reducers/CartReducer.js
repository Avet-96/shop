
const initialState = {
    cartItemCount: 0,
    cartItemFlag: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload
        case 'CART_STATUS':
            return [...state, action.payload]
        default:
            return state;
    }
}