import React from 'react';
import { Image, Platform } from 'react-native';


const CloseButton = () => {
    return (
        <Image
          source={require('../../../assets/icons-color/009-close-white.png')}
          style={styles.closeButtonStyle}
          key={'headerClose'}
        />
    );

}

const styles = {
  closeButtonStyle: {
    height: 20,
    width: 30,
    margin: Platform.OS === 'ios' ? 12 : 10,
    resizeMode: 'contain',
  }
}


export default CloseButton;
