import React, { Component } from 'react';

import { Text, View, ScrollView } from 'react-native';

import FooterButton from '../../common/footer-button';
import Checkbox from '../../common/checkbox';
import Picker from '../../common/picker-input';
import Input from '../../common/input';

import Loading from '../loading'

import { getUserShippingAddress } from '../../gets/userPosts';
import { getCountries } from '../../gets/mainPagePosts'

import { connect } from 'react-redux'

class DeliveryAddressOrder extends Component {
    static navigationOptions = {
        title: 'Adresse'
    }

    state = {
        loaded: false,
        availableCountries: null
    }

    componentDidMount() {
        getUserShippingAddress(this.props.userID).then(address => this.setState({...address, loaded: true, userType: address.company ? 'Firma' : 'Privatkunde'}))
        getCountries().then(({countries}) => this.setState({availableCountries: countries}))
    }

    render() {
        console.log(this.state)
        if(!this.state.loaded || !this.state.availableCountries) return <Loading />
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false}>
                    <Picker placeholder='Ich bin Neukunde' selected={this.state.userType} onValueChange={userType => this.setState({userType})} values={['Privatkunde', 'Firma']} />
                    {
                        this.state.userType === 'Firma' ? 
                            (
                                <>
                                    <Input placeholder='Firmennamen' value={this.state.company} onChangeText={company => this.setState({company})} />
                                    <Input placeholder='Abteilung' value={this.state.department} onChangeText={department => this.setState({department})} />
                                    <Input placeholder='Umsatzsteuer-ID' value={this.state.vatId} onChangeText={vatId => this.setState({vatId})} />
                                </>
                            )
                        : null
                    }
                    <Picker placeholder='Geschlecht' values={['Herr','Frau']} selected={this.state.salutation} onValueChange={salutation => this.setState({salutation})} />
                    <Input placeholder='Vorname' value={this.state.firstname} onChangeText={firstname => this.setState({firstname})} />
                    <Input placeholder='Nachname' value={this.state.lastname} onChangeText={lastname => this.setState({lastname})} />
                    <Input placeholder='Adresse' value={this.state.street} onChangeText={street => this.setState({street})} />
                    <Input 
                        placeholder='PLZ' 
                        keyboardType='phone-pad'
                        value={'' + this.state.zipcode}
                        onChangeText={(zipcode) => this.setState({
                            zipcode: + zipcode.replace(/[^0-9]/g, ''),
                        })}
                    />
                    <Input placeholder='Ort' value={this.state.city} onChangeText={city => this.setState({city})} />
                    <Input placeholder='Telefon' value={this.state.phone} onChangeText={phone => this.setState({phone})} />
                    <Picker placeholder='Land' selected={this.state.country} onValueChange={country => this.setState({country})} values={this.state.availableCountries.map(({name}) => name)} />          
                </ScrollView>
                <FooterButton text='Speichern' onPress={() => this.props.navigation.navigate('Payment', {data: this.props.navigation.getParam('data', null)})} />
            </View>
        )
    }
}

const mapStateToProps = ({userID}) => (
    {
        userID
    }
)

export default connect(mapStateToProps)(DeliveryAddressOrder)