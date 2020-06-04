import React, { Component } from 'react';
import { View, StatusBar, Platform, Alert, Linking, Image, TouchableOpacity, Text } from 'react-native';

import { ReduxNetworkProvider } from 'react-native-offline';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import RNRestart from 'react-native-restart';
// return RNRestart.Restart();

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import SplashScreen from 'react-native-splash-screen'
import { initUserData } from './initapp';

import { Provider } from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';

import reducers from '../reducers';

import NavigationService from '../navigation-service';
import { sWidth } from '../helpers/screenSize';


import AmazonLoginWebView from '../screens/payment/AmazonLoginWebView'
import AskQuestion from '../screens/ask-question';
import BackButton from '../common/header-buttons/back-button';
import BecomePartner from '../screens/become-partner';
import Brands from '../screens/brands';
import Career from '../screens/career';
import Cart from '../screens/cart';
import CartIconWithBadge from '../screens/cart/CartIconWithBadge';
import CategoriesList from '../screens/categories-list';
import CategoryInfo from '../screens/category-info';
import ChangePaymentAddress from '../screens/change-payment-address';
import ChangePersonalData from '../screens/change-personal-data';
import Contacts from '../screens/contacts';
import CreditCards from '../screens/credit-cards';
import DeliveryAddress from '../screens/delivery-address';
import DeliveryAddressOrder from '../screens/delivery-address-order';
import DeliveryService from '../screens/delivery-service';
import Favourite from '../screens/favourite';
import Feedback from '../screens/feedback';
import Filter from '../screens/filter';
import HotLine from '../screens/hot-line';
import Info from '../screens/info';
import LeaveReview from '../screens/leave-review';
import Login from '../screens/login';
import Main from '../screens/main';
import NoNetwork from '../screens/no-network';
import Orders from '../screens/orders';
import OrderSuccess from '../screens/order-success';
import Payment from '../screens/payment';
import PaypalConfirm from '../screens/payment/paypalConfirm';
import PersonalData from '../screens/personal-data';
import Product from '../screens/product';
import ProductsByBrand from '../screens/products-by-brand';
import ProductsByCategory from '../screens/products-by-category';
import ProductsList from '../screens/products-list';
import ProductSubscribe from '../screens/product-subscribe';
import Profile from '../screens/profile';
import Registration from '../screens/registration';
import Return from '../screens/return';
import SubcategoriesList from '../screens/subcategories-list';
import SideMenuView from '../screens/side-menu-view';
import Search from '../screens/search';
import Scanner from '../screens/scanner';
import Subscribe from '../screens/subscribe';
import TermsConfidentiality from '../screens/terms-confidentiality';
import TermsDeliveryPayment from '../screens/terms-delivery-payment';
import TermsReturn from '../screens/terms-return';
import UserTypeSelection from '../screens/user-type-selection';
import WebPayPal from '../screens/payment/WebPayPal'
import WhatsApp from '../screens/whatsapp'

import { YellowBox } from 'react-native';

import { MenuButton, SearchButton } from '../common/header-buttons';
import {
  clearCart
} from '../functions/cart-funcs';

import Icons from 'react-native-vector-icons/Ionicons';

YellowBox.ignoreWarnings(['Require cycle:']);
console.disableYellowBox = true;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware()),
);
// export const store = createStore(reducers);

export default class App extends Component {

