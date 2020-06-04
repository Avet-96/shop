import React from 'react';

import { View, TouchableWithoutFeedback, Text } from 'react-native';

const DeliveryOption = ({name, description, selected, onPress}) => {
  return(
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <View style={styles.container}>
          <View style={selected ? styles.selectedDotStyle : styles.dotStyle}>
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.nameStyle}> {name} </Text>
            {description ? <Text style={styles.textStyle}> {description} </Text> : null}
          </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10
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
  nameStyle: {
    fontSize: 16
  },
  textStyle: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 16,
    color: '#a0a0a0'
  }
}
export default DeliveryOption;
