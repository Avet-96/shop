import React from 'react';
import { connect } from 'react-redux'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import ImageLoader from '../../helpers/image-loader';
import { sWidth } from '../../helpers/screenSize';
import NavigationService from '../../navigation-service';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const bannerHeight = 170 

const BannerImage = ({ title, subtitle, text_1, text_2, list_text_1, list_text_2, list_text_3, list_text_4, logo, url, price, companyPrice, background_color, text_color, product_image, background_image, position, userInfo }) => {

    const infoblockPosition = position == 'left' ? 'flex-start' : 'flex-end'
    const showingprice = userInfo.selectedUserType === 'EK' ? price : companyPrice;

    // background_image: ""

    const textElement = (textelement) => {
        return (
            <Text style={{ marginTop: 6, fontSize: 10, color: text_color, fontFamily: 'Poppins-Medium', justifyContent: 'flex-end', marginBottom: -10 }}>{textelement}
            </Text>
        )
    }

    const listElement = (textlist) => {
        return (
            <Text style={{ fontSize: 7, fontFamily: 'Poppins-Medium', maxHeight: 9, color: text_color }}>
                <Icon solid color="#FFC600" name='square' size={5}></Icon>  {textlist}
            </Text>
        )
    }
    
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: background_color }]} onPress={() => NavigationService.push('Product', { id: url })}>
            <ImageBackground
                source={{ uri: 'https://teleropa.de/' + product_image }}
                style={{ flex: 1, resizeMode: "cover", justifyContent: "center", width: sWidth, height: bannerHeight }}
            />
            <View style={{ marginVertical: 5, marginHorizontal: 5, height: bannerHeight-10, width: sWidth/1.9, backgroundColor: '#d10019', alignSelf: infoblockPosition }}>

                <View style={{ flexDirection: 'column', paddingVertical: 7, marginHorizontal: 5 }}>
                    <Text style={{ fontSize: 20, color: text_color, fontFamily: 'Poppins-Bold', lineHeight: 22, textAlignVertical: 'bottom' }}>{title} </Text>
                    <Text style={{ fontSize: 11, color: text_color, fontFamily: 'Poppins-Bold', marginVertical: -7, lineHeight: 15 }}>{subtitle}</Text>

                    {(text_1) ? textElement(text_1) : null}
                    {(text_2) ? textElement(text_2) : null}

                    <View style={{ marginTop: 10 }}>
                        {(list_text_1) ? listElement(list_text_1) : null}
                        {(list_text_2) ? listElement(list_text_2) : null}
                        {(list_text_3) ? listElement(list_text_3) : null}
                        {(list_text_4) ? listElement(list_text_4) : null}
                    </View>

                </View>

                <View style={{ position: 'absolute', bottom: 0, alignSelf:'flex-end', marginHorizontal: 5, marginBottom: 3, flexDirection: 'row', lineHeight: 12, justifyContent: 'space-between' }}>
                    { logo ?
                    <ImageLoader style={{ width: 80, height: 10, bottom: 0 }} source={{ uri: 'https://teleropa.de/' + logo }} key={logo} />
                    : null }
                    { showingprice ? 
                    <Text style={{ right: 0, bottom: 0, fontSize: 12, fontFamily: 'Poppins-Medium', backgroundColor: '#FFC600', color: 'black', lineHeight: 18 }}>  NUR <Text style={{ fontSize: 14, fontFamily: 'Poppins-BoldItalic' }}>{showingprice} €  </Text></Text>
                    : null }
                </View>
            </View>
        </TouchableOpacity >
    )
}

const mapStateToProps = ({ userID, userInfo }) => (
    { userID, userInfo }
)

export default connect(mapStateToProps)(BannerImage)

// const width = sWidth < 600 ? (sWidth - 54) : (sWidth - 72) / 3
// const width = sWidth < 600 ? (sWidth - 54) / 2 : (sWidth - 72) / 3

const styles = {
    container: {
        width: sWidth,
        height: bannerHeight,
        color: "#ffffff"
    },
}