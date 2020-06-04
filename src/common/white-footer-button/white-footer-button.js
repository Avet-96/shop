import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const WhiteFooterButton = ({text, onPress}) => {

  return (
      <TouchableOpacity onPress={() => onPress ? onPress() : {}}style={styles.button}>
      {/* <TouchableOpacity onPress={() => onPress()}style={styles.button}> */}
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
      backgroundColor: '#fff',
      elevation: 10,
      shadowColor: 'rgb(0, 0, 0, 0.75)',
      shadowOffset: { width: 0.1, height: 0.1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      alignItems: 'center',
      justifyContent: 'center'
   },
   text: {
     fontSize: 16,
     color: '#d10019'
   }
 }
export default WhiteFooterButton;
