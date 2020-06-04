import React, { Component } from 'react';

import { View, Image, TextInput, TouchableOpacity, Text, SafeAreaView, Platform, ScrollView, StyleSheet, FlatList, ToastAndroid } from 'react-native';

import Toast from 'react-native-root-toast';

import FooterButton from '../../common/footer-button';

import NavigationService from '../../navigation-service';

import BackButton from '../../common/header-buttons/back-button';

import AsyncStorage from '@react-native-community/async-storage';

import ScannerButton from '../../common/header-buttons/scanner-button';

import { getSearchResult } from '../../gets/productsListPost';

import { getPreviewProductData } from '../../gets/productPosts';

import Loading from '../loading'

import FilterButton from '../../common/filter-button';

import ProductListItem from '../../common/product-list-item';

import { connect } from 'react-redux';

import { SearchBar } from "react-native-elements";

import { sWidth } from '../../helpers/screenSize';

//import SearchHeader from './SearchHeader';

// const CustomHeader = ({ value, updateSearch, syka, onEndEditing }) => {
const CustomHeader = ({ value, onChangeText, onEndEditing }) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#d1D0019' }}>
            <View style={styles.headerStyle}>
                <TouchableOpacity style={styles.backStyle} onPress={() => NavigationService.back()}>
                    <BackButton />
                </TouchableOpacity>
                {/* <SearchBar
                    autoFocus
                    lightTheme
                    value={value}
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    containerStyle={{ width: sWidth - 90, backgroundColor: '#d10019' }}
                    leftIconContainerStyle={{ width: 0, backgroundColor: '#d10019' }}
                    rightIconContainerStyle={{ width: 0, backgroundColor: '#d10019' }}
                    containerStyle={{ width: sWidth - 90 }}
                    inputStyle={styles.searchInputStyle}
                    placeholder='Bitte geben Sie den Artikelnamen ein'
                    //onChangeText={value => onChangeText(value)}
                    onChangeText={text => updateSearch(text)}
                    onEndEditing={() => onEndEditing()}
                /> */}
                <TextInput
                    autoFocus
                    value={value}
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    style={styles.searchInputStyle}
                    placeholder='Bitte geben Sie den Artikelnamen ein'
                    onChangeText={value => onChangeText(value)}
                    onEndEditing={() => onEndEditing()}
                />
                <ScannerButton />
            </View>
        </SafeAreaView>
    )
}

const updateSearch1 = value => {
    return value
}

const SearchStoryItem = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.searchStoryItem} onPress={() => onPress()}>
            <Image style={styles.searchStoryItemImage} source={require('../../assets/icons/006-search.png')} key={'searchImageInput'} />
            <Text style={styles.searchStoryItemText} >{text}</Text>
        </TouchableOpacity>
    )
}


