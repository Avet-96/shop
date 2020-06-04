import React, { Component } from 'react';

import { Alert, Text, TouchableOpacity, TouchableHighlight, View, Image, Modal, StyleSheet } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { BoxShadow } from 'react-native-shadow'

import Toast from 'react-native-root-toast'

import ImageLoader from '../../helpers/image-loader';

import { connect } from 'react-redux'

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service'

import FooterButton from '../../common/footer-button';

import Loading from '../loading'

import Input from '../../common/input';

import ModalView from '../../common/modal-view';

import { getPreviewAsyncProductData, getPromocodeData } from '../../gets/productPosts';

import {
    addToCart,
    minusFromCart,
    deleteFromCart,
    clearCart
} from '../../functions/cart-funcs';

getStock = (stock, order, pcs) => {
    if (!order) {
        if (stock > 0) {
            return (
                <Text style={styles.cartItemInStock}>
                    Produkt ist verfügbar
                </Text>
            )
        }

        return (
            <Text style={styles.cartItemNotInStock}>
                nicht verfügbar
            </Text>
        )
    }
    return (
        <Text >
            {pcs} St.
        </Text>
    )
}

getCounter = (order, pcs, id, onMinus, onAdd) => {
    if (!order) {
        return (
            <><TouchableOpacity style={styles.minusPlusButton} onPress={() => onMinus(id)}>
                <Image source={require('../../assets/icons/036-minus.png')} style={styles.minusPlusButtonImage} key={'cartMinusItem'} />
            </TouchableOpacity>
                <Text style={styles.countText}>
                    {pcs}
                </Text>
                <TouchableOpacity style={styles.minusPlusButton} onPress={() => onAdd(id)}>
                    <Image source={require('../../assets/icons-color/035-more2.png')} style={styles.minusPlusButtonImage} key={'cartPlusItem'} />
                </TouchableOpacity></>
        )
    }
}

