import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Linking } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import NavigationService from '../../navigation-service';
import CartIconWithBadge from '../cart/CartIconWithBadge';
import Main from '../main';
import Profile from '../profile';
import Cart from '../cart';
import Login from '../login';

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

export default createBottomTabNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: {
                tabBarOnPress: () => {
                    NavigationService.navigate('Main');
                },
            }
        },
        cart: {
            screen: Cart,
            navigationOptions: {
                tabBarOnPress: () => {
                    NavigationService.navigate('Cart');
                },
            }
        },
        Help: {
            screen: () => null,
            navigationOptions: {
                tabBarOnPress: handlePress
            }
        },

        profile: {
            screen: Login
        },
    },

    {
        initialRouteName: 'Main',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icons;
                let iconName;
                if (routeName === 'Main') {
                    iconName = `ios-home`;
                } else if (routeName === 'cart') {
                    iconName = `ios-cart`;
                    IconComponent = CartIconWithBadge;
                } else if (routeName === 'Help') {
                    iconName = `ios-help-circle-outline`;
                } else if (routeName === 'profile') {
                    iconName = `ios-person`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
        }
    })



