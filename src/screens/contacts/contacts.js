import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import Loading from '../loading'

import HTML from 'react-native-render-html';


import { getContacts } from '../../gets/htmlPosts'

export default class Contacts extends Component {

    static navigationOptions = {
        title: 'Kontaktdaten  '
    }

    state = {
        content: '',
        loaded: false
    }

    componentDidMount() {
        getContacts().then(res => {
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