import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import NavigationService from '../../../navigation-service';

const LikeButton = ({onPress}) => {

  return(
    <TouchableOpacity style={{justifyContent: 'center'}} onPress={() => NavigationService.navigate('Scanner')}>
      <Image style={styles.image} source={require('../../../assets/icons-color/scanner.png')} 
        key={'headerScanner'}
      />
    </TouchableOpacity>
  );

}

const styles = {
  image: {
    marginHorizontal: 18,
    width: 20,
    resizeMode: 'contain'
  }
}

export default LikeButton;
