import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import NavigationService from '../../navigation-service';

export default function OrderListItem({id, time, delivery, status, statusText, showRepeat}) {
    

    getButtons = () => {
        switch(status) {
            case 'done':
            case 'denied': {
                return (
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => showRepeat()} style={styles.whiteButton}>
                            <Text style={styles.whiteButtonText}>
                                Bestellung wiederholen
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex: .05}}></View>
                        <TouchableOpacity onPress={() => showRepeat()} style={styles.redButton}>
                            <Text style={styles.redButtonText}>
                                Bestelldetails
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            case 'process':
            case 'paid': {
                return(
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={ () => {NavigationService.navigate('Return', {orderID: id})} } style={styles.whiteButton}>
                            <Text style={styles.whiteButtonText}>
                                Retouren
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex: .05}}></View>
                        <TouchableOpacity onPress={() => showRepeat()} style={styles.redButton}>
                            <Text style={styles.redButtonText}>
                                Bestelldetails
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            case 'return': {
                return(
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => showRepeat()} style={styles.redButton}>
                            <Text style={styles.redButtonText}>
                                Bestelldetails
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }

    return (
        <View>
            <View style={styles.itemContainer}>
                <View style={styles.topInfo}>
                    <Text style={styles.id}>Bestellen №{id}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 16}}>
                    <Text style={styles.delivery}>
                        Versand:
                    </Text>
                    <Text style={{color: '#000', marginLeft: 5, fontSize: 16, flex: 1}}>
                        {delivery}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.statusText}>{statusText}</Text>
                </View>
            </View>

            {getButtons()}
            
        </View>

    )
}

const styles = {
    itemContainer: {
        marginTop: 23,
        marginBottom: 15,
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 1.5,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    topInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
    },
    id: {
        color: '#c00017',
        fontSize: 16
    },
    time: {
        fontSize: 12,
        color: '#a0a0a0'
    },
    delivery: {
        margin: 0,
        justifyContent: 'space-between',
        fontSize: 16,
        color: '#a0a0a0'
    },
    statusDeliveredDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3f911b'
    },
    statusDeniedDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d10019'
    },
    statusProcessDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3eb5f1'
    },
    statusPaidDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#e8a765'
    },
    statusReturnDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3b3b3b'
    },
    statusText: {
        fontSize: 16,
        color: '#000000'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    whiteButton: {
        flex: .5,
        height: 42,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 0.3,
        borderColor: '#d10019',
        alignItems: 'center',
        justifyContent: 'center'
    },
    redButton: {
        flex: .5,
        height: 42,
        borderRadius: 5,
        backgroundColor: '#d10019',
        justifyContent: 'center'
    },
    whiteButtonText: {
        fontSize: 16,
        color: '#000',
        alignSelf: 'center',
        textAlign: 'center'
    },
    redButtonText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center'
    }
}