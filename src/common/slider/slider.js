import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { sWidth, sHeight } from '../../helpers/screenSize';

import ImageLoader from '../../helpers/image-loader';

export default class Slider extends Component {
    state = {
        slideID: 0
    }

    render() {
        const width = sWidth;
        const height = sHeight/3;
        return (
        <>
            <Carousel 
                // data={this.props.data}
                data={this.props.data.length!==0 ? this.props.data : [require('../../assets/message-icons/no-photo.png')] }
                renderItem={({item}) => {
                    return (
                        <View style={styles.imageContainer}>
                            <ImageLoader 
                            source={item} 
                            style={styles.image}
                            key={item}
                            />
                        </View>
                    )
                }}
                itemWidth={width}
                itemHeight={height}
                sliderWidth={width}
                sliderHeight={height}
                onSnapToItem={ slideID => this.setState({ slideID }) }
                />
                <Pagination 
                activeDotIndex={this.state.slideID}
                containerStyle={{ paddingVertical: 5 }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: -12,
                    backgroundColor: '#000',
                    borderWidth: 1
                }}
                inactiveDotStyle={{
                    backgroundColor: '#fff'
                }}
                inactiveDotScale={1}
                dotsLength={this.props.data.length}
                />
        </>
        );
    }
}


const styles = {
    imageContainer: {
        flex: 1, 
        // alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    }
}