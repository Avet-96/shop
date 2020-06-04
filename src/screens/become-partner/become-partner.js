import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import FooterButton from '../../common/footer-button';
import Input from '../../common/input';
import Checkbox from '../../common/checkbox';

import {partnerRequest} from '../../posts/frontPosts'

import { SearchButton } from '../../common/header-buttons';

export default class BecomePartner extends Component {
  static navigationOptions = {
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 9}}>
        <SearchButton />
      </View>
    ),
    title: 'Partner werden'
  }

  state = {
    company: '',
    contact: '',
    street: '',
    zipcode: '',
    city: '',
    phone: '',
    fax: '',
    email: '',
    website: '',
    comment: '',
    companyDesc: '',
    isAgree: false
  }

  handleButtonClick() {
    const { company, contact, street, zipcode, phone, fax, email, website, comment, companyDesc, city } = this.state
    if(this.isFormValid()) {
      partnerRequest(company, contact, street, zipcode, phone, fax, email, website, comment, companyDesc, city )
    }
  }

  isFormValid() {
    const { company, contact, email, street, zipcode, city, isAgree, phone, website, companyDesc } = this.state
    if(!company) {
      alert('Bitte geben Sie Information über Ihre Firma ein')
      return false
    }
    if(!contact) {
      alert('Bitte Ansprechpartner eingeben')
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
    if(!phone) {
      alert('Bitte Telefon eingeben')
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
    if(!website) {
      alert('Bitte Website eingeben')
      return false
    }
    if(!companyDesc) {
      alert('Bitte Firmenprofil eingeben')
      return false
    }
    if(!isAgree) {
      alert('Bitte akzeptieren Sie unsere AGB')
      return false
    }
    return true
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false} >
          <Input placeholder='Firma*' value={this.state.company} onChangeText={ company => this.setState({company})} />
          <Input placeholder='Ansprechpartner*' value={this.state.contact} onChangeText={ contact => this.setState({contact})} />
          <Input placeholder='Straße & Hausnummer*' value={this.state.street} onChangeText={ street => this.setState({street})} />
          <Input placeholder='PLZ*' value={this.state.zipcode} onChangeText={ zipcode => this.setState({zipcode})} />
          <Input placeholder='Ort*' value={this.state.city} onChangeText={ city => this.setState({city})} />
          <Input placeholder='Telefon*' value={this.state.phone} onChangeText={ phone => this.setState({phone})} />
          <Input placeholder='Fax' value={this.state.fax} onChangeText={ fax => this.setState({fax})} />
          <Input placeholder='E-Mail*' value={this.state.email} onChangeText={ email => this.setState({email})} />
          <Input placeholder='Webseite*' value={this.state.website} onChangeText={ website => this.setState({website})} />
          <Input placeholder='Kommentar' multiline value={this.state.comment} onChangeText={ comment => this.setState({comment})} />
          <Input placeholder='Firmenprofil*' multiline value={this.state.companyDesc} onChangeText={ companyDesc => this.setState({companyDesc})} />
          <View style={{marginVertical: 20}}>
            <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' checked={this.state.isAgree} onPress={() => this.setState({isAgree: !this.state.isAgree})} />
          </View>
        </ScrollView>
        <FooterButton text='Weiterlesen' onPress={() => this.handleButtonClick() } />
      </View>
    )
  }
}
