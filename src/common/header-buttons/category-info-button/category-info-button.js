import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import NavigationService from '../../../navigation-service';

const CategoryInfoButton = ({cmsText, name}) => {
  return(
    <TouchableOpacity onPress={() => NavigationService.navigate('CategoryInfo', {cmsText, name})} style={styles.container} >
      <Text style={styles.text}>Info</Text>
    </TouchableOpacity>
  );

}

const styles = {
  container: {

    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
}

export default CategoryInfoButton;
