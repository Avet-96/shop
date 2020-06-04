import React from 'react'

import NavigationService from '../../navigation-service';

import { Image, Text, TouchableOpacity } from 'react-native';

export default function FilterButton({minPrice, maxPrice, fromPrice, toPrice, sortBy}) {
  return (
    <TouchableOpacity style={styles.filterButton} onPress={() => NavigationService.navigate('Filter', {minPrice, maxPrice, fromPrice, toPrice, sortBy})} >
        <Image source={require('../../assets/icons-color/018-filter2.png')} style={styles.filterImage} key={'filterImage'} />
        <Text style={styles.filterText} >
            Filter
        </Text>
    </TouchableOpacity>
  )
}

const styles = {
    filterButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 4,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2
    },
    filterText: {
        fontSize: 16,
        color: '#050505',
        marginLeft: 10
    },
    filterImage: {
        resizeMode: 'contain',
        width: 17,
        height: 17
    }
}