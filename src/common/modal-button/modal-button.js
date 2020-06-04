import React from 'react';

import { Text, TouchableOpacity } from 'react-native';

const ModalButton = ({text, onPress}) => {
  return(
    <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
      <Text style={styles.textStyle} >{text}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    // marginTop: 26,
    backgroundColor: '#c00017',
    height: 34,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 0
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    alignSelf: 'center'
  }
}

export default ModalButton;
