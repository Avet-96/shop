import React, { Component } from 'react';

import { View, ScrollView } from 'react-native';

import Checkbox from '../../common/checkbox';
import Input from '../../common/input';
import Picker from '../../common/picker-input';

import { connect } from 'react-redux'

import { addReview } from '../../posts/productPosts'

import FooterButton from '../../common/footer-button';

class LeaveReview extends Component {
  static navigationOptions = {
    title: 'Bewertung schreibung',
  }
  state = {
    name: this.props.name,
    email: this.props.email,
    isAgree: false,
    rate: '10 - sehr gut',
    shortDesc: '',
    text: '',
    productID: this.props.navigation.getParam('productID')
  }

  isReviewValid() {
    const {email, shortDesc, isAgree, name} = this.state
    if(!email) {
      alert('Bitte geben Sie Ihre E-Mail ein')
      return false
    }
    const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailChecker.test(email)) {
      alert('Die E-Mail-Adresse ist ungültig')
      return false
    }
    if(!shortDesc) {
      alert('Bitte Zusammenfassung eingeben')
      return false
    }
    if(!isAgree) {
      alert('Bitte akzeptieren Sie unsere AGB')
      return false
    }
    if(!name) {
      alert('Bitte geben Sie Ihren Vornamen ein')
      return false
    }
    return true
  }

  handleReviewButton() {
    if(this.isReviewValid()) {
      const {productID, name, email, rate, shortDesc, text} = this.state
      const rateForRequest = parseInt(rate, 10)
      addReview(productID, name, email, shortDesc, rateForRequest, text)
    }
  }

  render() {
    console.log(this.state)
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 18}}>
          <Input placeholder='Vorname' value={this.state.name} onChangeText={name => this.setState({name})} />
          <Input placeholder='Email*' value={this.state.email} onChangeText={email => this.setState({email})} />
          <Picker placeholder='Bewertung' values={['10 - sehr gut','9','8','7','6','5','4','3','2','1 - sehr schlecht']} onValueChange={rate => this.setState({rate})} selected={this.state.rate} />
          <Input placeholder='Zusammenfassung*' multiline maxLength={100}  value={this.state.shortDesc} onChangeText={shortDesc => this.setState({shortDesc})} />
          <Input placeholder='Ihre Bewertung' multiline maxLength={500} value={this.state.text} onChangeText={text => this.setState({text})} />
          <View style={{marginVertical: 20}} >
            <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' onPress={() => this.setState({isAgree: !this.state.isAgree})} checked={this.state.isAgree} />
          </View>
        </ScrollView>
        <FooterButton text='Weiterlesen' onPress={() => this.handleReviewButton()} />
      </View>
    )
  }
}

const mapStateToProps = ({userInfo}) => (userInfo)

export default connect(mapStateToProps)(LeaveReview)