export const CartItem = ({ img, name, pcs, price, companyPrice, userType, stock, order, orderReturnReason, id, onAdd, onMinus, onDelete }) => {
    console.log('order, orderReturnReason', order, orderReturnReason)
    return (
        <TouchableOpacity style={styles.cartItemContainer} onPress={() => NavigationService.push('Product', { id, name })}>
            <View style={{ flexDirection: 'row' }}>
                {img ?
                    <View>
                        <ImageLoader style={styles.cartItemImage} source={{ uri: img }} key={img} />
                    </View>
                    :
                    <View>
                        <Image style={styles.cartItemImage} source={require('../../assets/message-icons/no-photo.png')} key={'no-image'} />
                    </View>
                }

                <View style={{ flex: 1 }}>
                    <Text style={styles.cartItemName} numberOfLines={2}>
                        {name}
                    </Text>
                    <View style={{ marginTop: 4, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            {getStock(stock, order, pcs)}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                {getCounter(order, pcs, id, onMinus, onAdd)}
                            </View>
                        </View>
                        <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
                            {userType && userType === 'H' ?
                                <>
                                    <Text style={styles.pricePerProduct}>{companyPrice} €\St</Text>
                                    <Text style={styles.price}>{(companyPrice * pcs).toFixed(2)} €</Text>
                                </>
                                :
                                <>
                                    <Text style={styles.pricePerProduct}>{price} €\St</Text>
                                    <Text style={styles.price}>{(price * pcs).toFixed(2)} €</Text>
                                </>
                            }
                        </View>
                    </View>
                    {orderReturnReason ?
                        <Text style={{ marginBottom: 5 }}>Grund für Rückgabe: {orderReturnReason}</Text>
                        : null
                    }
                </View>
                {
                    !order ?
                        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
                            <Image source={require('../../assets/icons/009-close.png')} style={styles.deleteButtonImage} key={'deleteFromCartButton'} />
                        </TouchableOpacity>
                        : null
                }

            </View>
        </TouchableOpacity>
    )
}

class Cart extends Component {

    state = {
        promocodeModalVisible: false,
        products: [],
        originalProductsPrice: 0,
        discountProductsPrice: 0,
        orderVAT: 0,
        fullPrice: 0,
        promocode: '',
        promocodeData: null,
        discountValue: 0,
        cartReceaved: false,
        modalVisible: false,

        routeName: 'Cart'
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    static navigationOptions = {
        title: 'Warenkorb',
        headerRight: (
            <TouchableOpacity onPress={() => { clearCart(); NavigationService.back() }} style={{ height: '100%', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 16, marginRight: 18 }}>löschen</Text>
            </TouchableOpacity>
        )
    }

    // shouldComponentUpdate(nextProps, { cartReceaved }) {
    //     console.log('shouldComponentUpdate `````````nextProps', nextProps);
    //     console.log('shouldComponentUpdate `````````cartReceaved', cartReceaved)
    //     if (cartReceaved == true) {
    //         this.setState({ cartReceaved: false })
    //         return true
    //     }
    //     return false
    // }

    componentDidMount() {
        if (!this.state.cartReceaved) {
            this.init()
        }
    }

    async componentWillReceiveProps(props) {
        if (this.state.cartReceaved == true) {
            await this.initAfterUpdate(props.cart)
            // setTimeout(() => { this.initAfterUpdate(); }, 5);
        }
    }


    init() {
        const cart = this.props.cart
        if (cart.length > 0 && !this.state.cartReceaved) { this.setState({ cartReceaved: true }) }
        cart.map(({ id, count }) => {
            getPreviewAsyncProductData(id).then(res => this.setState({ products: [...this.state.products, { ...res, id, count }] }))
        })
    }

    async initAfterUpdate(cart) {
        this.setState({ products: [] })
        cart.map(({ id, count }) => {
            getPreviewAsyncProductData(id).then(res => this.setState({ products: [...this.state.products, { ...res, id, count }] }))
        })
    }

    itemsAvailableCount() {
        // console.log(stock,count)
        const newProductsArray = this.state.products.map(product => {
            if (product.stock < product.count) {
                // const limitedStock = (productName, stock, count) => {
                //     this.productName = productName;
                //     this.stock = stock;
                //     this.count = count;
                // console.log('limitedStock',limitedStock.stock)
                // }

                // return (
                //     <Modal
                //         animationType="slide"
                //         transparent={false}
                //         visible={this.state.modalVisible}
                //         onRequestClose={() => {
                //             Alert.alert('Modal has been closed.');
                //         }}>
                //         <View style={{ marginTop: 22 }}>
                //             <View>
                //                 <Text>The quantity of this product exceeds the available:
                //     {product.productName} (available {product.stock} pcs)</Text>

                //                 <TouchableHighlight
                //                     onPress={() => {
                //                         this.setModalVisible(!this.state.modalVisible);
                //                     }}>
                //                     <Text>Hide Modal</Text>
                //                 </TouchableHighlight>
                //             </View>
                //         </View>
                //     </Modal>
                // )

                // Alert.alert(
                // `The quantity of ${product.productName} exceeds the available (${product.stock} pcs)`,
                // `The quantity of this product exceeds the available:`,
                // `${product.productName} (available ${product.stock} pcs)`,
                // [
                // {
                //     text: 'Nein',
                //     onPress: () => this.props.navigation.goBack(),

                //     style: 'cancel',
                // },
                // {
                //     text: 'Ja',
                //     onPress: async () => {
                //     }
                // }
                // ],
                // { cancelable: false }
                // )
            }
            //   console.log('newProductsArray',newProductsArray)  
            // console.table('product.stock', product.stock, product.count, product.productName)
        })
        return newProductsArray
    }

    addToCartAndState(id) {
        addToCart(id)
        // const productToAdd = this.state.products.find(product => product.id === id)
        // productToAdd.count++
        // const newProductsArray = this.state.products.map(product => {
        //     if (product.id === id) return productToAdd
        //     return product
        // })
        // this.setState({ products: newProductsArray })
    }
    minusFromCartAndState(id) {
        minusFromCart(id)
        // const productToMinus = this.state.products.find(product => product.id === id)
        // if (productToMinus.count === 1) {
        //     this.deleteFromCartAndState(id)
        // } else {
        //     productToMinus.count--
        //     const newProductsArray = this.state.products.map(product => {
        //         if (product.id === id) return productToMinus
        //         return product
        //     })
        //     this.setState({ products: newProductsArray })
        // }
    }
    deleteFromCartAndState(id) {
        deleteFromCart(id)
        console.log('delete trigger')
        const newProductsArray = this.state.products.filter(product => product.id !== id)
        this.setState({ products: newProductsArray })
    }

    getProductsCards() {
        return this.state.products.map(({ id, previewImgURL, productName, price, companyPrice, stock, count }) => {
            return (
                <CartItem
                    key={id}
                    id={id}
                    img={previewImgURL}
                    name={productName}
                    pcs={count}
                    price={price}
                    companyPrice={companyPrice}
                    userType={this.props.userInfo.selectedUserType}
                    stock={stock}
                    onAdd={id => this.addToCartAndState(id)}
                    onMinus={id => this.minusFromCartAndState(id)}
                    onDelete={id => this.deleteFromCartAndState(id)}
                />
            )
        })
    }

    isEmpty() {
        if (this.props.cart.length < 1) {
            return true
        }
        return false
    }

    setPrices() {
        const productsPrice = this.props.userInfo.selectedUserType === 'EK' ?
            this.state.products.reduce((sum, { price, count }) => {
                return sum + price * count
            }, 0)
            :
            this.state.products.reduce((sum, { companyPrice, count }) => {
                return sum + companyPrice * count
            }, 0)
        const productsVAT = this.state.products.reduce((sum, { price, companyPrice, count }) => {
            return sum + ((price - companyPrice) * count)
        }, 0)


        // const productsPrice = this.state.products.reduce((sum,{price, count}, asss) =>  {console.log('sds',asss); return sum+parseFloat(price)*count}, 0)
        const discountProductsPrice = this.getDiscount(productsPrice)
        if (productsPrice.toFixed(2) !== this.state.originalProductsPrice || discountProductsPrice !== this.state.discountProductsPrice) {
            this.setState({
                originalProductsPrice: productsPrice.toFixed(2),
                discountProductsPrice,
                discountValue: (productsPrice - discountProductsPrice).toFixed(2),
                orderVAT: productsVAT.toFixed(2)
            })
        }
    }

    getDiscount(price) {
        if (this.state.promocodeData) {
            const { percental, minimumcharge, value } = this.state.promocodeData
            if (minimumcharge > price) {
                alert('Der Gutscheincode kann nicht eingelöst werden, weil Ihr Warenkorb-Wert nicht ausreichend ist.')
                this.setState({ promocode: '', promocodeData: null, promocodeValue: 0, discountValue: 0 })
                return price.toFixed(2)
            }
            if (percental) {
                console.log('1', 1)
                console.log('percental', percental)
                console.log('(price - price / 100 * value).toFixed(2)', (price - price / 100 * value).toFixed(2))
                return (price - price / 100 * value).toFixed(2)
            }
            console.log(2)
            return (price - value).toFixed(2)
        }
        console.log(3)
        return price.toFixed(2)
    }

    handlePromocodeSubmit() {
        if (this.state.promocode.length < 1) {
            alert('Bitte geben Sie den Gutscheincode ein.')
            return
        }
        getPromocodeData(this.state.promocode).then(promocodeData => {
            console.log(promocodeData)
            if (promocodeData.status.code === 'success') {
                this.setState({ promocodeData })
            }
            Toast.show(promocodeData.status.text, {
                shadow: false,
                backgroundColor: '#505050'
            })
        })
    }

    getDiscountBlock() {
        if (this.state.promocodeData && this.state.discountValue) {
            return (
                <View style={styles.line}>
                    <Text style={styles.summaryText}>{this.state.promocodeData.description}:</Text>
                    <Text style={styles.summaryText}>-{this.state.discountValue} €</Text>
                </View>
            )
        }
    }

    render() {
        const shadowOpt = {
            width: sWidth,
            height: 50,
            color: "#000",
            border: 6,
            radius: 1,
            opacity: 0.1,
            x: 0,
            y: 0
        }
        if (this.isEmpty()) {
            return (
                <View style={styles.emptyCartContainer}>
                    <Image style={styles.emptyCartImage} source={require('../../assets/message-icons/cart-empty.png')} />
                    <Text style={styles.emptyCartText}>Ihr Warenkorb ist leer</Text>
                </View>
            )
        }
        if (this.state.products.length !== this.props.cart.length) {
            return <Loading />
        }
        this.setPrices()
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 18, marginTop: 22 }}>
                        {this.getProductsCards()}
                        <TouchableOpacity style={styles.promocodeButton} onPress={() => this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible })} >
                            <Text style={styles.promocodeButtonText}>
                                Promo-Code eingeben
                            </Text>
                        </TouchableOpacity>


                        <View style={styles.line}>
                            <Text style={styles.summaryText}>Cachback:</Text>
                            <Text style={styles.summaryText}>XX</Text>
                        </View>

                        {this.getDiscountBlock()}

                        <View style={styles.line}>
                            <Text style={styles.summaryText}>Summe:</Text>
                            <Text style={styles.summaryText}>{this.state.discountProductsPrice} €</Text>
                        </View>

                        <View style={styles.line}>
                            <Text style={styles.summaryText}>MwSt:</Text>
                            <Text style={styles.summaryText}>{this.state.orderVAT} €</Text>
                        </View>

                    </View>
                </ScrollView>
                <BoxShadow setting={shadowOpt}>
                    <View style={styles.footerSummaryContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={styles.summaryText} >Gesamtbetrag:</Text>
                            <Text style={styles.summaryText} >{this.state.discountProductsPrice} €</Text>
                        </View>
                    </View>
                </BoxShadow>

                <FooterButton text='Zur Kasse' onPress={() => {
                    console.log('this.props.userID',this);
                    
                    if (!this.props.userID || this.props.userID === "notloggedin") {
                        NavigationService.navigate('Login', {routeName: this.state.routeName})
                    }
                    else {
                        console.log(this.state.products);
                        // this.itemsAvailableCount();
                        // this.setModalVisible(true)
                        this.props.navigation.navigate('DeliveryService', { productsPrice: this.state.discountProductsPrice, data: this.state })
                    }
                }} />

                <ModalView
                    title='Promo-Code'
                    buttonText='Code einlösen'
                    onSubmit={() => {
                        this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible })
                        this.handlePromocodeSubmit()
                    }}
                    visible={this.state.promocodeModalVisible}
                    onRequestClose={() => { this.setState({ promocodeModalVisible: !this.state.promocodeModalVisible }) }}
                >
                    <Input placeholder='Promo-Code eingeben' value={this.state.promocode} onChangeText={promocode => this.setState({ promocode })} />
                </ModalView>

            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, userID, cart }) => ({ userInfo, userID, cart })

