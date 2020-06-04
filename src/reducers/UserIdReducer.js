import AsyncStorage from '@react-native-community/async-storage';

const initialState = 'notloggedin'

export default (state = initialState, action) => { 
    switch(action.type) {
        case 'SET_LOGGED_USER_ID': 
            if (action.payload) {
                AsyncStorage.setItem('userID', action.payload.toString());
            }
            return action.payload
        default: 
            return state;
    }
}