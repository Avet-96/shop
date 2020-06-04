import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import NavigationService from '../../navigation-service';

const CategoriesListItem = ({name, textStyle, id, cmsText}) => {
  return(
    <TouchableOpacity style={styles.containerStyle} onPress={() => NavigationService.navigate('ProductsByCategory', {categoryID: id, categoryName: name})}>
      <Text style={textStyle ? {...styles.categoryText, ...textStyle} : styles.categoryText}>
        {name}
      </Text>
      <Image source={require('../../assets/icons/051-right.png')} style={styles.arrowStyle}
        key={'rightArrowCategory'}
      />
    </TouchableOpacity>
  );
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    height: 60,
  },
  arrowStyle: {
    width: 15,
    height: 60,
    resizeMode: 'contain'
  },
  categoryText: {
    fontSize: 16,
    color: '#131313'
  }
}


export default CategoriesListItem;