export default connect(mapStateToProps)(Cart)

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    emptyCartText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 19
    },
    summaryText: {
        color: '#040404',
        fontSize: 16
    },
    cartItemContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: 'rgba(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginBottom: 14,
        borderRadius: 5

    },
    cartItemImage: {
        margin: 10,
        height: 90,
        width: 80,
        resizeMode: 'contain'
    },
    cartItemName: {
        fontSize: 10,
        color: '#040404',
        lineHeight: 16,
        width: '80%',
        marginTop: 10
    },
    cartItemInStock: {
        fontSize: 10,
        color: '#3f911b'
    },
    cartItemNotInStock: {
        fontSize: 10,
        color: '#d10019'
    },
    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    deleteButtonImage: {
        margin: 12,
        width: 13,
        height: 13,
        resizeMode: 'contain'
    },
    minusPlusButton: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    minusPlusButtonImage: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    },
    countText: {
        fontSize: 12,
        color: '#000',
        marginHorizontal: 12
    },
    pricePerProduct: {
        fontSize: 12,
        color: '#a0a0a0',
        marginBottom: 6
    },
    price: {
        fontSize: 16,
        color: '#040404'
    },
    promocodeButton: {
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    promocodeButtonText: {
        fontSize: 16,
        color: '#030303'
    },
    footerSummaryContainer: {
        height: 50,
        paddingHorizontal: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
})