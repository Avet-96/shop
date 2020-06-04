import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import Loading from '../loading'

import HTML from 'react-native-render-html';


import { getReturnConditions } from '../../gets/htmlPosts'

export default class TermsReturn extends Component {

    static navigationOptions = {
        title: 'Widerrufsrecht  '
    }

    state = {
        content: '',
        loaded: false
    }

    componentDidMount() {
        getReturnConditions().then(res => {
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