import { combineReducers } from 'redux';
import UserInfoReducer from './UserInfoReducer';
import UserIdReducer from './UserIdReducer';
import MainPageReducer from './MainPageReducer';
import ProductReducer from './ProductReducer';
import AppReducer from './AppReducer';
import CartReducer from './CartReducer';
import { reducer as network } from 'react-native-offline';

export default combineReducers({
    userInfo: UserInfoReducer,
    userID: UserIdReducer,
    mainPage: MainPageReducer,
    currentProduct: ProductReducer,
    app: AppReducer,
    network,
    cart: CartReducer
})