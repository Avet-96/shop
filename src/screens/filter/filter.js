import React, { Component } from 'react';

import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import { sWidth } from '../../helpers/screenSize';

import FooterButton from '../../common/footer-button';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

export default class Filter extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      title: 'Filter',
      headerRight: (
        <TouchableOpacity onPress={() => params.resetFilter()} style={{ height: '100%', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 16, marginRight: 18 }}>Zurücksetzen</Text>
        </TouchableOpacity>
      )
    })
  }

  componentDidMount() {
    this.props.navigation.setParams({
      resetFilter: this.resetFilter
    })
  }

  state = {
    from: this.props.navigation.getParam('fromPrice', 0),
    to: this.props.navigation.getParam('toPrice', 1000),
    min: this.props.navigation.getParam('minPrice', 0),
    max: this.props.navigation.getParam('maxPrice', 1000),
    sortBy: this.props.navigation.getParam('sortBy', 'popular'),
    scrollEnabled: true
  }

  enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });


  resetFilter = () => {
    this.setState({ from: this.props.navigation.getParam('minPrice', 0), to: this.props.navigation.getParam('maxPrice', 1000), sortBy: 'popular' })
  }

  getButtonStyle(sortBy) {
    if (sortBy === this.state.sortBy) {
      return styles.selectedSortButton
    }
    return styles.sortButton
  }

  getTextStyle(sortBy) {
    if (sortBy === this.state.sortBy) {
      return styles.selectedSortButtonText
    }
    return styles.sortButtonText
  }

  render() {    
    return (
      <View style={{ flex: 1, marginTop: 12 }}>
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <Text style={styles.helperTextStyle}> Sortieren nach </Text>
          <View style={styles.sortBlockStyle}>
            <View style={styles.sortLine}>
              <TouchableOpacity onPress={() => { this.setState({ sortBy: 'popular' }) }} style={this.getButtonStyle('popular')}>
                <Text style={this.getTextStyle('popular')}> Beliebtheiten </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ sortBy: 'alphabet' }) }} style={this.getButtonStyle('alphabet')}>
                <Text style={this.getTextStyle('alphabet')}> Artikelbezeichnung </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sortLine}>
              <TouchableOpacity onPress={() => { this.setState({ sortBy: 'price_down' }) }} style={this.getButtonStyle('price_down')}>
                <Text style={this.getTextStyle('price_down')}> Höchster Preis </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setState({ sortBy: 'price_up' }) }} style={this.getButtonStyle('price_up')}>
                <Text style={this.getTextStyle('price_up')}> Niedrigster Preis </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.helperTextStyle}> Preis </Text>
          <View style={styles.sortLine}>
            <View style={styles.inputContainer}>
              <Text style={styles.fromToTextStyle}>von</Text>
              <TextInput
                keyboardType='number-pad'
                style={styles.inputStyle}
                value={'' + this.state.from}
                onChangeText={(from) => {
                  const newFrom = + from.replace(/[^0-9]/g, '')
                  if (newFrom > this.state.max) {
                    this.setState({
                      from: this.state.max
                    })
                  } else {
                    this.setState({
                      from: newFrom
                    })
                  }

                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.fromToTextStyle}>bis</Text>
              <TextInput
                keyboardType='number-pad'
                style={styles.inputStyle}
                value={'' + this.state.to}
                onChangeText={(to) => {
                  const newTo = + to.replace(/[^0-9]/g, '')
                  if (newTo > this.state.max) {
                    this.setState({
                      to: this.state.max
                    })
                  } else {
                    this.setState({
                      to: newTo
                    })
                  }
                }} />
            </View>
          </View>
          <View style={{ marginHorizontal: 32 }}>
            <MultiSlider
              customMarker={() => {
                return (<View style={styles.sliderCircle}></View>)
              }}
              values={
                [
                  this.state.from,
                  this.state.to
                ]
              }
              onValuesChange={(values) => {
                this.setState({ from: values[0], to: values[1] })
              }}
              selectedStyle={{
                backgroundColor: '#fcb6be',
                height: 3.3
              }}
              unselectedStyle={{
                backgroundColor: '#f5e0e2'
              }}
              min={this.state.min}
              max={this.state.max}
              step={1}
              onValuesChangeStart={this.disableScroll}
              onValuesChangeFinish={this.enableScroll}
              snapped
              sliderLength={sWidth - 64}
            />
          </View>
        </ScrollView>
        <FooterButton onPress={() => { this.props.navigation.navigate('Search', { filterOptions: this.state }) }} text='Filtern' />
      </View>

    )
  }
}

const styles = {
  sliderCircle: {
    height: 27,
    width: 27,
    borderRadius: 13.5,
    backgroundColor: '#d10019'
  },
  sortLine: {
    marginBottom: 14,
    flexDirection: 'row',
    marginRight: 18,
    marginLeft: 4,
  },
  helperTextStyle: {
    marginLeft: 18,
    marginTop: 8,
    marginBottom: 15,
    fontSize: 12,
    color: '#a0a0a0',
  },
  fromToTextStyle: {
    marginLeft: 10,
    height: 34,
    color: '#a0a0a0',
    fontSize: 12,
    lineHeight: 36.5
  },
  inputStyle: {
    padding: 0,
    flex: 1,
    height: 34,
    marginLeft: 6,
    fontSize: 16
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: 14,
    height: 34,
    flex: 1,
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'rgb(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  selectedSortButton: {
    height: 34,
    marginLeft: 14,
    flex: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d10019'
  },
  sortButton: {
    flexDirection: 'row',
    marginLeft: 14,
    height: 34,
    flex: 1,
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'rgb(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  sortButtonText: {
    color: '#141414',
    fontSize: 16
  },
  selectedSortButtonText: {
    color: '#fff',
    fontSize: 16
  }
}
