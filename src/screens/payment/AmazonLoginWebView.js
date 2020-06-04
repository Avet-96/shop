import React, { Component } from 'react';
import { View, StyleSheet, Clipboard, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import base64 from 'react-native-base64';
import Loading from '../loading';
import HTML from "react-native-render-html";
import { sWidth, sHeight } from '../../helpers/screenSize';
// import AmazonWeb from './amazon-web'

const merchant_id = 'A12MAN4EHAQW5I';
const access_key = 'AKIAJFNFAMVRHUHZ73MQ';
const secret_key = 'W26N3Bz4zhG8pI6c + tXr + /3/ / 3c2XS5h8CCmeH69';
const clientId = 'amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349';
const clientSecret = 'd530c12e3b681d62fc4829f3e069aaa326f81642f04e3158e376fa7f388e31b6';

const url = "https://api.amazon.com/auth/o2/token";
const codepairUrl = "https://api.amazon.com/auth/O2/create/codepair";

const body = ('response_type=device_code&client_id=' + clientId + '&scope=profile')
//const body = ('response_type=device_code&client_id=' + clientId + "&scope = 'profile postal_code payments:widget payments:shipping_address payments:billing_address'  ")

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
            Widjet: '',
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
                    verification_uri: response.verification_uri,
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

    // JS3() {
    //     console.log('this')
    //     var authRequest;
    //     OffAmazonPayments.Button("AmazonPayButton", "A12MAN4EHAQW5I", {
    //         type: "PwA", color: "Gold", size: "medium", useAmazonAddressBook: true, authorization: function () {
    //             var loginOptions = { scope: 'profile payments:widget' };
    //             authRequest = amazon.Login.authorize(loginOptions, "https://teleropa.de/checkout");
    //         },
    //         onError: function (error) {
    //             // Write your custom error handling
    //         }
    //     });
    // }

    render() {
//         let JS = '<script type="text/javascript"  .windowonAmazonLoginReady = function() { amazon.Login.setClientId("amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349")} ></script>';
//         let JS1 = '<script type="text/javascript" src="https://static-na.payments-amazon.com/OffAmazonPayments/us/js/Widgets.js?sellerId=A12MAN4EHAQW5I"></script>';
//         let JS2 = `
//         <html xmlns="http://www.w3.org/1999/xhtml">
//     <head>
//         <title>Test Payment Page</title><!-- This is the handler for the onAmazonLoginReady Callback -->

//   <script type="text/javascript">
//             window.onAmazonLoginReady = function() {
//                 amazon.Login.setClientId("amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349");
//       };
//   </script>
//         <script type="text/javascript"
//             src='https://static-na.payments-amazon.com/OffAmazonPayments/us/js/Widgets.js?sellerId=A12MAN4EHAQW5I'>
//         </script>
//     </head>


//     <div id="addressBookWidgetDiv"></div>
//     <script>
//         new OffAmazonPayments.Widgets.AddressBook({
//             sellerId: 'A12MAN4EHAQW5I',
//     design: {
//             size: {
//             width:'400px',
//     height:'260px'
//   }
// },
//     onOrderReferenceCreate: function(orderReference) {
//             orderReference.getAmazonOrderReferenceId();
//   },
//     onAddressSelect: function(orderReference) {
//             // Optionally render the Wallet Widget 
//         },
//     onError: function(error) {
//             // Write your custom error handling
//         }
//         }).bind("addressBookWidgetDiv");
// </script>


//     <script type="text/javascript">
//         window.onAmazonLoginReady = function() {
//             amazon.Login.setClientId('amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349');
//   };
//   </script>
//     <script type="text/javascript"
//         src='https://static-na.payments-amazon.com/OffAmazonPayments/us/js/Widgets.js?sellerId=A12MAN4EHAQW5I'>
//     </script>
// </head>


//     <div id="AmazonPayButton"></div>
//     <script type="text/javascript">
//         var authRequest;
//   OffAmazonPayments.Button("AmazonPayButton", "A12MAN4EHAQW5I", {
//             type:  "PwA",    color: "Gold",    size:  "medium",    useAmazonAddressBook: true,    authorization: function() {      var loginOptions = {scope: 'profile payments:widget'};
//     authRequest = amazon.Login.authorize(loginOptions, "https://teleropa.de/checkout");
//   },
//     onError: function(error) {
//             // Write your custom error handling
//         }
//         });
// </script>

// </head >

//     <body>


//     </body>
// </html >
//         `

        

//         const HTMLcontext = `
//             <img class="index-hello-image" src="https://teleropa.de/media/image/11/8f/1c/Banner_S20_teleropa.jpg">
//                 <div class="index-hello-groups">
//                     <div class="index-hello-content">
//                         <div class="index-hello-headline"><b>20€ SPAREN</b><span>DIGITALRADIO ZUM MEGAPREIS</span></div>
//                         <div class="index-hello-actions">
//                             <div class="index-hello-logo">
//                                 <img src="/media/image/d6/fc/1e/Telestar-Logo-weiss.png">
//                             </div>
//                                 <div class="index-hello-price"><span>NUR</span><b><i class="wbp-net-switch-banner--value">99,00</i> €</b></div>
//                             </div>
//                         </div>
//                     </div>
//             <div id="AmazonPayButton"></div>
// `
            

        // let source = JS + JS1 + JS2        
        // console.log("source", JS + JS1 + JS2)




        const html =`
  
  
  <script type='text/javascript'>
    // get access token
    function getURLParameter(name, source) {
        return decodeURIComponent((new RegExp('[?|&amp;|#]' + name + '=' +
                        '([^&;]+?)(&|#|;|$)').exec(source) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    var accessToken = getURLParameter("access_token", location.hash);
    if (typeof accessToken === 'string' && accessToken.match(/^Atza/)) {
        document.cookie = "amazon_Login_accessToken=" + accessToken + ";path=/;secure";
    }

    window.onAmazonLoginReady = function() {
        // amazon.Login.setUseCookie(true);
      amazon.Login.setClientId("amzn1.application-oa2-client.45a7aff6cd074f079002eb9612697349");
    };

    window.onAmazonPaymentsReady = function() {
      showLoginButton();
      showAddressBookWidget();
      
    };

    document.getElementById('Logout').onclick = function() {
      amazon.Login.logout();
      document.cookie = "amazon_Login_accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      window.location.href = '/';
    };
  </script>

  <script type='text/javascript'>
    function showLoginButton() {
        var authRequest;
        OffAmazonPayments.Button("AmazonPayButton", "A12MAN4EHAQW5I", {
          type:  "PwA",
          color: "Gold",
          size:  "medium",

          authorization: function() {
            loginOptions = {scope: "profile payments:widget payments:shipping_address", popup: true};
            authRequest = amazon.Login.authorize (loginOptions, function(t) {
                // console.log(t.access_token);
                // console.log(t.expires_in);
                // console.log(t.token_type);
                showAddressBookWidget();
            // authRequest = amazon.Login.authorize (loginOptions, "callback.html");
          }
        });
    }

    function showAddressBookWidget() {
        // AddressBook
        new OffAmazonPayments.Widgets.AddressBook({
          sellerId: 'A12MAN4EHAQW5I',
          
          onReady: function (orderReference) {
              var orderReferenceId = orderReference.getAmazonOrderReferenceId();
              var el;
              if ((el = document.getElementById("orderReferenceId"))) {
                el.value = orderReferenceId;
              }
              // Wallet
              showWalletWidget(orderReferenceId);
          },
          onAddressSelect: function (orderReference) {
              // do stuff here like recalculate tax and/or shipping
          },
          design: {
            //   designMode: size: {width:'400px', height:'228px'}
            //   designMode: 'responsive'
              designMode: 'smartphoneCollapsible'
          },
          onError: function (error) {
              // Error handling code 
              // We also recommend that you implement an onError handler in your code. 
              // @see https://payments.amazon.com/documentation/lpwa/201954960
              console.log('OffAmazonPayments.Widgets.AddressBook', error.getErrorCode(), error.getErrorMessage());
              switch (error.getErrorCode()) {
                case 'AddressNotModifiable':
                    // You cannot modify the shipping address when the order reference is in the given state.
                    break;
                case 'BuyerNotAssociated':
                    // The buyer is not associated with the given order reference. 
                    // The buyer must sign in before you render the widget.
                    break;
                case 'BuyerSessionExpired':
                    // The buyer's session with Amazon has expired. 
                    // The buyer must sign in before you render the widget.
                    break;
                case 'InvalidAccountStatus':
                    // Your merchant account is not in an appropriate state to execute this request. 
                    // For example, it has been suspended or you have not completed registration.
                    break;
                case 'InvalidOrderReferenceId':
                    // The specified order reference identifier is invalid.
                    break;
                case 'InvalidParameterValue':
                    // The value assigned to the specified parameter is not valid.
                    break;
                case 'InvalidSellerId':
                    // The merchant identifier that you have provided is invalid. Specify a valid SellerId.
                    break;
                case 'MissingParameter':
                    // The specified parameter is missing and must be provided.
                    break;
                case 'PaymentMethodNotModifiable':
                    // You cannot modify the payment method when the order reference is in the given state.
                    break;
                case 'ReleaseEnvironmentMismatch':
                    // You have attempted to render a widget in a release environment that does not match the release environment of the Order Reference object. 
                    // The release environment of the widget and the Order Reference object must match.
                    break;
                case 'StaleOrderReference':
                    // The specified order reference was not confirmed in the allowed time and is now canceled. 
                    // You cannot associate a payment method and an address with a canceled order reference.
                    break;
                case 'UnknownError':
                    // There was an unknown error in the service.
                    break;
                default:
                    // Oh My God, What's going on?
              }
          }
        }).bind("addressBookWidgetDiv");
    }

    function showWalletWidget(orderReferenceId) {
        // Wallet
        new OffAmazonPayments.Widgets.Wallet({
          sellerId: 'A12MAN4EHAQW5I',
          amazonOrderReferenceId: orderReferenceId,
          onReady: function(orderReference) {
              console.log(orderReference.getAmazonOrderReferenceId());
          },
          onPaymentSelect: function() {
              console.log(arguments);
          },
          design: {
            //   designMode: 'responsive'
              designMode: 'smartphoneCollapsible'
            // designMode: size: {width:'400px', height:'228px'}
          },
          onError: function(error) {
              // Error handling code 
              // We also recommend that you implement an onError handler in your code. 
              // @see https://payments.amazon.com/documentation/lpwa/201954960
              console.log('OffAmazonPayments.Widgets.Wallet', error.getErrorCode(), error.getErrorMessage());
          }
        }).bind("walletWidgetDiv");
    }

    
  </script>
  <script type="text/javascript" 
    src="https://static-eu.payments-amazon.com/OffAmazonPayments/eur/sandbox/lpa/js/Widgets.js" 
     async></script>
  
     <div style="text-align: center; border: 1px solid #bbb;border-radius: 3px;padding:5px;margin:5px;">
     <div id="AmazonPayButton"></div>
   </div>
   <button type="button" name="button" id="Logout">Logout</button>
   <div id="addressBookWidgetDiv" style="height:250px"></div>
   <div id="walletWidgetDiv" style="height:250px"></div>
   
     `

        return (
            <View style={{ flex: 1 }}>

                {/* <HTML html={html} /> */}
                {/* <AmazonWeb /> */}
                <WebView
                    style={{width: sWidth, height: 300}}
                    source={{ uri: "https://www.amazon.com/a/code?language=de_DE" }}
                    // source={{ html: html }}
                    scalesPageToFit={false}
                    // onNavigationStateChange={this._onNavigationStateChange.bind(this)}                    
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={html}
                    // injectedJavaScript={this.state.cookie}
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