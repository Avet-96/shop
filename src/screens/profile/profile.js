import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { SearchButton, MenuButton } from '../../common/header-buttons';

import { connect } from 'react-redux'

import ButtonItem from '../../common/button-item';


class Profile extends Component {

  state = {
    routeName: 'Profile'
  }
  static navigationOptions = {
    headerLeft: MenuButton,
    headerRight: (
      <View style = {{flexDirection: 'row', marginRight: 9}}>
        <SearchButton />
      </View>
    ),
    title: 'Profil',
  }

  render(){
    return(
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
        <Text style={styles.points}>
            Ihre Punkte: {this.props.points}
        </Text>
        <ButtonItem text='Persönliche Angaben' onPress={() => this.props.navigation.navigate('PersonalData')} />
        <ButtonItem text='Bestellungen' onPress={() => this.props.navigation.navigate('Orders')} />
        <ButtonItem text='Widerrufsrecht  ' onPress={() => this.props.navigation.navigate('Orders', {selected: 'Retouren'})} />
        <ButtonItem text='Paket verfolgen' onPress={() => {}} />
        <ButtonItem text='Wunschzettel' onPress={() => {this.props.navigation.navigate('Favourite')}} />
        <ButtonItem text='Abmelden' onPress={() => {this.props.navigation.navigate('Login', {routeName: this.state.routeName})}} />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({userInfo}) => (
  userInfo
)

export default connect(mapStateToProps)(Profile)

const styles = {
  container: {
    marginHorizontal: 18
  },
  points: {
    marginVertical: 16,
    color: '#d10019',
    fontSize: 16,
    fontWeight: 'bold',
  }
}
