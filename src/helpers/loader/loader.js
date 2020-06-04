import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => (
    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}} >
        <ActivityIndicator size='large' color='#d10019' />
    </View>
);

export default Loader;