  componentDidMount() {
    if (!DeviceInfo.isTablet()) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    console.log('loaded: ', store.getState().app.loaded);
    this.checkPermission();
    this.createNotificationListeners();
    initUserData(store);

    // // КОД НА ПРОВЕРКУ ПЕРВОГО ЗАПУСКА
    // firstLaunchCheck()
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  // // КОД НА ПРОВЕРКУ ПЕРВОГО ЗАПУСКА
  // async firstLaunchCheck() { // НУЖНО ДОБАВИТЬ ПЕРЕМЕННУЮ В СТЕЙТЕ(this.state = {firstLaunch: null};), ЗАТЕМ ЕЕ ЧЕКАТЬ 
  //   AsyncStorage.getItem("alreadyLaunched").then(value => {
  //     if (value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', true);
  //       this.setState({ firstLaunch: true });
  //     }
  //     else {
  //       this.setState({ firstLaunch: false });
  //     }
  //   })
  // }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log('fcmToken', fcmToken)
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }


  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log('notificationListener', notification)
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {      
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {      
      const { title, data } = notificationOpen.notification;
      this.showAlert(title, data.text);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  state = {
    isConnected: true
  }

  render() {
    const subscribe = store.subscribe(() => {
      const localStore = store.getState()
      console.log('REDUX-STORE', localStore)
      if (this.state.isConnected !== localStore.network.isConnected) {
        this.setState({ isConnected: !this.state.isConnected })
      }
      if (store.getState().app.loaded) {
        SplashScreen.hide();
      }
    }
    )

    // // КОД НА ПРОВЕРКУ ПЕРВОГО ЗАПУСКА
    // if (this.state.firstLaunch === null) {
    //   return null;
    // } else if (this.state.firstLaunch == true) {
    //   return RNRestart.Restart();
    // }

    return (
      <Provider store={store}>
        <ReduxNetworkProvider
          pingServerUrl='https://www.teleropa.de/'
        >
          {this.state.isConnected ?
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor="#c00017" barStyle="light-content" />
              <AppContainer
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </View>
            : <NoNetwork />
          }
        </ReduxNetworkProvider>
      </Provider>
    );
  }
}


handlePress = () => {
  Linking.canOpenURL('whatsapp://send?phone=491707046434')
    .then((supported) => {
      if (!supported) {
        Linking.openURL("market://details?id=com.whatsapp");
      } else {
        return Linking.openURL('whatsapp://send?phone=491707046434');
      }
    })
    .catch((err) => console.error('An error occurred', err));
};



const AppBottomBarNavigator = createBottomTabNavigator(
  {
    Main: Main,
    Cart: {
      screen: Cart,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          //navigation.navigate('Cart', { cartReceaved: false });
          NavigationService.navigate('Cart', { cartReceaved: false })
        }
      },
    },
    Help: {
      screen: () => null,
      navigationOptions: {
        tabBarOnPress: handlePress
      }
    },
    Profile: Profile
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icons;
        let iconName;
        if (routeName === 'Main') {
          iconName = `ios-home`;
        } else if (routeName === 'Cart') {
          iconName = `ios-cart`;
          IconComponent = CartIconWithBadge;
        } else if (routeName === 'Help') {
          iconName = `ios-help-circle-outline`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: '#d7171f',
      // activeTintColor: '#F8F8F8',
      inactiveTintColor: '#586589',
      style: {
        backgroundColor: '#ffffff'
        // backgroundColor: '#171F33'
      },
      tabStyle: {}
    }
  })

