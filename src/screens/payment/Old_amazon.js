import React, { Component } from 'react';
import { View, StyleSheet, Clipboard, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import Loading from '../loading';

const merchant_id = 'A12MAN4EHAQW5I';
const access_key = 'AKIAJFNFAMVRHUHZ73MQ';
const secret_key = 'W26N3Bz4zhG8pI6c + tXr + /3/ / 3c2XS5h8CCmeH69';
const clientId = 'amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349';
const clientSecret = 'd530c12e3b681d62fc4829f3e069aaa326f81642f04e3158e376fa7f388e31b6';

const url = "https://api.amazon.com/auth/o2/token";
const codepairUrl = "https://api.amazon.com/auth/O2/create/codepair";

const body = ('response_type=device_code&client_id=' + clientId + '&scope=profile')
export default class AmazonLoginWebView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            res: '',
            count: true,
            access_token: "",
            user_code: '',
            device_code: '',
            verification_uri: '',
            clipboardContent: null,
            showAlert: true,
            approvalUrl: null,
            url: false,
            id: '',
            loading: false,
            paymentId: '',
            cart: this.props.navigation.getParam('CartData'),
            // name: this.props.userInfo.name,
            // surname: this.props.userInfo.surname,
            // phone: this.props.userInfo.phone,
            // country: this.props.userInfo.country,
            // street: this.props.userInfo.street,
            // city: this.props.userInfo.city,
            // post: this.props.userInfo.post,
            realAccount: false
        }
    }

    async  componentWillMount() {
        fetch(codepairUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        })
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log("response", response)
                this.setState({
                    user_code: response.user_code,
                    device_code: response.device_code,
                    verification_uri: response.verification_uri
                })
                console.log("response", this.state.user_code)
            })
    }

    _onNavigationStateChange = (webViewState) => {
        console.log("webViewState", webViewState);
        const productsPrice = parseFloat(this.state.cart.discountProductsPrice);
        const deliveryPrice = parseFloat(this.state.cart.deliveryData.deliveryPrice);
        const total = productsPrice + deliveryPrice;

        const productsQuantity = this.state.cart.products.reduce((sum, { count }) => {
            return sum + count
        }, 0)

        const deliveryId = this.state.cart.deliveryData.services.find(item => item.id == this.state.cart.deliveryData.selected);
        const deliveryService = deliveryId.name;

        const username = clientId;
        const password = clientSecret;

        if (webViewState.title == 'Amazon Zwei-Schritt-Verifizierung' && this.state.showAlert) {
            Alert.alert(
                "Ihr Gerätecode ", this.state.user_code,
                [
                    { text: 'Kopieren', onPress: () => this.writeToClipboard() },
                ],
                { cancelable: false },
            )
        }
        if (webViewState.title == 'https://www.amazon.com/a/code?language=de_DE&hide_nav_menu=true&cbl-status=successfully_authorized_user_code' && !this.state.showAlert) {
            this.pressOK();
        }
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.user_code);
        await this.setState({ showAlert: false });
        Alert.alert(
            "", "Code erfolgreich kopiert",
            [
                { text: 'OK', onPress: () => console.log("OK") },
            ],
            { cancelable: false },
        )

    };

    pressOK() {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'user_code=' + this.state.user_code + '&device_code=' + this.state.device_code + '&grant_type=device_code'
        }).then(responseJSON => {
            return responseJSON.json();
        }).then(response => {
            console.log("response Amazon", response);
            this.setState({
                access_token: response.access_token
            });
            return response.access_token
        })
    }

    payment(payer) {
        try {
            const url = (this.state.realAccount ? 'https://api.paypal.com/v1/payments/payment/' : 'https://api.sandbox.paypal.com/v1/payments/payment/') + this.state.paymentId + '/execute';
            fetch(url, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Authorization': 'Bearer ' + this.state.access_token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "payer_id": payer
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.name.length > 0) {
                        ToastAndroid.show(`Your Payment is confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Main');
                    } else {
                        ToastAndroid.show(`Your Payment is not confirmed`, ToastAndroid.LONG);
                        this.props.navigation.navigate('Payment');
                    }
                })
                .catch(err => {
                    console.log({ ...err })
                })
        } catch (error) {
            alert(error);
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ uri: "https://www.amazon.com/a/code?language=de_DE" }}
                    scalesPageToFit={false}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={this.state.cookie}
                    startInLoadingState={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    webview: {
        flex: 1,
        alignSelf: 'stretch',
    },
});