import React, { Component } from 'react';

import { View, Text } from 'react-native';

// import { RNCamera } from 'react-native-camera';

export default class Scaner extends Component {

  static navigationOptions = {
    title: 'Scanner'
  }

  render() {
    return(
      <View style={{flex: 1}}>
          {/* <RNCamera 
              style={{flex: 1}}
              type={RNCamera.Constants.Type.back}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
              onBarCodeRead={({ data }) => {
                this.props.navigation.navigate('Search', { searchText: data, show: true })
                // alert(data);
              }}
          /> */}
          <View style={styles.instructionsBlock}>

              <Text style={styles.topText}>
                    Mit dem Scanner können Sie detaillierte Informationen zu Produkten erhalten
              </Text>
              <View style={styles.barContainer}>
                <View style={styles.leftTop}></View>
                <View style={styles.rightTop}></View>
                <View style={styles.leftBottom}></View>
                <View style={styles.rightBottom}></View>
              </View>
              <Text style={styles.bottomText}>
                    Halten Sie den Barcode oder QR-Code in den Rahmen. Er wird automatisch gescannt
              </Text>
          </View>
      </View>
    )
  }
}

const styles = {
  instructionsBlock: {
    position: 'absolute', 
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'center'
  },
  topText: {
    position: 'absolute', 
    top: 22,
    fontSize: 14,
    lineHeight: 24,
    color: '#fff',
    width: 310,
    textAlign: 'center'
  },
  bottomText: {
    position: 'absolute', 
    bottom: 80,
    fontSize: 14,
    lineHeight: 24,
    color: '#fff',
    width: 310,
    textAlign: 'center'
  },
  barContainer: {
    width: 240,
    height: 190,
  },
  leftTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 32,
    height: 32,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#fff'
  },
  rightTop: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#fff'
  },
  leftBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#fff'
  },
  rightBottom: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff'
  }
}