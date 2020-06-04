import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import NavigationService from '../../../navigation-service';

export default class LikeButton extends Component {

  state ={

  }
  render() {
    return(
      <TouchableOpacity onPress={() => NavigationService.navigate('Favourite')}>
        <Image style={styles.image} source={require('../../../assets/icons-color/004-heart-white.png')} 
          key={'headerLike'}
        />
      </TouchableOpacity>
    );
  }
}

const styles = {
  image: {
    marginHorizontal: 9,
    width: 20,
    resizeMode: 'contain'
  }
}