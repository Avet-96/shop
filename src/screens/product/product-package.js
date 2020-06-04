import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import HTML from 'react-native-render-html';

import Loading from '../loading'

export default class ProductPackage extends Component {

  render() {
    console.log(this.props)
    if(!this.props.id) {
        return <Loading />
    }
    if(!this.props.packageInfo) {
      return <Text style={styles.content} >Datenblatt ist nicht vorhanden</Text>
    }
    return (
        <ScrollView>
            <HTML html={this.props.packageInfo} containerStyle={styles.content} tagsStyles={HTMLStyles} />
        </ScrollView>
    )
  }

}


const HTMLStyles = StyleSheet.create({
  b: {
    color: '#c00017',
  },
  ul: {
    marginTop: 10
  }
})

const styles = {
  content: {
    margin: 18
  }
}