import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, ToastAndroid} from 'react-native';
import {WebView} from 'react-native-webview';
import base64 from 'react-native-base64'

import Loading from '../loading'
import {addToCart, minusFromCart, deleteFromCart, clearCart} from '../../functions/cart-funcs'

export class WebPayPal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // modalVisible: true,
            // res: '',
            count: true,
            access_token: "",
            approvalUrl: null,
            url: false,
            id: '',
            loading: false,
            paymentId: '',
            cart: this.props.navigation.getParam('CartData'),
            name: this.props.userInfo.name,
            surname: this.props.userInfo.surname,
            phone: this.props.userInfo.phone,
            country: this.props.userInfo.country,
            street: this.props.userInfo.street,
            city: this.props.userInfo.city,
            post: this.props.userInfo.post,

            realAccount: true
        }
    }

    async componentDidMount() {
        const sandboxClientId = 'Aa30wKqF5Jq5epDJ7wPnGLYBBnhtp4i8t91Qb0PNW7o82k-cQYoFp9t_4ujkCU84D27ke16unohfm3XX';
        const sandboxSecret = 'EPBftFl3oHshi5rBEYudrbsCho_aqm1-ynQYkJbW3T0z3APbEt4g76lI01EZs_zLnYexSWScCIU7Ex6K';
        const paypalClientId = 'AcIGgF0XrYF4her0z9zSlXCuUnqEDazkaM0DDU5emhhp70UggARzDbd5LW1yQhr8qEaV2Q7r-AmK3bHH';
        const paypalSecret = 'EHN2OcacoZFk8823hZ_oWXHoI_T-SmtDcs2XklW07F0Lwd57Tjjs9C63hdz_5woXimmEenYveCY2zMtF';
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = (productsPrice + deliveryPrice).toFixed(2);

        console.log("productsPrice", productsPrice)
        console.log("deliveryPrice", deliveryPrice)
        console.log("total", total)

        // const productsQuantity = this.state.cart.products.reduce((sum, { count }) => {
        //     return sum + count
        // }, 0)

        // const deliveryId = this.state.cart.deliveryData.services.find(item => item.id == this.state.cart.deliveryData.selected);
        // const deliveryService = deliveryId.name;

        const username = this.state.realAccount ? paypalClientId : sandboxClientId;
        const password = this.state.realAccount ? paypalSecret : sandboxSecret;
        const token = base64.encode(`${username}:${password}`);
        try {


            // fetch(this.state.realAccount ? 'https://api.paypal.com/v1/payment-experience/webprofiles' : 'https://api.sandbox.paypal.com/v1/payment-experience/webprofiles', {
            //     method: 'POST',
            //     'Authorization': {
            //         'TYPE': 'Basic Auth',
            //         // 'brand_name': 'Teleropa',
            //         // 'logo_image':
            //     },
            //     headers: {
            //         // 'Authorization': 'Basic ' + `${token}`,
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     // body: "grant_type=client_credentials"
            // })
            // .then(response => {
            //     return response.json()
            // })
            // .then(response => {
            //     console.log("response webprofiles", response)
            // })


            fetch(this.state.realAccount ? 'https://api.paypal.com/v1/oauth2/token' : 'https://api.sandbox.paypal.com/v1/oauth2/token', {
                method: 'POST',
                'Authorization': {
                    'TYPE': 'Basic Auth',
                    'Username': `${username}`
                },
                headers: {
                    'Authorization': 'Basic ' + `${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: "grant_type=client_credentials"
            })
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    console.log("Authorization", response)
                    this.setState({
                        access_token: response.access_token
                    })
                    return response.access_token
                })
                .then(access_token => {
                    let paypalPaymentObj =
                        {
                            "intent": "sale",
                            "payer": {
                                "payment_method": "paypal"
                            },
                            "transactions": [
                                {
                                    "amount": {
                                        "total": total,
                                        "currency": "EUR",
                                        "details": {
                                            "subtotal": productsPrice,
                                            "shipping": deliveryPrice,
                                            "tax": "0.00",
                                        }
                                    },
                                    "payee": {
                                        "merchant_id": "H27E4ZBRUN5MC",
                                        "email": "sb-ah39j1514672@business.example.com"
                                    },
                                    "payment_options": {
                                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                                    },
                                    "item_list": {
                                        "items": this.state.cart.products.map(product => {
                                            return {
                                                "name": product.productName,
                                                "quantity": product.count,
                                                "price": product.companyPrice,
                                                "currency": 'EUR'
                                            }
                                        }),
                                    }
                                }
                            ],
                            "note_to_payer": "Contact us for any questions on your order.",
                            "redirect_urls": {
                                "return_url": "/checkout/review",
                                "cancel_url": "https://example.com/cancel"
                            }
                        }
                    // Create a payment
                    fetch(this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment' : 'https://api.sandbox.paypal.com/v1/payments/payment', {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Authorization': 'Bearer ' + access_token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            paypalPaymentObj
                        )
                    })
                        .then(res => res.json())



                        //     fetch((this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment' : 'https://api.sandbox.paypal.com/v1/payments/payment') + this.state.paymentId, {
                        //     method: 'PATCH',
                        //     headers: {
                        //         accept: 'application/json',
                        //         'Authorization': 'Bearer ' + this.state.access_token,
                        //         'Content-Type': 'application/json',
                        //     },
                        //     body: JSON.stringify(
                        //         paypalPaymentObj
                        //     )
                        // })



                        .then(responseJson => {
                            const {id, links} = responseJson
                            console.log("Create a payment", responseJson)
                            // console.log("links", links)
                            const approvalUrl = links.find(data => data.rel == "approval_url")
                            this.setState({
                                paymentId: id,
                                approvalUrl: approvalUrl.href
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }) // токен авторизации со всеми платежами
                .catch(err => {
                    console.log({...err})
                })
        } catch (error) {
            alert(error);
        }
    }


    _onNavigationStateChange = (webViewState) => {
        console.log('webViewState', webViewState)
        if (webViewState.url.includes('https://example.com/')) {
            this.setState({
                approvalUrl: null
            })
            const params = webViewState.url.toString();
            const p = params.indexOf('PayerID=');
            console.log('params', params)

            if (p >= 0 && this.state.count) {
                this.setState({count: false});
                const l = params.length;
                const res = params.substring(p, l).replace('PayerID=', "");
                console.log('res', res)

                const paid = this.payment(res);
            }
        }
    }

    // Execute an approved PayPal payment
    payment(payer) {
        try {
            fetch((this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment/' : 'https://api.sandbox.paypal.com/v1/payments/payment/') + this.state.paymentId + '/execute', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer${this.state.access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "payer_id": payer
                })
            })
                .then(response => response.json())
                .then(console.log('execute', response))
                .then(responseJson => {
                    if (responseJson.name.length > 0) {
                        ToastAndroid.show(`Your Payment is confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Main');
                    } else {
                        ToastAndroid.show(`Your Payment is not confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                    }
                })
                .then(clearCart())
                .catch(err => {
                    console.log({...err})
                })
        } catch (error) {
            alert(error);
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (<View style={{flex: 1}}>
            {
                this.state.approvalUrl ?
                    <WebView
                        style={{height: 400, width: 300}}
                        source={{uri: this.state.approvalUrl}}
                        onNavigationStateChange={this._onNavigationStateChange}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={false}
                        style={{marginTop: 20}}
                    />
                    : <Loading/>
            }
        </View>)
    }
}

const mapStateToProps = ({userInfo, userID}) => ({userInfo, userID})

export default connect(mapStateToProps)(WebPayPal)
