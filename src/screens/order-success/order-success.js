import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { BoxShadow } from 'react-native-shadow';

import { sWidth } from '../../helpers/screenSize';

import NavigationService from '../../navigation-service';

import FooterButton from '../../common/footer-button';


const OrderItem = ({img, name, pcs, price}) => {
    return(
        <View style={[styles.shadowBox, {marginTop: 22, flexDirection: 'row'}]}>
            <Image style={styles.orderItemImage} source={{uri: img}} key={img} />
            <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.orderItemName} >{name}</Text>
                <Text style={styles.orderItemsPcs} >{pcs} St.</Text>
                <Text style={styles.orderItemPrice} >{price} €</Text>
            </View>
        </View>
    )
}


export default class OrderSuccess extends Component {
    render() {
        const shadowOpt = {
            width: sWidth,
            height: 50,
            color:"#000",
            border:6,
            radius:1,
            opacity:0.1,
            x:0,
            y:0
        }
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={{marginBottom: 30}}>
                        <View style={styles.thanksContainer}>
                            <Image source={require('../../assets/icons-color/042-bank2.png')} style={styles.thanksImage} key={'orderSuccessImage'} />
                            <Text style={styles.thanksText}> Vielen Dank für Ihre Bestellung </Text>
                        </View>

                        <View style={{alignItems: 'center', marginBottom: 34}}>
                            <Text style={styles.thanksHelperText}>
                                In Kürze wird Sie unser Vertrieb kontaktieren
                            </Text>
                        </View>

                        <View style={[styles.shadowBox, {paddingTop: 4}]}>
                            <Text style={styles.orderInfoText} >
                                Bestellen: <Text style={{color: '#d10019'}}>№78990</Text>
                            </Text>
                            <Text style={styles.orderInfoText} >Adresse: Germany,.Ort, st. Some 56</Text>
                            <Text style={styles.orderInfoText} >Empfänger: Mike</Text>
                        </View>
                        
                        <OrderItem 
                            img='https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg'
                            name='Consectetur Lorem deserunt duis quis culpa sunt duis reprehenderit.'
                            pcs={4}
                            price={8000}
                        />
                        <OrderItem 
                            img='https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg'
                            name='Eu eiusmod ea quis cupidatat amet non et laboris culpa adipisicing magna sint velit.'
                            pcs={2}
                            price={3500}
                        />
                        <OrderItem 
                            img='https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg'
                            name='Eu eiusmod ea quis cupidatat amet non et laboris culpa adipisicing magna sint velit.'
                            pcs={2}
                            price={3500}
                        />
                        <OrderItem 
                            img='https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg'
                            name='Eu eiusmod ea quis cupidatat amet non et laboris culpa adipisicing magna sint velit.'
                            pcs={2}
                            price={3500}
                        />

                    </View>
                </ScrollView>
                
                <BoxShadow setting={shadowOpt} style={styles.footerSummaryContainer}>
                    <View style={styles.footerSummaryContainer}>
                        <Text style={styles.footerSummaryText}>Gesamtbetrag:</Text>
                        <Text style={styles.footerSummaryText}>11500€</Text>
                    </View>
                </BoxShadow>
                

                <FooterButton onPress={() => NavigationService.navigate('Main')} text='Ok' />

            </View>
        )
    }
}


const styles = {
    footerSummaryContainer: {
        height: 50,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        width: '100%'
    },
    footerSummaryText: {
        fontSize: 16,
        color: '#040404'
    },
    thanksContainer: {
        alignItems: 'center',
        marginTop: 35
    },
    thanksImage: {
        width: 40,
        height: 42,
        resizeMode: 'contain'
    },
    thanksText: {
        marginVertical: 22,
        fontSize: 16,
        color: '#060606'
    },
    thanksHelperText: {
        fontSize: 12,
        lineHeight: 24,
        color: '#a0a0a0'
    },
    shadowBox: {
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: '#fff',
        marginHorizontal: 18,
        borderRadius: 5
    },
    orderInfoText: {
        fontSize: 12,
        lineHeight: 24,
        color: '#191919',
        marginLeft: 13,
        marginBottom: 4
    },
    orderItemImage: {
        height: 94,
        width: 80,
        resizeMode: 'contain'
    },
    orderItemName: {
        fontSize: 10,
        color: '#040404',
        lineHeight: 16,
        marginTop: 10,
        height: 32
    },
    orderItemsPcs: {
        color: '#d10019',
        fontSize: 12,
        marginTop: 4
    },
    orderItemPrice: {
        fontSize: 16,
        color: '#040404',
        marginTop: 6
    }
}