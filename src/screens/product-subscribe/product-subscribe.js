import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import CloseButton from '../../common/header-buttons/close-button';

import { connect } from 'react-redux'

import Checkbox from '../../common/checkbox';

import { subscribeToProduct } from '../../posts/subscribePosts'

import FooterButton from '../../common/footer-button';

class ProductSubscribe extends Component {

    static navigationOptions = {
        headerBackImage: CloseButton,
        title: 'Newsletter anmelden',
    }

    state = {
        email: this.props.userInfo.email,
        stock: false,
        priceDown: false,
        sale: false
    }

    handleButtonClick() {
        if(this.isFormValid()) {
            const stock = this.state.stock ? 1 : 0
            const priceDown = this.state.priceDown ? 1 : 0
            const sale = this.state.sale ? 1 : 0
            const productID = this.props.navigation.getParam('productID', null)
            // console.log(stock, priceDown, sale, productID)
            subscribeToProduct(this.state.email, stock, priceDown, sale, productID)
        }
    }

    isFormValid = () => {
        const {email, stock, priceDown, sale} = this.state
        if(!stock&&!priceDown&&!sale) {
            alert('Sie bitte wählen Sie zumindest eine Option aus.')
            return false
        }
        if(!email) {
            alert('Bitte geben Sie Ihre E-Mail ein')
            return false
          }
          const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          if(!emailChecker.test(email)) {
            alert('Die E-Mail-Adresse ist ungültig')
            return false
          }
          return true
    }
    
    render() {
        return(
        <View style={{flex: 1, flexDirection: 'column'}}>
            <ScrollView style={styles.container}>
            <Image style={styles.mailImageStyle} source={require('../../assets/icons/010-mail.png')} key={'mailSubscribeImage'} />
            <Text style={styles.promoTextStyle}>
                Bleiben Sie über Änderungen informiert!
            </Text>

            <View style={{marginBottom: 20}}>
                <Checkbox text='sobald der Artikel wieder auf Lager ist' checked={this.state.stock} onPress={() => this.setState({stock: !this.state.stock})} />
            </View>

            <View style={{marginBottom: 20}}>
                <Checkbox text='sobald der Artikel im Preis sinkt' checked={this.state.priceDown} onPress={() => this.setState({priceDown: !this.state.priceDown})} />
            </View>            
            
            <View style={{marginBottom: 20}}>
                <Checkbox text='sobald der Artikel als Sonderangebot verfügbar ist' checked={this.state.sale} onPress={() => this.setState({sale: !this.state.sale})} />
            </View>

            <TextInput style={styles.inputStyle} placeholder='Email' value={this.state.email} onChangeText={email => this.setState({email})} autoCapitalize='none' />

            </ScrollView>
        <View style={{justifyContent: 'flex-end'}}>
            <Text style={styles.bottomText}>
                Die Newsletter Abmeldung ist jederzeit kostenlos möglich
            </Text>
        </View>
        <FooterButton text='Jetzt abonnieren' onPress={() => this.handleButtonClick()}/>
        </View>
        );
    }

}

const mapStateToProps = ({userInfo}) => ({userInfo})

export default connect(mapStateToProps)(ProductSubscribe)

const styles = {
container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center'
},
mailImageStyle: {
    height: 50,
    margin: 43,
    alignSelf: 'center',
    resizeMode: 'contain'
},
promoTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 34,
    color: '#000000'
},
inputStyle: {
    paddingLeft: 14,
    alignSelf: 'center',
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#a0a0a0',
},
bottomText: {
    position: 'absolute',
    bottom: 20,
    marginTop: 140,
    alignSelf: 'center',
    fontSize: 10,
    color: '#a0a0a0'
}
}
