import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, DatePickerAndroid, DatePickerIOS, Platform, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import { register } from '../../posts/authPosts';

import FooterButton from '../../common/footer-button';

import Picker from '../../common/picker-input';
import Input from '../../common/input';
import Checkbox from '../../common/checkbox';
import ModalView from '../../common/modal-view';

import Loading from '../loading'

import { getCountries } from '../../gets/mainPagePosts'


export default class Registration extends Component {

  state = {
    photo: null,
    selectedUserRegType: '',
    datePickerVisible: false,
    availableCountries: null,
    company: '',
    department: '',
    vatId: '',
    salutation: '',
    firstname: '',
    lastname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    phone: '',
    birthDate: null,
    street: '',
    post: '',
    city: '',
    country: '',
    isAgree: false,
    subscribe: false
  }

  static navigationOptions = {
    title: 'Anmeldung',
  }

  handleRegButton() {
    if (this.isFormValid()) {
      const { company, department, vatId, salutation, firstname, lastname, email, passwordOne, phone, street, post, city, country, selectedUserRegType, subscribe } = this.state
      const dateObj = new Date(this.state.birthDate);
      const birthday = dateObj ? dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate() : null
      const userType = selectedUserRegType === 'Firma' ? 'business' : 'private'
      const countryID = this.state.availableCountries.find(({ name }) => name === country).id
      const subscribeForRequest = subscribe ? 1 : 0
      const body = { customerType: userType, salutation, firstname, lastname, email, password: passwordOne, phone, birthday, billingStreet: street, billingZipcode: post, billingCity: city, billingCountry: countryID, billingCompany: company, billingDepartment: department, billingVatId: vatId, newsletterSubscribe: subscribeForRequest }
      if (userType === 'business' && this.state.photo) {
        register(this.createFormData(this.state.photo, body), email, passwordOne)
      } else {
        register(this.createFormData(null, body), email, passwordOne)
      }
    }
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    if (photo) {
      data.append("photo", {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
      });
    }
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  isFormValid() {
    const { company, vatId, salutation, firstname, lastname, email, passwordOne, passwordTwo, street, post, city, country, selectedUserRegType, isAgree } = this.state
    if (!selectedUserRegType) {
      alert('Bitte wählen Sie den Kundentyp')
      return false
    }
    if (!salutation) {
      alert('Bitte wählen Sie Ihr Geschlecht aus')
      return false
    }
    if (selectedUserRegType === 'Firma' && (!company || !vatId)) {
      alert('Bitte geben Sie Information über Ihre Firma ein')
      return false
    }
    if (!firstname) {
      alert('Bitte geben Sie Ihren Vornamen ein')
      return false
    }
    if (!lastname) {
      alert('Bitte geben Sie Ihren Nachnamen ein')
      return false
    }
    if (!email) {
      alert('Bitte geben Sie Ihre E-Mail ein')
      return false
    }
    const emailChecker = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailChecker.test(email)) {
      alert('Die E-Mail-Adresse ist ungültig')
      return false
    }
    if (passwordOne.length < 3 || passwordTwo.length < 3) {
      alert('Das Passwort ist zu kurz')
      return false
    }
    if (passwordOne !== passwordTwo) {
      alert('Das Passwort stimmt nicht überein')
      return false
    }
    if (!street) {
      alert('Bitte geben Sie Ihre Anschrift ein')
      return false
    }
    if (!post) {
      alert('Bitte geben Sie die PLZ ein')
      return false
    }
    if (!city) {
      alert('Bitte geben Sie den Ort ein')
      return false
    }
    if (!country) {
      alert('Bitte wählen Sie Ihr Land aus')
      return false
    }
    if (!isAgree) {
      alert('Bitte akzeptieren Sie unsere AGB')
      return false
    }
    return true
  }

  handlePickerChange(value) {
    this.setState({ selectedUserRegType: value });
  }

  setDate(birthDate) {
    this.setState({ birthDate })
  }

  componentDidMount() {
    getCountries().then(({ countries }) => this.setState({ availableCountries: countries }))
  }

