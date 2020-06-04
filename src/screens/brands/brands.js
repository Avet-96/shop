import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';

import Loading from '../loading'

import { connect } from 'react-redux';

import { getBrandsList } from '../../gets/mainPagePosts';


import {
    SearchButton
} from '../../common/header-buttons';

import BrandListItem from '../../common/brand-list-item';

class Brands extends Component {

    static navigationOptions = {
        title: 'Brands',
        headerRight: (
            <View style={{flexDirection: 'row', marginRight: 9}}>
                <SearchButton />
            </View>
        )
    }

    getBrands() {
        const brands = this.props.brands.filter((val) => {
            if (val.imgURL && val.supplierID) {
                return val
            }
        })
        return brands
    }

    render() {
        if(!this.props.brands) {
            getBrandsList()
            return <Loading />
        }
        return (
        <View style={{flex: 1}}>
            <FlatList 
                numColumns={4}
                data={this.getBrands()}
                renderItem={({item}) => {
                    console.log(item);
                    return <BrandListItem brand={item.title} image={{uri: item.imgURL}} id={item.supplierID} /> 
                }}
                keyExtractor={item => item.title}
                initialNumToRender={12}
                windowSize={2}
                showsHorizontalScrollIndicator={false}
            /> 
        </View>
        );
    }
}


const mapStateToProps = (state) => (
    {
        brands: state.mainPage.brands
    }
)

export default connect(mapStateToProps)(Brands)