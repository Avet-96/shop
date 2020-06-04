import React from 'react';

import { View, Image, TouchableWithoutFeedback, Text } from 'react-native';

const PaymentOption = ({imageSource, text, selected, onPress}) => {
  return(
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.container} >
          <View style={selected ? styles.selectedDotStyle : styles.dotStyle}>
          </View>
          <View style={styles.contentStyle}>
            <Image style={styles.imageStyle} source={imageSource} key={imageSource} />
            <Text style={styles.textStyle}> {text} </Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  dotStyle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 0.7,
    borderColor: '#a0a0a0'
  },
  selectedDotStyle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 3.5,
    borderColor: '#c00017'
  },
  contentStyle: {
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  imageStyle: {
    width: 90,
    height: 26,
    resizeMode: 'contain',
    marginBottom: 10
  },
  textStyle: {
    fontSize: 10,
    lineHeight: 16,
    color: '#a0a0a0'
  }
}
export default PaymentOption;
