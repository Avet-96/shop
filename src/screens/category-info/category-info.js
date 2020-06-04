import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';

import HTML from 'react-native-render-html';


export default class CategoryInfo extends Component {

  static navigationOptions = ({navigation}) => {
    return {
        title: navigation.getParam('name', 'Kategorien'),
    }
  }

  render() {
    const data = this.props.navigation.getParam('cmsText', null);
    console.log(data)
    return (
      <ScrollView >
          <HTML html={data} containerStyle={{padding: 18}} />
      </ScrollView>
    );
  }
}