const AppStackNavigator = createStackNavigator(
  {
    Main: AppBottomBarNavigator,
    Intro: UserTypeSelection,
    NoNetwork: NoNetwork,
    HotLine: HotLine,
    Subscribe: Subscribe,
    Info: Info,
    CategoriesList: CategoriesList,
    Profile: Profile,
    Feedback: Feedback,
    ChangePaymentAddress: ChangePaymentAddress,
    LeaveReview: LeaveReview,
    DeliveryAddress: DeliveryAddress,
    DeliveryAddressOrder: DeliveryAddressOrder,
    BecomePartner: BecomePartner,
    AskQuestion: AskQuestion,
    Payment: Payment,
    AmazonLoginWebView: AmazonLoginWebView,
    Login: Login,
    Registration: Registration,
    PersonalData: PersonalData,
    SubcategoriesList: SubcategoriesList,
    ChangePersonalData: ChangePersonalData,
    Filter: Filter,
    Product: Product,
    Cart: Cart,
    Search: Search,
    Scanner: Scanner,
    Orders: Orders,
    ProductSubscribe: ProductSubscribe,
    Return: Return,
    Favourite: Favourite,
    ProductsList: ProductsList,
    OrderSuccess: OrderSuccess,
    Contacts: Contacts,
    Brands: Brands,
    CreditCards: CreditCards,
    Career: Career,
    TermsConfidentiality: TermsConfidentiality,
    TermsDeliveryPayment: TermsDeliveryPayment,
    TermsReturn: TermsReturn,
    ProductsByBrand: ProductsByBrand,
    ProductsByCategory: ProductsByCategory,
    CategoryInfo: CategoryInfo,
    DeliveryService: DeliveryService,
    WebPayPal: WebPayPal,

    PaypalConfirm: PaypalConfirm
  },
  {
    headerTitleStyle: {
      color: 'rgb(0, 255, 63)',
    },
    // initialRouteName: 'Main',    
    // initialRouteName: 'Main',
    // initialRouteName: this.state.network ? 'Main' : <NoNetwork />,
    defaultNavigationOptions: ({ navigation }) => {
      try {
        const { routeName } = navigation.state.routes[navigation.state.index];
        if (routeName == "Main") {
          return {
            headerLeft: (
              <>
                <MenuButton />
                <Image style={{ width: 60, height: 30, resizeMode: 'contain' }} source={require('../assets/teleropa-logo.png')} key={'menuTeleropaLogo'} />
              </>
            ),
            headerRight: (
              <View style={{ flexDirection: 'row', marginRight: 9 }}>
                <SearchButton />
              </View>
            ),

            headerBackImage: BackButton,
            headerBackTitle: null,
            headerStyle: {
              backgroundColor: '#d10019'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 16,
              marginLeft: 0,
              left: 0
            },
            headerTitleContainerStyle: {
              width: sWidth - 95,
              marginLeft: 0,
              justifyContent: 'flex-start',
              left: 56,
              paddingLeft: 0
            },
            headerLeftContainerStyle: {
              flex: 1,
              marginLeft: Platform.OS === 'ios' ? 0 : -10
            }
          }
        } else if (routeName == "Cart") {
          return {
            title: 'Warenkorb',
            headerLeft: (
              <>
                <MenuButton />
                {/* <Image style={{ width: 60, height: 30, resizeMode: 'contain' }} source={require('../assets/teleropa-logo.png')} key={'menuTeleropaLogo'} /> */}
              </>
            ),
            headerRight: (
              <TouchableOpacity onPress={() => { clearCart(); NavigationService.back() }} style={{ height: '100%', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, marginRight: 18 }}>löschen</Text>
              </TouchableOpacity>
            ),
            headerBackImage: BackButton,
            headerBackTitle: null,
            headerStyle: {
              backgroundColor: '#d10019'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 16,
              marginLeft: 0,
              left: 0
            },
            headerTitleContainerStyle: {
              width: sWidth - 95,
              marginLeft: 0,
              justifyContent: 'flex-start',
              left: 56,
              paddingLeft: 0
            },
            headerLeftContainerStyle: {
              flex: 1,
              marginLeft: Platform.OS === 'ios' ? 0 : -10
            }
          }
        } else if (routeName == "profile") {
          return {
            headerLeft: MenuButton,

            headerRight: (
              <View style={{ flexDirection: 'row', marginRight: 9 }}>
                <SearchButton />
              </View>
            ),

            title: 'Profil',

            headerBackImage: BackButton,
            headerBackTitle: null,
            headerStyle: {
              backgroundColor: '#d10019'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 16,
              marginLeft: 0,
              left: 0
            },
            headerTitleContainerStyle: {
              width: sWidth - 95,
              marginLeft: 0,
              justifyContent: 'flex-start',
              left: 56,
              paddingLeft: 0
            },
            headerLeftContainerStyle: {
              flex: 1,
              marginLeft: Platform.OS === 'ios' ? 0 : -10
            }
          }
        }//else if end
      } //try end
      catch{
        return {

          headerLeft: (
            <>
              <MenuButton />
              {/* <Image style={{ width: 60, height: 30, resizeMode: 'contain' }} source={require('../../assets/teleropa-logo.png')} key={'menuTeleropaLogo'} /> */}
            </>
          ),
          headerRight: (
            <View style={{ flexDirection: 'row', marginRight: 9 }}>
              <SearchButton />
            </View>
          ),

          headerBackImage: BackButton,
          headerBackTitle: null,
          headerStyle: {
            backgroundColor: '#d10019'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 16,
            marginLeft: 0,
            left: 0
          },
          headerTitleContainerStyle: {
            width: sWidth - 95,
            marginLeft: 0,
            justifyContent: 'flex-start',
            left: 56,
            paddingLeft: 0
          },
          headerLeftContainerStyle: {
            flex: 1,
            marginLeft: Platform.OS === 'ios' ? 0 : -10
          }
        }
      }
    },
  }
);


const AppDrawerNavigator = createDrawerNavigator(
  { App: AppStackNavigator },
  {
    contentComponent: SideMenuView,
    drawerWidth: 290
  }
);

const AppSwitchNaigator = createSwitchNavigator(

  { drawer: AppDrawerNavigator },
  { AppDrawerNavigator, AppStackNavigator },
  { initialRouteName: "AppStackNavigator" }
)

const AppContainer = createAppContainer(AppSwitchNaigator);

