import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';

import {store} from '../../app/app'

import { checkInternetConnection, offlineActionTypes } from 'react-native-offline';

async function internetChecker() {
    const isConnected = await checkInternetConnection('https://www.teleropa.de/');
    console.log(offlineActionTypes, isConnected)    
    store.dispatch({
        type: offlineActionTypes.CONNECTION_CHANGE,
        payload: isConnected,
    });
}

export default class NoNetwork extends Component {

    render() {
        console.log(this.props)
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#d00019'}}>
                <StatusBar backgroundColor="#c00017" barStyle="light-content" />
                <View style={styles.container} >
                    <TouchableOpacity style={styles.retryButton} onPress={() => internetChecker()} >
                        <Text style={styles.retryText} > Der Server ist leider nicht verfügbar. </Text>
                    </TouchableOpacity>
                    <Image style={styles.image} source={require('../../assets/message-icons/no-network.png')} />
                    <Text style={styles.text}> Keine Netzwerkverbindung festgestellt {}</Text>
                </View>
            </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginBottom: 50
    },
    text: {
        color: '#040404',
        fontSize: 16
    },
    retryButton: {
        position: 'absolute',
        top: 0,
        backgroundColor: '#d00019',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    retryText: {
        fontSize: 16,
        color: '#fff'
    }
})