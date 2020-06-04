import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { WebView } from "react-native-webview";

import HTML from 'react-native-render-html'

import Loading from '../loading'

import { sWidth } from '../../helpers/screenSize';

export default class ProductVideo extends Component {
    render() {
        if(!this.props.id) {
          return <Loading />
        }
        if (!this.props.videoID) {
          return (
              <View style={styles.noReviewsContainer}>
                  <Image source={require('../../assets/message-icons/no-video.png')} style={styles.noReviewImage} />
                  <Text style={styles.noReviewText} >Produktvideo ist nicht vorhanden</Text>
              </View>
          )
        }

        const videoWidth = sWidth - 36

        const videoHeight = videoWidth / 16 * 9

        return (
            <>
                <View
                style={{
                  height: sWidth/1.77,
                  width: sWidth,
                  paddingHorizontal: 18,
                  paddingTop: 18,
                  overflow: "hidden"
                }}
                >
                    {/* <WebView
                      javaScriptEnabled={true}
                      style={{ marginTop: 22 }}
                      source={{
                        html: `<iframe width="100%" height="500" src="https://www.youtube.com/embed/j5-yKhDd64s" frameborder="0" allowfullscreen></iframe>`
                      }}
                    //   source={{
                    //     html: `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${this.props.videoID}" frameborder="0" allowfullscreen></iframe>`
                    //   }}
                    /> */}

                    <HTML html={`<iframe width="${videoWidth}" height="${videoHeight}" src="https://www.youtube.com/embed/${this.props.videoID}" frameborder="0" allowfullscreen></iframe>`} containerStyle={{width: videoWidth, height: videoHeight, backgroundColor: 'red'}} />      

                </View>
            </>
        )
    }
}


const styles = {
    noReviewsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noReviewImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    noReviewText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    }
}