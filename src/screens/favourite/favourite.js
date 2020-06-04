import React, { Component } from 'react'

import { Text, View, ScrollView, Image } from 'react-native';

import { SearchButton } from '../../common/header-buttons';

import { getPreviewProductData } from '../../gets/productPosts';

import Loading from '../loading'

import { connect } from 'react-redux'

import { deleteAllFavourite } from '../../posts/favouritesPosts'

import { getUserFavourites } from '../../gets/userPosts';

import WhiteFooterButton from '../../common/white-footer-button';

import ProductListItem from '../../common/product-list-item';

class Favourite extends Component {

    static navigationOptions = {
        title: 'Wunschzettel',
        headerRight: (
            <View style={{flexDirection: 'row', marginRight: 9}}>
                <SearchButton />
            </View>
        )
    }

    state = {
        loaded: false,
        productIDs: [],
        products: []
    }

    componentDidMount() {
        getUserFavourites(this.props.userID).then(({productIDs}) => {
            this.setState({productIDs: productIDs, loaded: true})
            productIDs.map(id => {
                getPreviewProductData(id).then(product => {
                    console.log(product)
                    this.setState({products: [...this.state.products, {...product, id}]})
                })
            })
        })
    }

    clearFavourites() {
        deleteAllFavourite(this.props.userID)
        this.setState({productIDs: []})
    }

    deleteProduct(id) {
        const productIDs = this.state.productIDs
        const products = this.state.products
        const indexOfProduct = productIDs.indexOf(id)
        productIDs.splice(indexOfProduct,1)
        products.splice(indexOfProduct,1)
        this.setState({productIDs, products})
    }

    getProductsCards() {
        return this.state.products.map(({previewImgURL, productName, price, salePrice, id, rate, productSalePercent}) => {
            return (
                <ProductListItem 
                    key={id}
                    imageURL={previewImgURL}
                    name={productName}
                    price={price}
                    salePercent={productSalePercent ? productSalePercent.int : null}
                    salePrice={salePrice}
                    favourite
                    deleteAction={() => this.deleteProduct(id)}
                    id={id}
                    rate={rate}
                />
            )
        })
    }

    render() {
        console.log(this.state)
        if(!this.state.loaded) {
            return <Loading />
        }
        
        if(!this.state.productIDs || this.state.productIDs.length < 1) {
        // if(this.state.productIDs && this.state.productIDs.length < 1) {
            return (
                <View style={styles.noFavouritesContainer}>
                    <Image source={require('../../assets/message-icons/no-favourite.png')} style={styles.noFavouritesImage} />
                    <Text style={styles.noFavouritesText} >Sie haben noch keine Produkte auf Ihrer Wunschliste</Text>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.productsLine}>
                        {this.getProductsCards()}
                    </View>
                </ScrollView>
                <WhiteFooterButton text='löschen' onPress={() => this.clearFavourites()} />
            </View>
        )
    }
}

const mapStateToProps = ({userID}) => (
    {
        userID
    }
)

export default connect(mapStateToProps)(Favourite)

const styles = {
    productsLine: {
        flexDirection: 'row', 
        marginBottom: 18,
        flexWrap: 'wrap',
    },
    noFavouritesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noFavouritesImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    noFavouritesText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    }
}