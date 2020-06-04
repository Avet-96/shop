import React from 'react';
import { connect } from 'react-redux'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ImageLoader from '../../helpers/image-loader';
import { sWidth } from '../../helpers/screenSize';
import { getPreviewAsyncProductData } from '../../gets/productPosts';
import NavigationService from '../../navigation-service';

const NewestListItem = ({ id, text, image, price, companyPrice, userInfo }) => {
// const NewestListItem = ({ id, text, image, price, companyPrice, userInfo }) => {
    const showingprice = userInfo.selectedUserType === 'EK' ? price : companyPrice;
    let pricefixed = parseFloat(showingprice).toFixed(2)
    let formattedprice = pricefixed.toString().replace('.', ',');

    return (
        <TouchableOpacity style={styles.container} onPress={() => NavigationService.push('Product', { id: id, name: text, images: image, price: price, companyPrice: companyPrice })
        }>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ overflow: 'hidden', borderTopLeftRadius: 5, borderTopRightRadius: 5, flex: 5, alignContent: 'flex-start', alignContent: 'flex-start' }}>
                    <ImageLoader source={image} style={styles.image} key={image} />
                </View>

                <View style={{ flex: 6, flexDirection: 'column' }}>
                    <View>
                        <Text style={styles.name} numberOfLines={3}
                        //  ellipsizeMode='middle'
                        >{text}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{formattedprice} €</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const mapStateToProps = ({ userID, userInfo }) => (
    { userID, userInfo }
)

export default connect(mapStateToProps)(NewestListItem)

const width = sWidth < 600 ? (sWidth - 54) : (sWidth - 72) / 3
// const width = sWidth < 600 ? (sWidth - 54) / 2 : (sWidth - 72) / 3

const styles = {
    container: {
        flex: 2,
        width: width,
        height: 146,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginRight: 2,
        marginLeft: 18,
        marginTop: 8,
    },
    image: {

        width: width / 2,
        height: 140,
        resizeMode: 'contain',
    },
    name: {
        marginTop: 12,
        height: 90,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Poppins-Medium',
        color: '#040404',
        paddingHorizontal: 8,
    },
    price: {
        padding: 0,
        fontSize: 20,
        // fontWeight: '800',
        fontFamily: 'Poppins-ExtraBoldItalic',
        // fontStyle: 'italic',
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 15,
        color: '#000',
        textAlign: 'center',
        lineHeight: 23,
        paddingHorizontal: 8,
    }
}