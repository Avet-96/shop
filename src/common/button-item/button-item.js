import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ButtonItem = ({text, onPress}) => {

  return(
    <TouchableOpacity onPress={() => onPress()}style={styles.buttonItemStyle}>
      <Text style={styles.buttonTextStyle}>
        {text}
      </Text>
      <Image style={styles.imageStyle} source={require('../../assets/icons/051-right.png')} key={'buttonItemImage'}/>
    </TouchableOpacity>
  )
}

const styles = {
  buttonItemStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.7,
    borderColor: '#a0a0a0'
  },
  buttonTextStyle: {
    lineHeight: 24,
    fontSize: 16,
    color: '#1a1a1a',
    marginVertical: 20
  },
  imageStyle: {
    height: 14,
    width: 20,
    resizeMode: 'contain'
  }
}

export default ButtonItem;
