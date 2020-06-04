import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import HTML from 'react-native-render-html'

import Loading from '../loading'

export default class ProductSpecs extends Component {

  render() {
    if(!this.props.id) {
        return <Loading />
    }
    if (!this.props.details) {
      return <Text style={styles.content} >Technische Details sind nicht vorhanden</Text>
    }
    return (
        <ScrollView>
            <HTML html={this.props.details} containerStyle={styles.content} tagsStyles={HTMLStyles} />      
        </ScrollView>
    )
  }
  
}

const HTMLStyles = StyleSheet.create({
    p: {
      color: '#c00017',
      marginBottom: 10
    }
})

const styles = {
  content: {
    margin: 18
  }
}