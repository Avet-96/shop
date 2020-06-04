import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import NavigationService from '../../../navigation-service';

const SearchButton = ({ onPress }) => {  
  return (
    <TouchableOpacity onPress={() => NavigationService.navigate('Search')} >
      <Image style={styles.image} source={require('../../../assets/icons-color/006-search-white.png')}
        key={'headerSearch'}
      />
    </TouchableOpacity>
  );

}

const styles = {
  image: {
    marginHorizontal: 10,
    width: 20,
    resizeMode: 'contain'
  }
}

export default SearchButton;
