export const setLoggedUserInfo = (userInfo) => {
    //ACTION CREATOR
    return {
        type: 'SET_LOGGED_USER_INFO',
        payload: userInfo
    }
}

export const setUserType = (userType) => {
    return {
        type: 'SET_USER_TYPE',
        payload: userType
    }
}

export const setLoggedUserId = (userID) => {
    //ACTION CREATOR
    return {
        type: 'SET_LOGGED_USER_ID',
        payload: userID
    }
}