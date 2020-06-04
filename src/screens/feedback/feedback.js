import React, { Component } from 'react';
import {View, ScrollView } from 'react-native';

import Checkbox from '../../common/checkbox';
import PickerInput from '../../common/picker-input';
import Input from '../../common/input';
import FooterButton from '../../common/footer-button';

import { connect } from 'react-redux'

import { addFeedback } from '../../posts/frontPosts'

import { SearchButton } from '../../common/header-buttons';

class Feedback extends Component {
  static navigationOptions = {
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 9}}>
        <SearchButton />
      </View>
    ),
    title: 'Kontakt',
  }
  state = {
      name: this.props.userInfo.name,
      surname: this.props.userInfo.surname,
      email: this.props.userInfo.email,
      gender: this.props.userInfo.gender,
      phone: this.props.userInfo.phone,
      title: '',
      text: '',
      isAgree: false
  }

  isFormValid() {
    const { name, surname, email, gender, title, text, isAgree } = this.state
    if(!gender) {
      alert('Bitte wählen Sie Ihr Geschlecht aus')
      return false
    }
    if(!name) {
      alert('Bitte geben Sie Ihren Vornamen ein')
      return false
    }
    if(!surname) {
      alert('Bitte geben Sie Ihren Nachnamen ein')
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
    if(!title) {
      alert('Bitte geben Sie Betreff ein')
      return false
    }
    if(!text) {
      alert('Bitte schreiben Sie Ihre Nachricht')
      return false
    }
    if(!isAgree) {
      alert('Bitte akzeptieren Sie unsere AGB')
      return false
    }
    return true
  }

  handleButtonClick() {
    if(this.isFormValid()) {
      const { name, surname, email, gender, title, text } = this.state
      addFeedback(gender, name, surname, email, title, text)
    }
  }

  render() {
    console.log(this.props)
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 18}}>
          <PickerInput onValueChange={gender => this.setState({gender})} placeholder='Geschlecht*' values={['Herr', 'Frau']} selected={this.state.gender} />
          <Input placeholder='Vorname*' value={this.state.name} onChangeText={name => this.setState({name})} />
          <Input placeholder='Nachname*' value={this.state.surname} onChangeText={surname => this.setState({surname})} />
          <Input placeholder='Email*' value={this.state.email} onChangeText={email => this.setState({email})} />
          <Input placeholder='Telefon' value={this.state.phone} onChangeText={phone => this.setState({phone})} />
          <Input placeholder='Betreff*' value={this.state.title} onChangeText={title => this.setState({title})} />
          <Input placeholder='Ihre Nachricht*' multiline value={this.state.text} onChangeText={text => this.setState({text})} />
          <View style={{marginVertical: 20}}>
            <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' checked={this.state.isAgree} onPress={() => this.setState({isAgree: !this.state.isAgree})} />
          </View>
        </ScrollView>
        <FooterButton text='Weiterlesen' onPress={() => this.handleButtonClick()} />
      </View>
    )
  }
}

const mapStateToProps = ({userInfo, userID}) => ({userInfo, userID})

export default connect(mapStateToProps)(Feedback)