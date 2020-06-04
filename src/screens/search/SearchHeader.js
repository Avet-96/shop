
import React, { Component } from 'react';

import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, Platform, ScrollView, StyleSheet, FlatList, ToastAndroid } from 'react-native';

import { SearchBar } from "react-native-elements";

import NavigationService from '../../navigation-service';

import ScannerButton from '../../common/header-buttons/scanner-button';

import BackButton from '../../common/header-buttons/back-button';

import { sWidth } from '../../helpers/screenSize';

import { getSearchResult } from '../../gets/productsListPost';

export default class SearchHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''

        };
    }

    componentWillMount() {

    }


    updateSearch = search => {
        getSearchResult(search)
            .then(res => {
                console.log("RES`````", res)
                if (res.searchResult.length > 0) console.log("res.searchResult", res.searchResult)//this.getIDs(res.searchResult)
                // else this.showToastNoSearch()
            })
        // var searchString = search.toLowerCase().trim();
        // let a = [];
        // function findAliasInArray(a) {
        //     let addressa = a.addressa.toLowerCase();
        //     var names = a.addressName == undefined
        //         ? addressa : a.addressName.toLowerCase().length != 0 ? a.addressName.toLowerCase() : "";
        //     var result = null;
        //     if (addressa.indexOf(searchString) != -1) {
        //         result = a;
        //     } else if (names.indexOf(searchString) != -1) {
        //         result = a;
        //     }
        //     return result;
        // }
        // var res = [];

        // this.state.events.forEach(function (el, index) {
        //     var obj = findAliasInArray(el);
        //     if (obj) res.push(el);
        // });
        // if (this.state.category != '-1' && this.state.selected != "keyAll") {
        //     a = this.filterByDate(res);
        //     a = this.filterByCategory(a);
        //     this.setState({ search, displayedEvents: a });
        // } else {
        //     this.setState({ search, displayedEvents: res });
        // }
    };

    render() {
        console.log("VALUEKSDAKMSAKDMSAD", this.state.value)
        return (
            <SafeAreaView style={{ backgroundColor: '#d1D0019' }}>
                <View style={styles.headerStyle}>
                    <TouchableOpacity style={styles.backStyle} onPress={() => NavigationService.back()}>
                        <BackButton />
                    </TouchableOpacity>
                    <SearchBar
                        autoFocus
                        lightTheme
                        value={this.state.value}
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        // containerStyle={{ width: sWidth - 90, backgroundColor: '#d10019' }}
                        // leftIconContainerStyle={{ width: 0, backgroundColor: '#d10019' }}
                        // rightIconContainerStyle={{ width: 0, backgroundColor: '#d10019' }}
                        containerStyle={{ width: sWidth - 90 }}
                        inputStyle={styles.searchInputStyle}
                        placeholder='Bitte geben Sie den Artikelnamen ein'
                        //onChangeText={value => onChangeText(value)}
                        onChangeText={value => this.updateSearch(value)}
                        onEndEditing={() => onEndEditing()}
                    />

                    {/* <TextInput
                        autoFocus
                        value={value}
                        placeholderTextColor='rgba(255, 255, 255, 0.7)'
                        style={styles.searchInputStyle}
                        placeholder='Bitte geben Sie den Artikelnamen ein'
                        onChangeText={value => onChangeText(value)}
                        onEndEditing={() => onEndEditing()}
                    /> */}

                    <ScannerButton />
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#d10019',
        height: Platform.OS === 'ios' ? 44 : 56,
        flexDirection: 'row'
    },
    backStyle: {
        paddingHorizontal: 1,
        justifyContent: 'center',
        height: '100%'
    },
    searchInputStyle: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        // backgroundColor: '#d10019'
    },
    searchStory: {
        paddingHorizontal: 18
    },
    searchStoryTextHelper: {
        marginVertical: 20,
        color: '#a0a0a0',
        fontSize: 12
    },
    searchStoryItemImage: {
        height: 17,
        width: 17,
        resizeMode: 'contain',
        marginRight: 15
    },
    searchStoryItemText: {
        fontSize: 16,
        color: '#505050'
    },
    searchStoryItem: {
        marginBottom: 15,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    productsLine: {
        flexDirection: 'row',
        // marginTop: 6,
        // marginBottom: 30,        
        flexWrap: 'wrap'
    }
})