import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import Loading from '../loading'

import HTML from 'react-native-render-html';


import { getPaymentAndDeliveryConditions } from '../../gets/htmlPosts'

export default class TermsDeliveryPayment extends Component {

    static navigationOptions = {
        title: 'Zahlungs- und Versandbedingungen'
    }

    state = {
        content: '',
        loaded: false
    }

    componentDidMount() {
        getPaymentAndDeliveryConditions().then(res => {
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