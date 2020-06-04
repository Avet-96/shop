import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import {BoxShadow} from 'react-native-shadow'
import {sWidth} from '../../../helpers/screenSize'



const UserButton = ({selected, onPress}) => {
  const shadowOpt = {
    width: 150,
    height: 150,
    color:"#000",
    border:6,
    radius:1,
    opacity:0.1,
    x:0,
    y:0
  }
  return(
    <BoxShadow setting={shadowOpt}>
      <TouchableOpacity style={selected ? selectedStyles.container : styles.container} onPress={() => onPress()}>
        <Image
            style={selected ? selectedStyles.image :  styles.image}
            key={selected ? 'man2' : 'man'}
            source={selected ? require('../../../assets/icons-color/003-man2.png') : require('../../../assets/icons/003-man.png')}
        />
        <Text style={selected ? selectedStyles.text : styles.text}>
            Privatkunde
        </Text>
      </TouchableOpacity>
    </BoxShadow>
  );
}

const styles = {
  container: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 43,
    marginBottom: 14,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 16,
    color: '#030303'
  }
}

const selectedStyles = {
  container: {
    width: 150,
    height: 150,
    borderRadius: 5,
    backgroundColor: '#d10019',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 43,
    marginBottom: 14,
    overlayColor: '#ffffff',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 16,
    color: '#fff'
  }
}

export default UserButton;
