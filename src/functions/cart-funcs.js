import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-root-toast';
import { store } from '../app/app'

import { setCart } from '../actions/cart-actions'

export async function getCart() {
    return await AsyncStorage.getItem('Cart')

}

export async function addToCart(id) {
    try {
        await AsyncStorage.getItem('Cart', (err, res) => {
            if (!res) {
                AsyncStorage.setItem("Cart", JSON.stringify([]))
                addToCart(id);
            }
            else {
                const cart = JSON.parse(res)
                const productInCart = cart.find(product => id === product.id) //searching if item already contain in cart
                if (productInCart) {
                    productInCart.count++
                    const newCart = cart.map(product => {
                        if (product.id === id) {
                            return productInCart
                        }
                        return product
                    })
                    store.dispatch(setCart(newCart))
                    AsyncStorage.setItem('Cart', JSON.stringify(newCart))                                                      
                } else {
                    const newProduct = {
                        id, count: 1
                    }
                    cart.push(newProduct)
                    store.dispatch(setCart(cart))
                    AsyncStorage.setItem('Cart', JSON.stringify(cart))
                }
                Toast.show('Artikel wurde in den Warenkorb gelegt', {
                    shadow: false,
                    backgroundColor: '#505050',
                    duration: 1500 //время которое будет отображаться тост при добавлении товара в корзину
                })
            }
        })
    }
    catch (e) {
        console.warn(e)
    }

}

export async function minusFromCart(id) {
    try {
        await AsyncStorage.getItem('Cart', (err, res) => {
            const cart = JSON.parse(res)
            const productInCart = cart.find(product => id === product.id) //searching item in cart
            if (productInCart.count === 1) {
                deleteFromCart(id)
            } else {
                productInCart.count--
                const newCart = cart.map(product => {
                    if (product.id === id) {
                        return productInCart
                    }
                    return product
                })
                store.dispatch(setCart(newCart))

                AsyncStorage.setItem('Cart', JSON.stringify(newCart))
            }
        })
    }
    catch (e) {
        console.warn(e)
    }
}

export async function deleteFromCart(id) {
    try {
        await AsyncStorage.getItem('Cart', (err, res) => {
            const cart = JSON.parse(res)
            const newCart = cart.filter(product => product.id !== id)
            store.dispatch(setCart(newCart))
            AsyncStorage.setItem('Cart', JSON.stringify(newCart))
        })
    }
    catch (e) {
        console.warn(e)
    }
}

export async function clearCart() {
    store.dispatch(setCart([]))
    await AsyncStorage.setItem("Cart", JSON.stringify([]))
}