  renderHelper() {
    const datePicker = Platform.OS === 'ios' ? (
      <>
        <TouchableOpacity onPress={() => this.setState({ datePickerVisible: !this.state.datePickerVisible })} >
          {this.state.birthDate ? (
            <View style={styles.dateBox}>
              <Text style={[styles.dateStyle, { color: '#050505' }]}> {this.state.birthDate.getFullYear() + '.' + (this.state.birthDate.getMonth() + 1) + '.' + this.state.birthDate.getDate()} </Text>
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
          onSubmit={() => this.setState({ datePickerVisible: !this.state.datePickerVisible })}
          onRequestClose={() => this.setState({ datePickerVisible: !this.state.datePickerVisible })}
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
          <TouchableOpacity onPress={async () => {
            try {
              const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
                maxDate: new Date()
              });
              if (action !== DatePickerAndroid.dismissedAction) {
                this.setState({ birthDate: `${day}.${month}.${year}` })
                // Selected year, month (0-11), day
              }
            } catch ({ code, message }) {
              console.warn('Cannot open date picker', message);
            }
          }}>
            {this.state.birthDate ? (
              <View style={styles.dateBox}>
                <Text style={[styles.dateStyle, { color: '#050505' }]}> {this.state.birthDate} </Text>
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

    return (
      <View>
        {this.getCompanyFields()}
        <Picker
          placeholder='Geschlecht*'
          onValueChange={(salutation) => { this.setState({ salutation }) }}
          selected={this.state.salutation}
          values={['Herr', 'Frau']}
        />
        <Input placeholder='Vorname*' value={this.state.firstname} onChangeText={firstname => this.setState({ firstname })} />
        <Input placeholder='Nachname*' value={this.state.lastname} onChangeText={lastname => this.setState({ lastname })} />
        <Input placeholder='Email*' autoCapitalize='none' value={this.state.email} onChangeText={email => this.setState({ email })} />
        <Input placeholder='Passwort*' password value={this.state.passwordOne} onChangeText={passwordOne => this.setState({ passwordOne })} />
        <Input placeholder='Passwort wiederholen*' password value={this.state.passwordTwo} onChangeText={passwordTwo => this.setState({ passwordTwo })} />
        <Input placeholder='Telefon'
          keyboardType='phone-pad'
          value={'' + this.state.phone}
          onChangeText={(phone) => this.setState({
            phone: + phone.replace(/[^0-9]/g, ''),
          })}
        />
        {datePicker}
        <Text style={{ marginTop: 10 }}>Ihre Adresse</Text>
        <Input placeholder='Straße und Nr.*' value={this.state.street} onChangeText={street => this.setState({ street })} />
        <Input placeholder='PLZ*' value={this.state.post} onChangeText={post => this.setState({ post })} />
        <Input placeholder='Ort*' value={this.state.city} onChangeText={city => this.setState({ city })} />
        <Picker placeholder='Land*' selected={this.state.country} onValueChange={country => this.setState({ country })} values={this.state.availableCountries.map(({ name }) => name)} />
        <View style={{ marginVertical: 16 }}>
          <Checkbox text='Ich habe die Datenschutzbestimmungen zur Kenntnis genommen.' onPress={() => { this.setState({ isAgree: !this.state.isAgree }) }} checked={this.state.isAgree} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Checkbox text='Newsletter anmelden' onPress={() => this.setState({ subscribe: !this.state.subscribe })} checked={this.state.subscribe} />
        </View>

      </View>
    )

  }

  handleChoosePhoto() {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  getCompanyFields() {
    if (this.state.selectedUserRegType === 'Firma') {
      const { photo } = this.state
      return (
        <View>
          <Input placeholder='Firmennamen*' value={this.state.company} onChangeText={company => this.setState({ company })} />
          <Input placeholder='Abteilung' value={this.state.department} onChangeText={department => this.setState({ department })} />
          <Input placeholder='Steuernummer*' value={this.state.vatId} onChangeText={vatId => this.setState({ vatId })} />
          <Text style={styles.licenseText}>Handelslizenz</Text>
          {photo && (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
            </View>
          )}
          <TouchableOpacity onPress={() => this.handleChoosePhoto()} style={styles.licenseFileButton}>
            <Text style={styles.licenseFileButtonText}>Datei hochladen</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    console.log(this.state)
    if (!this.state.availableCountries) return <Loading />
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 18 }} showsVerticalScrollIndicator={false}>
          <Picker
            placeholder='Ich bin Neukunde*'
            selected={this.state.selectedUserRegType}
            onValueChange={(value) => this.handlePickerChange(value)}
            values={['Privatkunde', 'Firma']}
          />

          {this.renderHelper()}

        </ScrollView>
        <FooterButton onPress={() => this.handleRegButton()} text={'Ich bin'} />
      </View>
    )
  }
}

const styles = {
  licenseText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 18,
    marginBottom: 14
  },
  licenseFileButton: {
    height: 38,
    borderWidth: 0.3,
    borderColor: '#000000',
    borderRadius: 5,
    justifyContent: 'center'
  },
  licenseFileButtonText: {
    alignSelf: 'center',
    fontSize: 12
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
