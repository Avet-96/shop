import React, { Component } from 'react';

import { TouchableWithoutFeedback, View, Text, Image } from 'react-native';

export default class Checkbox extends Component {
  render() {
    return(
      <TouchableWithoutFeedback style={styles.container} onPress={() => this.props.onPress()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.checkboxStyle}>
                {this.props.checked ? <Image source={require('../../assets/icons-color/041-tick2.png')} style={styles.image} key={'tickCheckbox'} /> : null}
              </View>
              <Text style={styles.checkboxTextStyle}>{this.props.text}</Text>
          </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxStyle: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#a0a0a0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxTextStyle: {
    marginLeft: 14,
    color: '#050505',
    lineHeight: 24,
    fontSize: 12,
  },
  image: {
    height: 10,
    width: 14,
    resizeMode: 'contain'
  }
}
