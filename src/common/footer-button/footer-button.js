import React from 'react';
import { View, TouchableOpacity, Text, PixelRatio } from 'react-native';
const FooterButton = ({text, onPress}) => {

  return (
      <TouchableOpacity onPress={() => {if(onPress) {onPress()}} } style={styles.button}>
        <Text style={styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
  );

}
 const styles = {
   button: {
     width: '100%',
     height: 59,
     backgroundColor: '#d10019',
     color: '#fff',
     zIndex: 999,
     overflow: 'hidden',
     // position: 'absolute',
     // bottom:0,
     // left:0,
     // right: 0,
     // alignSelf: 'flex-end',
     alignItems: 'center',
     justifyContent: 'center'
   },
   text: {
     fontSize: 16,
     color: '#fff'
   }
 }
export default FooterButton;
