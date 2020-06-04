import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MenuButton from '../../common/header-buttons/menu-button';
import SearchButton from '../../common/header-buttons/search-button';

import { getRootCategories } from '../../gets/categoryPosts';

import Loading from '../loading'

import CategoriesListItem from '../../common/categories-list-item';

export default class CategoriesList extends Component {

  static navigationOptions = {
    headerLeft: MenuButton,
    headerRight: (
      <View style={{ flexDirection: 'row', marginRight: 9 }}>
        <SearchButton />
      </View>
    ),
    title: 'Kategorien',
  }

  state = {
    categories: [],
    currentCategory: {},
    loaded: false
  }

  getCategories() {
    const userInfoType = this.props.navigation.getParam('userInfoType', null)
    return this.state.categories.map(({ id, name, haveSubCategories, cmsText }) => {
      if (name.toUpperCase() === 'SALE') return <CategoriesListItem name={name} id={id} key={id} textStyle={{ color: '#d10019' }} haveSubCategories={haveSubCategories} cmsText={cmsText} userInfo={userInfoType} />
      if (name.toUpperCase() === 'BRANDS') return <CategoriesListItem route='Brands' name={name} id={id} key={id} haveSubCategories={haveSubCategories} userInfo={userInfoType} />
      // if (name.toUpperCase() !== 'BRANDS' && haveSubCategories === 'false') return null
      return <CategoriesListItem name={name} id={id} key={id} haveSubCategories={haveSubCategories} cmsText={cmsText} userInfo={userInfoType} />
    }
    )
  }

  componentDidMount() {
    getRootCategories().then(res => this.setState({ ...res, loaded: true }))
  }

  render() {
    if (!this.state.loaded) return <Loading />
    return (
      <ScrollView style={{ marginHorizontal: 18 }} showsVerticalScrollIndicator={false}>
        {this.getCategories()}
      </ScrollView>
    )
  }

}
