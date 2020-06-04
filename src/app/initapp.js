import AsyncStorage from '@react-native-community/async-storage';

import * as actions from '../actions/login-actions'
import { setLoadDone } from '../actions/app-actions'
import { setCart } from '../actions/cart-actions'
import { getUserInfo } from '../gets/userPosts';

import NavigationService from '../navigation-service'

export async function initUserData(store) {
    const userID = await AsyncStorage.getItem('userID');
    const userSelectedType = await AsyncStorage.getItem('userSelectedType');
    const cart = await AsyncStorage.getItem('Cart')
    store.dispatch(setLoadDone())
    try {
        if (cart) {
            console.log("store.dispatch(setCart(JSON.parse(cart)))",
                store.dispatch(setCart(JSON.parse(cart))))
        } else {
            console.log("store.dispatch(setCart([]))", store.dispatch(setCart([])))
        }
    }
    catch (e) {
        console.log(e)
    }
    if (!userSelectedType) {
        NavigationService.replace('Intro')
    } else store.dispatch(actions.setUserType(userSelectedType))
    if (userID && userID !== 'notloggedin') {
        console.log("userID in initapp.js", userID)
        store.dispatch(actions.setLoggedUserId(userID))
        getUserInfo(userID).then(userInfo => {
            store.dispatch(setLoadDone())
            store.dispatch(actions.setLoggedUserInfo(userInfo))
        })
    } else {
        store.dispatch(setLoadDone())
    }

}