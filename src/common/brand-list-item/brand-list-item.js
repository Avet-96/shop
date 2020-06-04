import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import ImageLoader from '../../helpers/image-loader';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service';

const componentName = ({ image, id, brand, userInfo }) => {
    // console.log(image)
    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.navigate('ProductsByBrand', { brand: brand, supplierID: id, userInfo: userInfo })}>
            <ImageLoader style={styles.image} source={image} key={image} />
        </TouchableOpacity>
    )

};

const width = sWidth > 600 ? (sWidth - 72) / 3 : (sWidth - 54) / 2

const styles = {
    container: {
        width: width,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 18,
        marginTop: 18
    },
    image: {
        width: width - 10,
        height: 65,
        resizeMode: 'contain'
    }
}

export default componentName;
