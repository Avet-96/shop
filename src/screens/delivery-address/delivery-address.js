import React, { Component } from 'react';

import { View, ScrollView } from 'react-native';

import { getCountries } from '../../gets/mainPagePosts'

import Picker from '../../common/picker-input';
import Loading from '../loading'
import Input from '../../common/input';
import FooterButton from '../../common/footer-button';


import { getUserShippingAddress } from '../../gets/userPosts';

import { changeDeliveryAddress } from '../../posts/userDataPosts'

import { connect } from 'react-redux'

class DeliveryAddress extends Component {
    static navigationOptions = {
        title: 'Versandadresse'
    }

    state = {
        loaded: false,
        availableCountries: null
    }

    componentDidMount() {
        getUserShippingAddress(this.props.userID).then(address => this.setState({...address, loaded: true, userType: address.company ? 'Firma' : 'Privatkunde'}))
        getCountries().then(({countries}) => this.setState({availableCountries: countries}))
    }

    isFormValid() {
        const { company, vatId, salutation, firstname, lastname, street, zipcode, city, country, userType } = this.state
        if(!userType) {
          alert('Bitte wählen Sie den Kundentyp')
          return false
        }
        if(!salutation) {
          alert('Bitte wählen Sie Ihr Geschlecht aus')
          return false
        }
        if(userType === 'Firma' && (!company||!vatId)) {
          alert('Bitte geben Sie Information über Ihre Firma ein')
          return false
        }
        if(!firstname) {
          alert(' Bitte geben Sie Ihren Vornamen ein')
          return false
        }
        if(!lastname) {
          alert('Bitte geben Sie Ihren Nachnamen ein')
          return false
        }
        if(!street){
          alert('Bitte geben Sie Ihre Anschrift ein')
          return false
        }
        if(!zipcode) {
          alert('Bitte geben Sie die PLZ ein')
          return false
        }
        if(!city) {
          alert('Bitte geben Sie den Ort ein')
          return false
        }
        if(!country) {
          alert('Bitte wählen Sie Ihr Land aus')
          return false
        }
        return true
      }

      handleAddressChange() {
          if(this.isFormValid()) {
                console.log(this.state)
                const { company, department, vatId, salutation, firstname, lastname, street, zipcode, city, country, userType, phone } = this.state
                const countryID = this.state.availableCountries.find(({name}) => name === country).id
                const userTypeForRequest = userType==='Firma' ? 'business' : 'private'
                const userID = this.props.userID
                changeDeliveryAddress(userID, userTypeForRequest, company, department, vatId, salutation, firstname, lastname, street, zipcode, city, countryID, phone)
          }
      }

    render() {
        console.log(this.state)
        if(!this.state.loaded || !this.state.availableCountries) return <Loading />
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false}>
                    <Picker placeholder='Ich bin Neukunde*' selected={this.state.userType} onValueChange={userType => this.setState({userType})} values={['Privatkunde', 'Firma']} />
                    {
                        this.state.userType === 'Firma' ? 
                            (
                                <>
                                    <Input placeholder='Firmennamen*' value={this.state.company} onChangeText={company => this.setState({company})} />
                                    <Input placeholder='Abteilung' value={this.state.department} onChangeText={department => this.setState({department})} />
                                    <Input placeholder='Umsatzsteuer-ID*' value={this.state.vatId} onChangeText={vatId => this.setState({vatId})} />
                                </>
                            )
                        : null
                    }
                    <Picker placeholder='Geschlecht*' values={['Herr','Frau']} selected={this.state.salutation} onValueChange={salutation => this.setState({salutation})} />
                    <Input placeholder='Vorname*' value={this.state.firstname} onChangeText={firstname => this.setState({firstname})} />
                    <Input placeholder='Nachname*' value={this.state.lastname} onChangeText={lastname => this.setState({lastname})} />
                    <Input placeholder='Adresse*' value={this.state.street} onChangeText={street => this.setState({street})} />
                    <Input 
                        placeholder='PLZ*' 
                        keyboardType='phone-pad'
                        value={'' + this.state.zipcode}
                        onChangeText={(zipcode) => this.setState({
                            zipcode: + zipcode.replace(/[^0-9]/g, ''),
                        })}
                    />
                    <Input placeholder='Ort*' value={this.state.city} onChangeText={city => this.setState({city})} />
                    <Input placeholder='Telefon' 
                        keyboardType='phone-pad'
                        value={'' + this.state.phone}
                        onChangeText={(phone) => this.setState({
                            phone: + phone.replace(/[^0-9]/g, ''),
                        })} 
                    />
                    <Picker placeholder='Land*' selected={this.state.country} onValueChange={country => this.setState({country})} values={this.state.availableCountries.map(({name}) => name)} />          
                </ScrollView>
                <FooterButton text='Speichern' onPress={() => this.handleAddressChange()} />
            </View>
        )
    }
}

const mapStateToProps = ({userID}) => (
    {userID}
)

export default connect(mapStateToProps)(DeliveryAddress)