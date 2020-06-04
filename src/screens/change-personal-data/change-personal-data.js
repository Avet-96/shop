import React, { Component } from 'react';

import { View, Text, ScrollView, Platform, TouchableOpacity, DatePickerAndroid, DatePickerIOS } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { changeUserInfo } from '../../posts/userDataPosts'

import { connect } from 'react-redux';

import Loading from '../loading';
import PickerInput from '../../common/picker-input';
import Input from '../../common/input';
import FooterButton from '../../common/footer-button';
import ModalView from '../../common/modal-view';


class ChangePersonalData extends Component {

  static navigationOptions = {
    title: 'Persönliche Angaben'
  }

  state={
    datePickerVisible: false
  }

  setDate (birthDate) {
    // const month = notFormatedMonth+1<10 ? '0' + (notFormatedMonth+1) : notFormatedMonth
    // const day = notFormatedDay<10 ? '0' + notFormatedDay : notFormatedDay
    // const birthDate = `${month}.${day}.${year}`
    this.setState({birthDate})
  }

  componentDidMount() {
    const {name, surname, birthDate, gender} = this.props.userInfo
      this.setState({
        datePickerVisible: false,
        name,
        surname,
        birthDate: birthDate ? new Date(birthDate) : '',
        gender
      })
  }

  birthRender() {
    console.log(this.state)
    return Platform.OS === 'ios' ? (
      <>
          <TouchableOpacity onPress={() => this.setState({datePickerVisible: !this.state.datePickerVisible})} >
              { this.state.birthDate ? ( 
                  <View style={styles.dateBox}>
                      <Text style={[styles.dateStyle, {color: '#050505'}]}> {this.state.birthDate.getFullYear() + '.' + (this.state.birthDate.getMonth()+1) + '.' + this.state.birthDate.getDate() } </Text>
                  </View>) 
                  : (
                    <View style={styles.dateBox}>
                      <Text style={styles.dateStyle}>Geburtstag</Text>
                    </View>
                    ) 
              }
          </TouchableOpacity>
          <ModalView 
            visible={this.state.datePickerVisible}
            onSubmit={() => this.setState({datePickerVisible: !this.state.datePickerVisible})}
            onRequestClose={() => this.setState({datePickerVisible: !this.state.datePickerVisible})}
            buttonText='Speichern'
          >
              <DatePickerIOS
                  date={this.state.birthDate ? this.state.birthDate : new Date()}
                  maximumDate={new Date()}
                  mode='date'
                  onDateChange={(value) => this.setDate(value)}
              />
          </ModalView>
      </>
    ) : (
      <>
          <TouchableOpacity onPress={ async () =>  {
                try {
                  const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date(),
                    maxDate: new Date()
                  });
                  if (action !== DatePickerAndroid.dismissedAction) {
                    this.setState({birthDate: `${day}.${month}.${year}`})
                    // Selected year, month (0-11), day
                  }
                } catch ({code, message}) {
                  console.warn('Cannot open date picker', message);
                }
              }}>
                  { this.state.birthDate ? ( 
                      <View style={styles.dateBox}>
                          <Text style={[styles.dateStyle, {color: '#050505'}]}> {this.state.birthDate} </Text>
                      </View>) 
                      : (
                        <View style={styles.dateBox}>
                          <Text style={styles.dateStyle}>Geburtstag</Text>
                        </View>
                        ) 
                  }
          </TouchableOpacity>
      </>
    )
  }

  handleButtonClick() {
    if(this.isFormValid()) {
      const {name, surname, gender, birthDate} = this.state
      const birthday = birthDate ? birthDate.getFullYear() + '-' + (birthDate.getMonth()+1) + '-' + birthDate.getDate() : null
      changeUserInfo(this.props.userID, name, surname, birthday, gender)
    }
    
  }

  isFormValid() {
    const {name, surname, gender} = this.state
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
    return true
  }

  render(){
    if(!this.state.name) {
      return <Loading />
    }
    return(
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView style={{marginHorizontal: 18}} showsVerticalScrollIndicator={false}>
          <PickerInput
            placeholder='Geschlecht'
            selected={this.state.gender}
            values={['Herr','Frau']}
            onValueChange={gender => this.setState({gender})}
          />
          <Text style={styles.helperTextStyle}> Vorname </Text>
          <Input value={this.state.name}
            onChangeText={(name) => {this.setState({name})}}
          />
          <Text style={styles.helperTextStyle}> Nachname </Text>
          <Input value={this.state.surname}
            onChangeText={(surname) => {this.setState({surname})}}
          />
          <Text style={styles.helperTextStyle}> Geburtstag </Text>
          {/* <Input value={this.state.birthday}/> */}
          {this.birthRender()}
        </KeyboardAwareScrollView>
        <FooterButton text='Speichern' onPress={() => this.handleButtonClick()}/>
      </View>
    )
  }
}

const mapStateToProps = ({userInfo, userID}) => (
  {userInfo, userID}
)

export default connect(mapStateToProps)(ChangePersonalData)


const styles = {
  helperTextStyle: {
    fontSize: 12,
    color: '#a0a0a0',
    marginTop: 8,
    marginBottom: -12,
    marginLeft: -2
  },
  dateStyle: {
    fontSize: 16,
    paddingLeft: 0,
    width: '90%',
    flex: 1,
    marginLeft: 0,
    color: '#a0a0a0'
  },
  dateBox: {
    height: 56,
    borderBottomWidth: 0.7,
    borderColor: '#949494',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  }
}
