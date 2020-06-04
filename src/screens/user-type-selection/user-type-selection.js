import React, { Component } from 'react';

import { View, Text } from 'react-native';


import * as actions from '../../actions/login-actions'

import { connect } from 'react-redux'


import FooterButton from '../../common/footer-button';
import UserButton from '../../common/start-buttons/user-button';
import CompanyButton from '../../common/start-buttons/company-button';

class UserTypeSelection extends Component {
  state = {
    selected: 'EK'
  }

  setUserTypeAndGo() {
      // AsyncStorage.setItem('userSelectedType', this.state.selected)      
      this.props.setUserType(this.state.selected)
      this.props.navigation.replace('Main')
  }

  render() {    
    return(
      <View style={styles.mainContainer}>
        <View style={styles.title}>
          <Text style={styles.titleText}>
              Bitte wählen Sie, ob Sie im Shop als Unternehmen oder als Privatperson kaufen möchten.
          </Text>
        </View>

        <View style={{flex: 2, flexDirection:'row', justifyContent: 'space-around'}}>
            <UserButton selected={'EK'===this.state.selected} onPress={() => this.setState({selected: 'EK'})} />
            <CompanyButton  selected={'H'===this.state.selected} onPress={() => this.setState({selected: 'H'})} />
        </View>
        <FooterButton onPress={() => this.setUserTypeAndGo()} text={'Starten!'} />
      </View>
    );
  }
}

export default connect(null, actions)(UserTypeSelection)

const styles = {
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    textAlign: 'center',
    width: 280,
    fontSize: 20,
    lineHeight: 33,
    color: '#000'
  }
}
