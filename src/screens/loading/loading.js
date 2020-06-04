import React from 'react';

import { sHeight } from '../../helpers/screenSize';

import { ActivityIndicator, View } from 'react-native';

const Loading = () => (
    <View style={styles.screen}>
        <ActivityIndicator size='large' color='#d10019' />
    </View>
);


const styles = {
    screen: {
        height: '100%',
        justifyContent: 'center'
    }
}

export default Loading;
