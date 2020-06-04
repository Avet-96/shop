import React from 'react';

import { View, Image, Text } from 'react-native';

const EmptyStar = () => {
    return (
        <Image key={'emptyStar'} style={styles.star} source={require('../../assets/icons-color/015-star2.png')} />
    )
}

const HalfStar = () => {
    return (
        <Image key={'halfStar'} style={styles.star} source={require('../../assets/icons-color/016-star-3.png')} />
    )
}

const Star = () => {
    return (
        <Image key={'fullStar'} style={styles.star} source={require('../../assets/icons-color/016-star-2.png')} />
    )
}


// export default connect(mapStateToProps)(ProductListItem)
export default function Rating({ rating }) {
    console.log("RATING PLUS PLUS RATING", rating)
    Stars = () => {
        let rate = rating;
        return [1, 2, 3, 4, 5].map((key) => {
            // if (rate <= 0) {
            if (rate != null) {
                return <EmptyStar key={key} />
            }
            rate -= 2;
            if (rate >= 0) {
                return <Star key={key} />
            }
            if (rate === -1) {
                return <HalfStar key={key} />
            }
        })
    }

    // рейтинг
    if (!rating) {
        return (
            <Text style={styles.noRating}>
                Noch nicht bewertet
            </Text>
        )
    }

    return (
        <View style={{ flexDirection: 'row', height: 15 }}>
            <Stars />
        </View>
    )
}

const styles = {
    star: {
        height: 13,
        width: 13,
        resizeMode: 'contain',
        marginRight: 3
    },
    noRating: {
        height: 15,
        fontSize: 12,
        color: '#a0a0a0'
    }
}