import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import Loading from '../loading'

import HTML from 'react-native-render-html';


import { getPrivacyPolicy } from '../../gets/htmlPosts'

export default class TermsConfidentiality extends Component {

    static navigationOptions = {
        title: 'Datenschutz'
    }

    state = {
        content: '',
        loaded: false
    }

    componentDidMount() {
        getPrivacyPolicy().then(res => {
            this.setState({loaded: true, content: res.cmsStatic.content})
        })
    }

    render() {
        if (!this.state.loaded) return <Loading />

        return (
            <ScrollView>
                <HTML html={this.state.content} containerStyle={styles.content} />
            </ScrollView>
        )
    }
}

const styles = {
    content: {
      margin: 18
    }
  }