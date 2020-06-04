import React from 'react';
import { Text, View, Button, Linking } from 'react-native';

class Whatsapp extends React.Component {


    // handlePress = () => {
    //     Linking.openURL('whatsapp://send?text=hello&phone=380993700153').start()
    // }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>                
                <Button
                    title="WhatsApp help"
                    onPress={() => Linking.openURL('whatsapp://send?phone=491707046434')}
                ></Button>
            </View>
           
        );
    }
}
export default Whatsapp;