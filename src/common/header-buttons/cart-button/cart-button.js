import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import NavigationService from '../../../navigation-service';

const CartButton = () => {

  return(
    <TouchableOpacity onPress={() => NavigationService.push('Cart')}>
      <Image style={styles.image} source={require('../../../assets/icons-color/002-shopping2.png')} key={'headerCart'} />
    </TouchableOpacity>
  );

}

const styles = {
  image: {
    marginHorizontal: 9,
    width: 20,
    resizeMode: 'contain'
  }
}

export default CartButton;
