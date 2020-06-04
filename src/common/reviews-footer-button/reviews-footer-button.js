import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import NavigationService from '../../navigation-service';

const ReviewsFooterButton = ({productID}) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => NavigationService.navigate('AskQuestion', {productID})} >
            <Image source={require('../../assets/icons-color/032-question2.png')} style={styles.buttonImage} key={'askQuestionImage'} />
            <Text>Kontaktieren Sie uns</Text>
        </TouchableOpacity>
        <View style={{height: 45, width: 1, backgroundColor: '#b3b3b3'}}></View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => NavigationService.navigate('LeaveReview', {productID})} >
            <Image source={require('../../assets/icons-color/033-survey2.png')} style={styles.buttonImage} key={'leaveReviewImage'} />
            <Text>Bewertung schreibung</Text>
        </TouchableOpacity>
    </View>
);

const styles = {
    container: {
        backgroundColor: '#fff',
        height: 60,
        width: '100%',
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.3,
    },

    buttonText: {
        fontSize: 16,
        color: '#000',
        lineHeight: 24
    },

    buttonImage: {
        height: 20,
        width: 40,
        resizeMode: 'contain'
    },
    buttonContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }

}

export default ReviewsFooterButton;
