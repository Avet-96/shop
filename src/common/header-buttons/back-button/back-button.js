import React from 'react';
import { Image, View, Platform } from 'react-native';


const BackButton = () => {
    return (
        <Image
          source={require('../../../assets/icons-color/017-back-white.png')}
          style={styles.backButtonImageStyle}
          key={'backImage'}
        />

    );
}

const styles = {

  backButtonImageStyle: {
    margin: 10,
    height: 20,
    width: 30,
    resizeMode: 'contain'
  }
}


export default BackButton;
