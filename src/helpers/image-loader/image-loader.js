import React, { Component } from 'react';
import { Text, Image, ImageBackground, View } from 'react-native';

import Loader from '../loader';

export default class ImageLoader extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: false
        };
    }

    renderHelper() {
        if(this.state.error) {
            return <View style={styles.errorContainer}><Text style={styles.error}>Fehler beim Bildupload</Text></View>
        }
        return this.state.loaded ? null : <Loader />
    }

    
    render() {
        if (this.props.children) {
            return(
                <>
                    {this.renderHelper()}
                    <ImageBackground resizeMethod="resize" onLoadEnd={() => this.setState({ loaded: true })} {...this.props} onError={() => this.setState({error: true})}/>
                </>
            )
        }
        return (
            <>
                {this.renderHelper()}
                <Image onError={() => this.setState({error: true})} resizeMethod="resize" onLoadEnd={() => this.setState({ loaded: true })} {...this.props} />
            </>
        )
    }
}

const styles = {
    errorContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '50%',
        flex: 1
        // borderWidth: 1,
        // height: '100%'
    },
    error: {
        color: '#d10019',
        fontSize: 16
    }
}