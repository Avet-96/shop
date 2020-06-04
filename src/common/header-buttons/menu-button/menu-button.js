import React from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import NavigationService from '../../../navigation-service';

const MenuButton = () => {
  return (
    <TouchableOpacity onPress={() => NavigationService.openDrawer()}>
      <Image
        source={require('../../../assets/icons-color/007-menu-white.png')}
        style={styles.backButtonStyle}
        key={'headerMenu'}
      />
    </TouchableOpacity>

  );
}

const styles = {
  backButtonStyle: {
    margin: Platform.OS === 'ios' ? 18 : 22,
    height: 20,
    width: 22,
    resizeMode: 'contain'
  }
}


export default MenuButton;
