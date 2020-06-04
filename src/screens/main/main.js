'use strict'
import React, { Component } from 'react'
import { Dimensions, Text, View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'

import { sWidth, sHeight } from '../../helpers/screenSize';

import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import {
    getBannerImage,
    // getBrandsList, 
    getNewestList,
    getOffersList,
    getPopularCategories
} from '../../gets/mainPagePosts';

import ImageLoader from '../../helpers/image-loader';

import CategoryWithImageItem from '../../common/category-with-image-item';
import NewestListItem from '../../common/newest-list';
import OffersListItem from '../../common/offers-list';
// import BrandListItem from '../../common/brand-list-item';
import BannerImage from '../../common/banner-image';

import { sendToken } from '../../posts/authPosts'
import Loading from '../loading';
import { MenuButton, SearchButton } from '../../common/header-buttons';
import { getUserInfo } from '../../gets/userPosts';

class Main extends Component {
    static navigationOptions = {
        //title: 'Startseite',
        headerLeft: (
            <>
                <MenuButton />
                <Image style={{ width: 60, height: 30, resizeMode: 'contain' }} source={require('../../assets/teleropa-logo.png')} key={'menuTeleropaLogo'} />
            </>
        ),
        headerRight: (
            <View style={{ flexDirection: 'row', marginRight: 9 }}>
                <SearchButton />
            </View>
        )
    }

    state = {
        brands: null,
        imageRatio: sHeight / 3,
        image: null
    }
    constructor(props) {
        super(props)
    }



    componentDidMount() {
        this.getTokenFromStorage()
        // getBrandsList()
        getNewestList()
        getOffersList()
        getPopularCategories()
        getBannerImage()
        // .then(image => Image.getSize(image, (w, h) => {
        //     this.setImageSize(w, h);
        //     this.setState({ image });
        // }))
    }

    setImageSize(width, height) {
        this.setState({ imageRatio: sWidth / (width / height) })
    }

    getBanner() {
        // console.log('topbanner', this.props.mainPage.topbanner);
        if (this.props.mainPage.topbanner.url)
            return <BannerImage
                key={this.props.mainPage.topbanner.url}
                title={this.props.mainPage.topbanner.title}
                subtitle={this.props.mainPage.topbanner.subtitle}
                text_1={this.props.mainPage.topbanner.text_1}
                text_2={this.props.mainPage.topbanner.text_2}
                list_text_1={this.props.mainPage.topbanner.list_text_1}
                list_text_2={this.props.mainPage.topbanner.list_text_2}
                list_text_3={this.props.mainPage.topbanner.list_text_3}
                list_text_4={this.props.mainPage.topbanner.list_text_4}
                logo={this.props.mainPage.topbanner.logo}
                url={this.props.mainPage.topbanner.url}
                price={this.props.mainPage.topbanner.price}
                companyPrice={this.props.mainPage.topbanner.companyPrice}
                background_color={this.props.mainPage.topbanner.background_color}
                text_color={this.props.mainPage.topbanner.text_color}
                product_image={this.props.mainPage.topbanner.product_image}
                background_image={this.props.mainPage.topbanner.background_image}
                position={this.props.mainPage.topbanner.position}
            />
    }

    getCategoriesCards() {
        return this.props.mainPage.categories.map(({ categoryName, categoryImageURL, categoryID }) => {
            if (categoryImageURL) return <CategoryWithImageItem key={categoryID} id={categoryID} text={categoryName} image={{ uri: categoryImageURL }} userInfo={this.props.userInfo} />
        })
    }

    getNewest() {
        // console.log('this.props.newest', this.props.mainPage)
        // if (this.props.mainPage.newest)
        return this.props.mainPage.newest.products.filter(({ productID, productName, previewImgURL, price, companyPrice }) => {
            if (previewImgURL) return <NewestListItem key={productID} id={productID} text={productName} image={{ uri: previewImgURL }} price={price} companyPrice={companyPrice} />
        })
    }

    getOffers() {
        // if (this.props.mainPage.offers)
        return this.props.mainPage.offers.products.filter(({ productID, productName, previewImgURL, price, companyPrice, pseudoprice }) => {
            return <OffersListItem key={productID} id={productID} text={productName} image={{ uri: previewImgURL }} price={price} companyPrice={companyPrice} salePrice={pseudoprice} />
        })
    }

    // getBrands() {
    //     const brands = this.props.mainPage.brands.filter((val, index) => {
    //         if (val.imgURL && val.supplierID) {
    //             return val
    //         }
    //     })
    //     return brands
    // }


    async getTokenFromStorage() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        this.setState({ fcmToken })
    }

    send() {
        console.log('Triggered')
        sendToken(this.state.fcmToken)
    }

    render() {
        if (
            !this.props.mainPage.categories ||
            // !this.props.mainPage.brands || 
            !this.props.mainPage.topbanner ||
            !this.props.mainPage.newest ||
            !this.props.mainPage.offers
        ) {
            return <Loading />
        }

        const image = require('../../assets/icons-color/008-check2.png');
        return (
            <View style={{ flex: 1 }} >
                <ScrollView>
                    <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
                        <View style={styles.topContainer}>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Kostenloser Hin- und Rückversand ab 40 EUR*</Text>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Tagesaktuelle Preise</Text>
                            <Image source={image} style={styles.topImage} />
                            <Text style={styles.topText}>Tagesaktuelle Preise</Text>
                        </View>
                    </ScrollView>

                    {this.getBanner()}

                    <Text style={styles.helperText}>
                    Unsere Kategorien
                    </Text>
                    <View style={{ flexDirection: 'row', marginLeft: 18, flexWrap: 'wrap' }}>
                        {this.getCategoriesCards()}
                    </View>

                    <Text style={styles.helperText}>
                        Aktuelle Angebote
                    </Text>
                    <View style={{ flexDirection: 'row', height: 160, flexWrap: 'wrap' }} >
                        <FlatList
                            horizontal
                            data={this.getOffers()}
                            renderItem={({ item }) => {
                                return <OffersListItem key={item.productID} id={item.productID} text={item.productName} image={{ uri: item.previewImgURL }} price={item.price} companyPrice={item.companyPrice} salePrice={item.pseudoprice} />
                            }}
                            keyExtractor={item => item.productName}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    <Text style={styles.helperText}>
                        Unsere Neuheiten
                    </Text>
                    <View style={{ flexDirection: 'row', height: 170, flexWrap: 'wrap' }} >
                        <FlatList
                            horizontal
                            data={this.getNewest()}
                            renderItem={({ item }) => {
                                return <NewestListItem key={item.productID} id={item.productID} text={item.productName} image={{ uri: item.previewImgURL }} price={item.price} companyPrice={item.companyPrice} />
                            }}
                            keyExtractor={item => item.productName}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    {/* <View style={{ height: 100 }} >
                        <FlatList
                            horizontal
                            data={this.getBrands()}
                            renderItem={({ item }) => {
                                return <BrandListItem brand={item.title} image={{ uri: item.imgURL }} id={item.supplierID} userInfo={this.props.userInfo} />
                            }}
                            keyExtractor={item => item.title}
                            initialNumToRender={3}
                            windowSize={2}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View> */}

                    {/* <View style={{ paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', width: '100%' }} >
                        <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Subscribe')}>
                            <Text style={styles.bottomButtonText}>
                                Newsletter anmelden
                            </Text>
                        </TouchableOpacity>
                    </View> */}
                </ScrollView>
            </View>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        mainPage: state.mainPage,
        userInfo: state.userInfo
    }
}



export default connect(mapStateToProps)(Main);

const styles = {
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 42,
        paddingLeft: 17,
        paddingRight: 3
    },
    topImage: {
        width: 17,
        // height: 17,
        resizeMode: 'contain'
    },
    topText: {
        marginLeft: 6,
        marginRight: 14,
        fontSize: 16,
        color: '#030303'
    },
    promoImage: {
        // backgroundColor: '#D1001A',
        resizeMode: 'contain',
        // flex: 1,
        height: 170,
        width: '100%'
    },
    helperText: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 0,
        color: '#030303',
        marginLeft: 18,
        fontFamily: 'Poppins-Light'
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginHorizontal: 18,
        height: 40,
        maxWidth: 330,
        borderRadius: 5,
        marginBottom: 21,
        borderWidth: 0.3,
        borderColor: '#d10019'
    },
    bottomButtonText: {
        color: '#d10019',
        fontSize: 16
    }
}