class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        // console.log(" navigation.getParam++++++++", navigation.getParam('searchText', ''));        
        return ({
            header: (
                <CustomHeader
                    value={params.searchText}
                    // updateSearch={value => params.onChangeSearch(value)}
                    onChangeText={value => params.onChangeSearch(value)}
                    // syka={navigation.getParam('SearchText', '')}
                    onEndEditing={() => {
                        if (params.searchText)
                            params.onSubmit()
                    }}
                />
            )
        })
    }

    state = {
        showResult: false,
        originalIDs: [],
        products: [],
        from: 0,
        minPrice: 0,
        maxPrice: 0,
        fromPrice: 0,
        toPrice: 0,
        sortBy: '',
        loaded: false,
        searchText: '',
        searchStory: [],
    }

    handleSearchSubmit() {
        try {
            AsyncStorage.getItem('searchStory').then(res => {
                if (!res) {
                    AsyncStorage.setItem("searchStory", JSON.stringify([]))
                    this.handleSearchSubmit()
                } else {
                    const story = JSON.parse(res)
                    if (story.length > 4) story.pop()
                    story.unshift(this.state.searchText)
                    AsyncStorage.setItem('searchStory', JSON.stringify(story))
                }

            })
        }
        catch (e) {
            console.warn(e)
        }
    }

    componentWillReceiveProps() {
        const searchFromProps = this.props.navigation.getParam('searchText', '')
        if (searchFromProps.length >= 4) {
            this.setState({ showResult: true })
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', (route) => {
            const filterOptions = this.props.navigation.getParam('filterOptions', null)
            if (filterOptions) {
                const { from, to, sortBy } = filterOptions
                if (from !== this.state.fromPrice || to !== this.state.toPrice || sortBy !== this.state.sortBy) {
                    this.getIDs(this.state.ids, from, to, sortBy)
                }
            }
        });
        AsyncStorage.getItem('searchStory').then(searchStory => {
            this.setState({ searchStory: JSON.parse(searchStory) })
        })

        this.props.navigation.setParams({
            searchText: this.state.searchText,
            onChangeSearch: value => this.onSearchChange(value),
            onSubmit: () => this.handleSearchSubmit()
        })
        if (this.state.searchText.length >= 4) {
            this.setState({ showResult: true })
        }
    }

    onSearchChange(searchText) {
        this.setState({ searchText })
        this.props.navigation.setParams({ searchText })
        this.setState({ showResult: searchText.length >= 4 })
        if (searchText.length >= 4) {
            this.setState({ loaded: false, products: [], from: 0, ids: [], })
            this.getProductsIDs(searchText)
        }
    }
    getProductsIDs(searchText) {
        var result = [];
        getSearchResult(searchText)
            .then(res => {
                if (res.searchResult.length > 0) {
                    let searchString = searchText.toLowerCase().trim();
                    let ResponseServer = res.searchResult;
                    ResponseServer.filter((a) => {
                        if (a.name.toLowerCase().indexOf(searchString) != -1) result.push(a);
                    })
                    //this.getIDs(res.searchResult)
                    this.getIDs(result)
                }
                else this.showToastNoSearch()
            })
    }

    findMinMaxPrice() {
        if (this.props.userInfo.selectedUserType === 'EK') {
            const prices = this.state.originalIDs.map(({ price }) => price)
            const maxPrice = Math.max(...prices)
            const minPrice = Math.min(...prices)
            this.setState({ minPrice, maxPrice, fromPrice: minPrice, toPrice: maxPrice })
            this.getData(0)
        } else {
            const companyPrice = this.state.originalIDs.map(({ companyPrice }) => companyPrice.toFixed(2));
            const maxPrice = Math.max(...companyPrice)
            const minPrice = Math.min(...companyPrice)
            this.setState({ minPrice, maxPrice, fromPrice: minPrice, toPrice: maxPrice })
            this.getData(0)
        }
    }

    getIDs(ids, fromPrice, toPrice, sortBy) {
        if (fromPrice == 0 || toPrice == 0) {
            ToastAndroid.showWithGravity(
                "Prijs kan niet 0 zijn",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
        if (fromPrice && toPrice) {
            this.setState({ fromPrice, toPrice, sortBy })
            const filtered = this.state.originalIDs.filter(({ price }) => price >= fromPrice && price <= toPrice)
            let sorted = [];
            if (sortBy.length != 0) {
                switch (sortBy) {
                    case 'popular':
                        sorted = filtered.sort((first, second) => (first.popularity > second.popularity) ? -1 : ((second.popularity > first.popularity) ? 1 : 0))
                        break
                    case 'alphabet':
                        sorted = filtered.sort((first, second) => (first.name > second.name) ? 1 : ((second.name > first.name) ? -1 : 0))
                        break
                    case 'price_down':
                        sorted = filtered.sort((first, second) => (first.price > second.price) ? -1 : ((second.price > first.price) ? 1 : 0))
                        break
                    case 'price_up':
                        sorted = filtered.sort((first, second) => (first.price < second.price) ? -1 : ((second.price < first.price) ? 1 : 0))
                        break
                    default: break
                }
            } else {
                sorted = filtered
            }
            new Promise((resolve) => {
                this.setState({ filteredIDs: sorted, products: [], from: 0 });
                setTimeout(() => resolve(), 200)
            })
                .then(() =>
                    this.getData(0, sortBy))
        } else {
            this.setState({ originalIDs: ids, filteredIDs: ids, loaded: true, })
            this.findMinMaxPrice()

        }
    }

    getData(from) {
        this.setState({ from })
        this.state.filteredIDs.filter(({ productID }, key) => {
            if (key >= from && key < (from + 12)) {
                getPreviewProductData(productID)
                    .then(res => {
                        const isProductContainInList = this.state.filteredIDs.find((product) => product.productID === productID)
                        const isProductAlreadyShows = this.state.products.find((product) => product.productID === productID)
                        if (isProductContainInList && !isProductAlreadyShows) {
                            this.setState({ products: [...this.state.products, { ...res, id: productID }] })
                        }
                    })
                    .catch(e => console.log(productID, e))
            }
        })
        if (!this.state.products && !this.state.filteredIDs) {
            this.showToast();
        }
    }


    getSearchStory() {
        if (this.state.searchStory && this.state.searchStory.length > 0) {
            return (
                <View style={styles.searchStory}>
                    <Text style={styles.searchStoryTextHelper}> Suche </Text>
                    {this.state.searchStory.map((searchItem, index) => (
                        <SearchStoryItem onPress={() => this.onSearchChange(searchItem)} text={searchItem} key={index} />
                    ))}
                </View>
            )
        }
        return null
    }

    showToastNoSearch() {
        ToastAndroid.showWithGravity(
            "Nichts gefunden",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
        this.setState({ loaded: false })
    }


    showToast() {
        ToastAndroid.showWithGravity(
            "Nicht verfügbar",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
    }

    renderHelper() {
        if (!this.state.showResult) {
            return this.getSearchStory()
        }
        if (!this.state.loaded || this.state.products.length < 1) return <Loading />

        const { minPrice, maxPrice, fromPrice, toPrice, sortBy } = this.state
        let sorted = [];
        if (this.props.userInfo.selectedUserType == 'H') {
            switch (sortBy) {
                case 'popular':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.popularity) > parseFloat(second.popularity)) ? -1 : ((parseFloat(second.popularity) > parseFloat(first.popularity)) ? 1 : 0))
                    break
                case 'alphabet':
                    sorted = this.state.products.sort((first, second) => (first.name > second.name) ? 1 : ((second.name > first.name) ? -1 : 0))
                    break
                case 'price_down':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.companyPrice) > parseFloat(second.companyPrice)) ? -1 : ((parseFloat(second.companyPrice) > parseFloat(first.companyPrice)) ? 1 : 0))
                    break
                case 'price_up':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.companyPrice) < parseFloat(second.companyPrice)) ? -1 : ((parseFloat(second.pcompanyPricerice) < parseFloat(first.companyPrice)) ? 1 : 0))
                    break
                default: break
            }
        } else {
            switch (sortBy) {
                case 'popular':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.popularity) > parseFloat(second.popularity)) ? -1 : ((parseFloat(second.popularity) > parseFloat(first.popularity)) ? 1 : 0))
                    break
                case 'alphabet':
                    sorted = this.state.products.sort((first, second) => (first.name > second.name) ? 1 : ((second.name > first.name) ? -1 : 0))
                    break
                case 'price_down':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.price) > parseFloat(second.price)) ? -1 : ((parseFloat(second.price) > parseFloat(first.price)) ? 1 : 0))
                    break
                case 'price_up':
                    sorted = this.state.products.sort((first, second) => (parseFloat(first.price) < parseFloat(second.price)) ? -1 : ((parseFloat(second.price) < parseFloat(first.price)) ? 1 : 0))
                    break
                default: break
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.productsLine}>
                    <FlatList
                        data={!sorted.length ? this.state.products : sorted}
                        renderItem={({ item }) => {
                            const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, id } = item
                            return (
                                <View style={{ paddingBottom: 8 }}>
                                    <ProductListItem
                                        name={productName}
                                        //price={this.props.price}
                                        price={this.props.userInfo.selectedUserType === 'EK' ? price.toFixed(2) : companyPrice.toFixed(2)}
                                        // salePrice={'UVP ' + salePrice.toFixed(2)}
                                        salePrice={salePrice != 0 ? 'UVP ' + salePrice.toFixed(2): ''}
                                        companyPrice={companyPrice.toFixed(2)}
                                        rate={rate}
                                        stock={stock}
                                        id={id}
                                        imageURL={previewImgURL}
                                        salePercent={productSalePercent ? productSalePercent.int : null}
                                    />
                                </View>
                            )
                        }}
                        columnWrapperStyle={{ flexWrap: 'wrap' }}
                        numColumns={4}
                        ListHeaderComponent={
                            this.state.products.length !== 0 ?
                                <FilterButton minPrice={minPrice} maxPrice={maxPrice} fromPrice={fromPrice} toPrice={toPrice} sortBy={sortBy} />
                                : null
                        }
                        ListFooterComponent={this.state.filteredIDs.length > this.state.products.length && (this.state.from + 12 === this.state.products.length) ? <FooterButton text='Weitere Produkte' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                        initialNumToRender={3}
                        windowSize={2}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View >
        )
    }

    render() {
        return this.renderHelper()
    }
}

const mapStateToProps = ({ userInfo, cart }) => ({ userInfo, cart })

export default connect(mapStateToProps)(Search)

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