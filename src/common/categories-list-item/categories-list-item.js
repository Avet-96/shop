import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import NavigationService from '../../navigation-service';

const CategoriesListItem = ({ name, textStyle, route, id, haveSubCategories, cmsText, userInfo }) => {
  const navigate = () => {
    if (route) {
      NavigationService.navigate(route, { userInfoType: userInfo })
    }
    else {
      if (haveSubCategories) {        
        NavigationService.push('SubcategoriesList', { id, name, cmsText, userInfo })
      } else {
        NavigationService.navigate('ProductsByCategory', { categoryID: id, categoryName: name, cmsText, userInfo })
      }
    }

  }

  return (
    <TouchableOpacity style={styles.containerStyle} onPress={() => navigate()} >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={textStyle ? { ...styles.categoryText, ...textStyle } : styles.categoryText}>
          {name}
        </Text>
      </View>
      <Image source={require('../../assets/icons/051-right.png')} style={styles.arrowStyle} key={'rightCategoryImage'} />
    </TouchableOpacity>
  );
}

const styles = {
  categoryImage: {
    width: 36,
    height: 60,
    resizeMode: 'contain',
  },
  containerStyle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  arrowStyle: {
    width: 15,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  },
  categoryText: {
    fontSize: 16,
    color: '#131313'
  }
}


export default CategoriesListItem;
