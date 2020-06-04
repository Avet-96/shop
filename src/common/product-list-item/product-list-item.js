import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native';

import ImageLoader from '../../helpers/image-loader';

import { connect } from 'react-redux'

import { addToFavourite, deleteFavourite } from '../../posts/favouritesPosts'

import { addToCart } from '../../functions/cart-funcs';

import Rating from '../rating';

import NavigationService from '../../navigation-service';

import { sWidth } from '../../helpers/screenSize';

function ProductListItem({ imageURL, name, price, salePrice, favourite, id, stock, rate, salePercent, userID, deleteAction, companyPrice, ...props }) {
    getStock = () => {
        if (stock > 0) {
            return (
                <Text style={styles.inStock}>
                    Produkt ist verfügbar
                </Text>
            )
        }
        return (
            <Text style={[styles.inStock, { color: '#d10019' }]}>
                Nicht verfügbar
            </Text>
        )
    }

    getFavButton = (productID) => {
        if (userID !== 'notloggedin' && userID) {
            if (favourite) {
                return (
                    <TouchableOpacity onPress={() => { deleteFavourite(userID, id); deleteAction() }} style={styles.favButton}>
                        <Image source={require('../../assets/icons-color/009-close-white.png')} style={styles.favDelButtonIcon} key={'deleteButton'} />
                    </TouchableOpacity>
                )
            }
            return (
                <TouchableOpacity onPress={() => addToFavourite(userID, id)} style={styles.favButton}>
                    <Image source={require('../../assets/icons-color/004-heart-white.png')} style={styles.favButtonIcon} key={'favouriteButton'} />
                </TouchableOpacity>
            )
        }
    }

    getPrice = () => {        
        const showingPrice = props.userInfo.selectedUserType === 'EK' ? price : companyPrice
        if (salePrice != '0' && salePrice) {
            return (
                <>
                    <Text style={styles.prevPrice}>
                        {salePrice}<Text style={{ fontSize: 10 }}>€</Text>
                    </Text>
                    <Text style={styles.salePrice}>
                        {showingPrice}<Text style={{ fontSize: 16 }}>€</Text>
                    </Text>
                </>
            )
        }
        return (
            <>
                <Text style={styles.prevPrice}>
                    <Text style={{ fontSize: 10 }}></Text>
                </Text>

                <Text style={styles.price}>
                    {showingPrice}<Text style={{ fontSize: 16 }}>€</Text>
                </Text>
            </>
        )
    }

    getSalePercentBlock = () => {
        if (salePercent) {
            return (
                <View style={styles.salePercentContainer}>
                    <Text style={styles.salePercentText}>
                        {salePercent}%
                    </Text>
                </View>
            )
        }
    }

    getCartButton = () => {
        if (stock > 0) {
            return (
                <TouchableOpacity
                    style={[styles.cartButton, { backgroundColor: '#3f911b' }]}
                    onPress={() => addToCart(id)}
                >
                    <Image style={{ width: 22, height: 18, resizeMode: 'contain' }} source={require('../../assets/icons-color/002-shopping2.png')} key={'cart'} />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity
                style={[styles.cartButton, { opacity: .4 }]}
            // onPress={() => addToCart(id)}
            >
                {/* <Image style={{width: 22, height: 18, resizeMode: 'contain'}} source={require('../../assets/icons-color/002-shopping-cart-green.png')} key={'cart'} /> */}
                <Text>Nicht verfügbar</Text>
            </TouchableOpacity>
        )
    }

    getImage = () => {
        if (!imageURL) {
            return (
                <ImageLoader source={require('../../assets/message-icons/no-photo.png')} style={styles.productImage} imageStyle={styles.productImage} key={'no-photo'}>
                    {this.getSalePercentBlock()}
                </ImageLoader>)
        }
        return (
            <ImageLoader source={{ uri: imageURL }} style={styles.productImage} imageStyle={styles.productImage} key={imageURL}>
                {this.getSalePercentBlock()}
            </ImageLoader>)
    }

    return (
        <TouchableOpacity style={styles.productContainer} onPress={() => NavigationService.push('Product', { id: id, name: name })} >
            <View style={{ flex: 1 }}>             
                {this.getImage()}
            </View>
            {getFavButton()}
            <Text style={styles.name} numberOfLines={2} >{name}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 13, flexWrap: 'wrap' }}>
                {getStock()}
                <Text style={styles.id}>
                    Artikelnummer: {id}
                </Text>
            </View>

            {getPrice()}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: 18, marginTop: 12 }}>
                <Rating rating={rate} />
                {this.getCartButton()}
            </View>

        </TouchableOpacity>
    )
}

// const width = Dimensions.get('window').width > 600 ? (Dimensions.get('window').width - 72)/3 > 0 ? alert(12) : alert(123) : (Dimensions.get('window').width - 54)/2 
const width = sWidth > 600 ? sWidth > 900 ? (sWidth - 90) / 4 : (sWidth - 72) / 3 : (sWidth - 54) / 2

const styles = {
    productContainer: {
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        width: width,
        marginTop: 18,
        marginLeft: 18
    },
    salePercentContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 45,
        height: 22,
        borderRadius: 5,
        backgroundColor: '#d10019',
        justifyContent: 'center',
        alignItems: 'center'
    },
    salePercentText: {
        color: '#fff',
        fontSize: 12
    },
    productImage: {
        width: '100%',
        height: 110,
        resizeMode: 'contain'
    },
    favButton: {
        position: 'absolute',
        top: 5,
        right: 9,
        backgroundColor: 'rgba(209, 0, 25, 0.851)',
        width: 27,
        height: 27,
        borderRadius: 13.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    favDelButtonIcon: {
        width: 12,
        height: 12,
        resizeMode: 'contain'
    },
    favButtonIcon: {
        width: 20,
        height: 19,
        resizeMode: 'contain'
    },
    name: {
        marginTop: 5,
        height: 32,
        lineHeight: 14,
        fontSize: 12,
        color: '#040404'
    },
    inStock: {
        fontSize: 10,
        color: '#3f911b',
        margin: 0,
        padding: 0
    },
    id: {
        fontSize: 10,
        color: '#505050'
    },
    prevPrice: {
        textDecorationLine: 'line-through',
        marginTop: 6,
        fontSize: 12,
        height: 14,
        color: '#a0a0a0'
    },
    salePrice: {
        padding: 0,
        fontSize: 20,
        color: '#d10019'
    },
    price: {
        padding: 0,
        fontSize: 20,
        color: '#010101'
    },
    cartButton: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderColor: '#3f911b',
        minWidth: 70,
        borderWidth: 1,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const mapStateToProps = ({ userID, userInfo }) => (
    { userID, userInfo }
)

export default connect(mapStateToProps)(ProductListItem)