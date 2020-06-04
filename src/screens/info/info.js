import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';


import { SearchButton, MenuButton } from '../../common/header-buttons';

import ButtonItem from '../../common/button-item';

import Input from '../../common/input';

import ModalView from '../../common/modal-view';
// import ButtonListItem from '../../button-list-item';


export default class Info extends Component {
  static navigationOptions = {
    headerLeft: (<MenuButton onPress={() => this.props.navigation.navigate('Subscribe')}/>),
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 9}}>
        <SearchButton />
      </View>
    ),
    title: 'Information',
  }
  render(){
    return(
      <ScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false} >
        <ButtonItem onPress={() => this.props.navigation.navigate('TermsDeliveryPayment')} text='Zahlungs- und Versandbedingungen'/>
        <ButtonItem onPress={() => this.props.navigation.navigate('TermsReturn')} text='Widerrufsrecht  '/>
        <ButtonItem onPress={() => this.props.navigation.navigate('Feedback')} text='Kontakt '/>
        <ButtonItem onPress={() => this.props.navigation.navigate('TermsConfidentiality')} text='Datenschutz'/>
        <ButtonItem onPress={() => this.props.navigation.navigate('Contacts')} text='Kontaktdaten'/>
        <ButtonItem onPress={() => this.props.navigation.navigate('HotLine')} text='Hotline'/>
        <ButtonItem onPress={() => this.props.navigation.navigate('BecomePartner')} text='Partner werden'/>
        <ButtonItem onPress={() => this.props.navigation.navigate('Career')} text='Karriere'/>
      </ScrollView>
    )

  }
};
