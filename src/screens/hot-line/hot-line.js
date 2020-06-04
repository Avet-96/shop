import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Platform } from 'react-native';

import SearchButton from '../../common/header-buttons/search-button';


export default class HotLine extends Component {
  static navigationOptions = {
    title: 'Hotline',
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 18}}>
        <SearchButton />
      </View>
    )
  }

  call(phone) {
      let number = phone;
      if (Platform.OS === 'ios') {
          number = `telpromtp:${phone}`
      } else {
          number = `tel:${phone}`
      }
      Linking.canOpenURL(number)
      .then(supported => {
          if (!supported) {
              alert('Phone call is unavailable')
          } else {
              return Linking.openURL(number)
          }
      })
      .catch(error => console.log(error))
  }

  mail(email) {
      let address = email;
      if (Platform.OS === 'ios') {
          address = `message:${email}`
      } else {
          address = `mailto:${email}`
      }
      Linking.canOpenURL(address)
      .then(supported => {
          if (!supported) {
              alert('Email is unavailable')
          } else {
              return Linking.openURL(address)
          }
      })
      .catch(error => console.log(error))
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <Text style={styles.titleStyle}> Telefonische Unterstützung und Beratung unter: </Text>
        <View style={styles.contentStyle}>
          <Text style={styles.subtitleStyle}>
            Online-Handel
          </Text>
          <TouchableOpacity style={styles.infoStyle} onPress={() => this.call('4906592984870')} >
            <Image style={styles.imageStyle} source={require('../../assets/icons/045-phone-1.png')} key={'phone-1'} />
            <Text  style={styles.infoTextStyle}>+49 (0) 6592 98487 0</Text>
          </TouchableOpacity>
          <Text style={styles.subtitleStyle}>
            Fachmarkt in Daun
          </Text>
          <TouchableOpacity style={styles.infoStyle} onPress={() => this.call('4906592173060')} >
            <Image style={styles.imageStyle} source={require('../../assets/icons/045-phone-1.png')} key={'phone-2'} />
            <Text style={styles.infoTextStyle}>+49 (0) 6592 173060</Text>
          </TouchableOpacity>
          <Text style={styles.subtitleStyle}>
            E-Mail
          </Text>
          <TouchableOpacity style={styles.infoStyle} onPress={() => this.mail('imfo@teleropa.de')}>
            <Image style={styles.imageStyle} source={require('../../assets/icons/046-contact.png')} key={'phone-3'}/>
            <Text style={styles.infoTextStyle}>info@teleropa.de</Text>
          </TouchableOpacity>
          <Text style={styles.subtitleStyle}>
            Social
          </Text>
          <View style={{flexDirection: 'row'}} >
              <Image source={require('../../assets/social/facebook.png')} style={styles.socialImage} key={'facebook'} />
              <Image source={require('../../assets/social/twitter.png')}  style={styles.socialImage} key={'twitter'} />
              <Image source={require('../../assets/social/youtube.png')}  style={styles.socialImage} key={'youtube'} />
              <Image source={require('../../assets/social/instagram.png')}  style={styles.socialImage} key={'instagram'} />
          </View>
        </View>
      </View>
    );
  }
}


const styles = {
  socialImage: {
      height: 40,
      width: 40,
      marginRight: 20,
      resizeMode: 'contain'
  },
  titleStyle: {
    alignSelf: 'center',
    margin: 20,
    fontSize: 12,
    lineHeight: 16,
    color: '#090909'
  },
  contentStyle: {
    marginLeft: 18,
    marginRight: 18
  },
  subtitleStyle: {
    fontSize: 16,
    lineHeight: 16,
    color: '#090909',
    marginBottom: 20
  },
  infoStyle: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#fb0102',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  imageStyle: {
    margin: -10,
    height: 17,
    resizeMode: 'contain'
  },
  infoTextStyle: {
    fontSize: 16,
    lineHeight: 16,
    color: '#090909'
  }
}
