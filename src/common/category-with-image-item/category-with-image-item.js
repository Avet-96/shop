import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service';

const CategoryWithImageItem = ({ image, text, id, userInfo }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.navigate('ProductsByCategory', { categoryID: id, categoryName: text, userInfo: userInfo })}>
            <View style={{ overflow: 'hidden', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
                <ImageLoader source={image} style={styles.image} key={image} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
};

const width = sWidth < 600 ? (sWidth - 54) / 2 : (sWidth - 72) / 3
const styles = {
    container: {
        marginTop: 16,
        width: width,
        height: 146,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginRight: 18,
        marginBottom: 4
    },
    image: {
        width: width,
        height: 110,
        resizeMode: 'contain'
        // resizeMode: 'cover'
    },
    text: {
        fontSize: 16,
        color: '#030303',
        justifyContent: 'center'
    }
}

export default CategoryWithImageItem;
