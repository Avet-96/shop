import React, { Component } from 'react';
import { View, ScrollView} from 'react-native';

import Input from '../../common/input';
import Checkbox from '../../common/checkbox';
import Picker from '../../common/picker-input';

import { connect } from 'react-redux'

import { askQuestion } from '../../posts/frontPosts'

import FooterButton from '../../common/footer-button';

class AskQuestion extends Component {
  static navigationOptions = {
    title: 'Kontaktieren Sie uns'
  }

  state = {
    productID: this.props.navigation.getParam('productID'),
    firstname: this.props.name,
    lastname: this.props.surname,
    salutation: this.props.gender,
    phone: '',
    email: this.props.email,
    text: '',
    isAgree: false
  }
  
  handleButtonClick() {
    if(this.isFormValid()) {
      const {productID, firstname, lastname, salutation, phone, email, text} = this.state
      askQuestion(productID, firstname, lastname, salutation, phone, email, text)
    }
  }

  isFormValid() {
    const { firstname, lastname, salutation, phone, email, text, isAgree } = this.state
    if(!firstname) {
      alert('Bitte geben Sie Ihren Vornamen ein')
      return false
    }
    if(!lastname) {
      alert('Bitte geben Sie Ihren Nachnamen ein')
      return false
    }
    if(!salutation) {
      alert('Bitte wählen Sie Ihr Geschlecht aus')
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
    if(!text) {
      alert('')
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
          <Input placeholder='Artikelname' value={this.state.productID} editable={false} />
          <Input placeholder='Vorname' value={this.state.firstname} onChangeText={firstname => this.setState({firstname})} />
          <Input placeholder='Nachname' value={this.state.lastname} onChangeText={lastname => this.setState({lastname})} />
          <Picker onValueChange={salutation => this.setState({salutation}) } placeholder='Geschlecht' values={['Herr', 'Frau']} selected={this.state.salutation} />
          <Input 
              placeholder='Telefon' 
              keyboardType='number-pad' 
              value={'' + this.state.phone}
              onChangeText={(phone) => this.setState({
                phone: + phone.replace(/[^0-9]/g, ''),
              })}
          />
          <Input placeholder='Email' value={this.state.email} onChangeText={email => this.setState({email})}  />
          <Input placeholder='Ihre Meinung' maxLength={500} value={this.state.text} onChangeText={text => this.setState({text})} />
          <View style={{marginVertical: 20}}>
            <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' checked={this.state.isAgree} onPress={() => this.setState({isAgree: !this.state.isAgree})} />
          </View>
        </ScrollView>
        <FooterButton text='Senden' onPress={() => this.handleButtonClick()} />
      </View>
    )
  }
}

const mapStateToProps = ({userInfo}) => (userInfo)

export default connect(mapStateToProps)(AskQuestion)