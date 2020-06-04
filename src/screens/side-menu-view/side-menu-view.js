import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';

import { connect } from 'react-redux';

import * as actions from '../../actions/login-actions'

import { SafeAreaView } from 'react-navigation';

import NavigationService from '../../navigation-service';

import { sHeight } from '../../helpers/screenSize';

import handlePress from '../../app/app'

class SideMenuView extends Component {

  getStyles(user) {
    if (this.props.selectedUserType === user) {
      return {
        block: styles.selectedUser,
        text: styles.selectedUserText
      }
    }
    return {
      block: styles.unselectedUser,
      text: styles.unselectedUserText
    }
  }

  setUserType(userType) {
    this.props.setUserType(userType)
  }


  render() {
    const isLoggedIn = this.props.userID !== 'notloggedin' && this.props.loaded
    const loginButtonText = isLoggedIn ? 'Ausloggen' : 'Anmelden'
    return (
      <SafeAreaView forceInset={{ bottom: 'never' }} style={{ flex: 1, backgroundColor: '#d10019' }}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'flex-end' }}>
          <View style={styles.topContainerStyle}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Image style={styles.logoStyle} source={require('../../assets/teleropa-logo.png')} key={'sideMenuTeleropaLogo'} />
            </View>
            <View style={styles.userTypeViewStyle}>

              <TouchableOpacity style={this.getStyles('EK').block} onPress={() => this.setUserType('EK')}>
                <Text style={this.getStyles('EK').text}> Privatkunde </Text>
              </TouchableOpacity>

              <TouchableOpacity style={this.getStyles('H').block} onPress={() => this.setUserType('H')}>
                <Text style={this.getStyles('H').text}> Firma </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, marginHorizontal: 18, marginVertical: 10 }} >
              <View style={{ height: sHeight - 175, justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <MenuButton text='Startseite' imgSrc={require('../../assets/icons/011-house.png')} route='Main' />
                  <MenuButton text='Kategorien' imgSrc={require('../../assets/icons/012-menu-1.png')} route='CategoriesList' userType={this.props} />   
                  {isLoggedIn ? <MenuButton text='Profil' imgSrc={require('../../assets/icons/013-user.png')} route={'Profile'} /> : null}
                  {isLoggedIn ? <MenuButton text='Merkliste' imgSrc={require('../../assets/icons/004-heart.png')} route={'Favourite'} /> : null}
                  <MenuButton text='Warenkorb' imgSrc={require('../../assets/icons/002-shopping-cart.png')} route='Cart' />
                  <View style={styles.line} />
                  <MenuButton text='Information' imgSrc={require('../../assets/icons/043-info.png')} route='Info' />
                  <MenuButton text={loginButtonText} imgSrc={require('../../assets/icons-color/sign-in.png')} route='Login' />
                </View>
                {/* <TouchableOpacity style={styles.whatsUpButton} > */}
                <TouchableOpacity style={styles.whatsUpButton} onPress={() =>
                  Linking.canOpenURL('whatsapp://send?phone=491707046434')
                    .then((supported) => {
                      if (!supported) {
                        return Linking.openURL("market://details?id=com.whatsapp");
                      } else {
                        return Linking.openURL('whatsapp://send?phone=491707046434');
                      }
                    })
                    .catch((err) => console.error('An error occurred', err))}>
                  <Image source={require('../../assets/icons-color/044-whatsapp-white.png')} style={styles.whatsUpImage} key={'whatsUpImage'} />
                  <Text style={styles.whatsUpButtonText}> Whatsapp Chat </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

        </View>
      </SafeAreaView>
    )
  }

}

const MenuButton = ({ text, imgSrc, route, onPress, userType }) => {
  //NavigationService.navigate('ProductSubscribe', { productID: this.props.id })
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.closeDrawer()
        NavigationService.navigate(route, { userInfoType: userType })
      }}
      style={styles.buttonContainerStyle}
    >
      <Image source={imgSrc} style={styles.buttonImageStyle} key={imgSrc} />
      <Text style={styles.buttonTextStyle}> {text} </Text>
    </TouchableOpacity>
  )
}

const mapStateToProps = (state) => (
  {
    userID: state.userID,
    loaded: state.app.loaded,
    selectedUserType: state.userInfo.selectedUserType
  }
)

export default connect(mapStateToProps, actions)(SideMenuView)

const styles = {
  whatsUpImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  whatsUpButtonText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 20
  },
  whatsUpButton: {
    marginTop: 20,
    height: 39,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 3.3,
    backgroundColor: '#3f911b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    height: 0.5,
    backgroundColor: '#a0a0a0',
    marginVertical: 5
  },
  buttonTextStyle: {
    marginLeft: 13,
    fontSize: 16,
    color: '#000',
  },
  buttonImageStyle: {
    height: 21,
    width: 25,
    resizeMode: 'contain'
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingVertical: 10,
  },
  topContainerStyle: {
    height: 94,
    marginBottom: 6,
    backgroundColor: '#d10019',
    flexDirection: 'column'
  },
  logoStyle: {
    marginLeft: 10,
    height: 40,
    width: 100,
    resizeMode: 'contain'
  },
  userTypeViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  selectedUser: {
    marginBottom: 1,
    height: 44,
    borderBottomWidth: 1.7,
    borderColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  unselectedUser: {
    marginBottom: 1,
    height: 44,
    borderBottomWidth: 1.7,
    borderColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  selectedUserText: {
    fontSize: 16,
    color: '#fff'
  },
  unselectedUserText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)'
  }
}
