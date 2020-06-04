export const setCart = (cart) => {
    console.log('cart setCart in cart-action', cart)
    return {
        type: 'SET_CART',
        payload: cart
    }
}