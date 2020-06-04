import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

import RNRestart from 'react-native-restart';

import { connect } from 'react-redux';

import * as actions from '../../actions/login-actions';

import { logIn, resetPassword } from '../../posts/authPosts';

import Loading from '../../screens/loading';
import FooterButton from '../../common/footer-button';
import Input from '../../common/input';
import ModalView from '../../common/modal-view';

import ButtonItem from '../../common/button-item';

// import NavigationService from '../../navigation-service'
// import { createStackNavigator, NavigationActions, withNavigationFocus } from "react-navigation";

// const { routeName } = this.props.navigation.state.params;

class Login extends Component {

  state = {
    passRecoveryVisible: false,
    response: 'Nothing to display',
    email: '',
    password: '',
    emailForReset: '',
    loading: false,
    userID: null,

    routeName: this.props.navigation.getParam('routeName', null)
  }

  handlerPassRecoveryVisible() {
    this.setState({ passRecoveryVisible: !this.state.passRecoveryVisible })
  }

  static navigationOptions = {
    title: 'Anmeldung'
  }

  logInHandler() {
    const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const { email, password, routeName } = this.state;
    if (emailChecker.test(email) && password.length >= 3) {
      this.setState({ loading: true })
      this.props.setLoggedUserId(null)
      logIn(email, password, routeName)
      console.log('this.state', this.state);
      
    } else {
      Alert.alert('Fehler', 'E-Mail oder Passwort sind ungültig')
    }
  }

  componentWillMount() {
    this.getUserID()
  }

  getUserID = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID')
      if (userID && userID !== 'notloggedin') {
        Alert.alert(
          'Abmelden',
          'Sind Sie sicher, dass Sie sich abmelden möchten?',
          [
            {
              text: 'Nein',
              onPress: () => this.props.navigation.goBack(),

              style: 'cancel',
            },
            {
              text: 'Ja',
              onPress: async () => {
                await this.props.setLoggedUserId('notloggedin')
                await this.props.setLoggedUserInfo({})
                await RNRestart.Restart()
              }
            }
          ],
          { cancelable: false })
      }
      // console.log(userID);
      this.setState({ userID })
    } catch (e) {
      // read error
    }
    console.log('Done')
  }

  handlePassReset() {
    const email = this.state.emailForReset
    if (!email) {
      alert('Bitte geben Sie Ihre E-Mail ein')
    } else {
      const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailChecker.test(email)) {
        alert('Die E-Mail-Adresse ist ungültig')
        return false
      } else {
        resetPassword(email)
      }
    }

  }


  render() {

    if (this.state.loading && !this.props.userID) {
      return <Loading />
    }

    if (this.props.userID === "notloggedin") {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ marginHorizontal: 18 }}>
            <Input
              placeholder='Ihre E-Mail'
              required
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              autoCapitalize='none'
            />
            <Input
              placeholder='Passwort'
              password
              autoCapitalize='none'
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.handlerPassRecoveryVisible()}>
                <Text style={styles.forgetPass}>
                  Passwort vergessen?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>
                <Text style={styles.forgetPass}>
                  Anmeldung
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <FooterButton text='Anmelden mit' onPress={() => { this.logInHandler() }} />
          {/* <FooterButton text='Anmelden mit' onPress={() => console.log(logIn('test@gmail.com', 'testtest'))}/> */}
          <ModalView
            title='Passwort zurücksetzen'
            buttonText='Senden'
            onSubmit={() => this.handlePassReset()}
            onRequestClose={() => this.handlerPassRecoveryVisible()}
            visible={this.state.passRecoveryVisible}
          >
            <Input placeholder='Email' value={this.state.emailForReset} onChangeText={emailForReset => this.setState({ emailForReset })} autoCapitalize='none' />
          </ModalView>
        </View>
      )
    }

    else {
      return (
        <ScrollView style={{ marginHorizontal: 18 }} showsVerticalScrollIndicator={false} >
          {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false} > */}
          <Text style={styles.points}>
            Ihre Punkte: {this.props.points}
          </Text>
          <ButtonItem text='Persönliche Angaben' onPress={() => this.props.navigation.navigate('PersonalData')} />
          <ButtonItem text='Bestellungen' onPress={() => this.props.navigation.navigate('Orders')} />
          <ButtonItem text='Widerrufsrecht  ' onPress={() => this.props.navigation.navigate('Orders', { selected: 'Retouren' })} />
          <ButtonItem text='Paket verfolgen' onPress={() => { }} />
          <ButtonItem text='Wunschzettel' onPress={() => { this.props.navigation.navigate('Favourite') }} />
          <ButtonItem text='Abmelden' onPress={() => { this.props.navigation.navigate('Login') }} />
        </ScrollView>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID
  }
}

export default connect(mapStateToProps, actions)(Login)

const styles = {
  forgetPass: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 24,
    color: '#000',
  },
  payPalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#232c65',
    borderRadius: 5,
    marginHorizontal: 18,
    height: 40,
    marginBottom: 20
  },
  payPalButtonText: {
    fontSize: 16,
    color: '#030303'
  },
  payPalImageStyle: {
    height: 40,
    marginLeft: 12,
    resizeMode: 'contain'
  },
  points: {
    marginVertical: 16,
    color: '#d10019',
    fontSize: 16,
    fontWeight: 'bold',
  }
}
