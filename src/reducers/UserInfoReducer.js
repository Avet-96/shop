import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    birthDate: '',
    city: '',
    email: '',
    gender: '',
    name: '',
    phone: '',
    post: '',
    street: '',
    surname: '',
    userType: '',
    selectedUserType: ''
}

export default (state = initialState, action) => { 
    console.log(action)
    switch(action.type) {
        case 'SET_LOGGED_USER_INFO': 
            AsyncStorage.setItem('userSelectedType', action.payload.userType)
            return {...action.payload, selectedUserType: action.payload.userType}
        case 'SET_USER_TYPE':
            AsyncStorage.setItem('userSelectedType', action.payload)
            return {...state, selectedUserType: action.payload}
        default: 
            return state;
    }
}