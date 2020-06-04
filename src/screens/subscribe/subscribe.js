import React, { Component } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';

import CloseButton from '../../common/header-buttons/close-button';

import { connect } from 'react-redux'

import Checkbox from '../../common/checkbox';

import FooterButton from '../../common/footer-button';

import { subscribeToEmail } from '../../posts/subscribePosts'

class Subscribe extends Component {
  static navigationOptions = {
    headerBackImage: CloseButton,
    title: 'Newsletter anmelden',
  }
  state = {
    email: this.props.userInfo.email,
    isAgree: false
  }

  handleButtonClick() {
    if(this.isFormValid()) {
      subscribeToEmail(this.state.email)
    }
  }

  isFormValid() {
    const {email, isAgree} = this.state
    if(!email) {
      alert('Bitte geben Sie Ihre E-Mail ein')
      return false
    }
    const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailChecker.test(email)) {
      alert('Die E-Mail-Adresse ist ungültig')
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
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView style={styles.container}>
          <Image style={styles.mailImageStyle} source={require('../../assets/icons-color/010-mail-2.png')} key={'subscribeMailImage'} />
          <Text style={styles.promoTextStyle}>
            Aktionen, Rabatte, Wettbewerbe und mehr. Abonnieren Sie jetzt den kostenlosen teleropa Newsletter und erhalten Sie einen Rabatt von 5%
          </Text>
          <TextInput style={styles.inputStyle} placeholder='Email' value={this.state.email} onChangeText={email => this.setState({email})} autoCapitalize='none' />
          <View style={{marginVertical: 14 }}>
            <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' checked={this.state.isAgree} onPress={() => this.setState({isAgree: !this.state.isAgree})} />
          </View>

          <Text style={styles.agreementText}>
            Ich möchte zukünftig über aktuelle Trends, Angebote und Gutscheine von teleropa per E-Mail informiert werden. Eine Abmeldung ist jederzeit kostenlos möglich.
          </Text>
          
        </ScrollView>
        <View style={{justifyContent: 'flex-end', backgroundColor: '#fff', height: 40}}>
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

export default connect(mapStateToProps)(Subscribe)

const styles = {
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    maxWidth: 420

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
    color: '#000000',
  },
  inputStyle: {
    paddingLeft: 14,
    marginTop: 35,
    alignSelf: 'center',
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#a0a0a0',
  },
  agreementText: {
    fontSize: 10,
    lineHeight: 24,
    color: '#a0a0a0',
    marginBottom: 0
  },
  bottomText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    fontSize: 10,
    color: '#a0a0a0'
  }
}
