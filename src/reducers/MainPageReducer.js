
const initialState = {
    brands: null,
    categories: null,
    newest: null,
    offers: null,
    topbanner: null,
}

export default (state = initialState, action) => { 
    // console.log(action, state)
    switch(action.type) {
        case 'SET_BRANDS': 
            return {...state, ...{brands: action.payload}}
        case 'SET_CATEGORIES':
            return {...state, ...{categories: action.payload}}
        case 'SET_NEWEST': 
            return {...state, ...{newest: action.payload}}
        case 'SET_OFFERS': 
            return {...state, ...{offers: action.payload}}
        case 'SET_TOPBANNER': 
            return {...state, ...{topbanner: action.payload}}
        default: 
            return state;
    }
}