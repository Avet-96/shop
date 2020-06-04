import React, { Component } from 'react'
import { View, FlatList } from 'react-native'

import { SearchButton } from '../../common/header-buttons';



import FilterButton from '../../common/filter-button';
import ProductListItem from '../../common/product-list-item';

export default class ProductsList extends Component {
    
    static navigationOptions = {
        title: 'Kategorie',
        headerRight: (
            <View style={{flexDirection: 'row', marginRight: 9}}>
                <SearchButton />
            </View>
        )
    }
    render() {
        return (
            <View>
                    <FlatList 
                        contentContainerStyle={{paddingLeft: 18}}
                        data={[{
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '11234',
                                stock: 0,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '546334',
                                stock: 0,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '93323',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '678065',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '1235465',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '345223',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '75667345',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '123fasd',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '543fds',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: 'asdf123',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: 'sdf2as',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '123asd',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: '12ss22',
                                stock: true,
                                rate: 8
                            },
                            {
                                imageURL: 'https://hnsfpau.imgix.net/5/images/detailed/81/QA55Q7FNASXNZ_aoia-m4.jpg',
                                name: 'Laboris fugiat cillum fugiat occaecat proident in veniam enim ipsum ea labore nisi pariatur.',
                                price: 4000,
                                id: 'wd1000',
                                stock: true,
                                rate: 8
                            },
                        ]}
                        renderItem={({item}) => 
                            <View style={{paddingBottom: 8}}>
                                <ProductListItem 
                                    imageURL={item.imageURL}
                                    name={item.name}
                                    price={item.price}
                                    id={item.id}
                                    stock={item.stock}
                                    rate={item.rate}
                                />
                            </View>
                        }
                        columnWrapperStyle={{flexWrap: 'wrap'}}
                        numColumns={4}
                        keyExtractor={item => item.id}
                    />
            </View>   
        )
    }
}


const styles = {
    popularText: {
        fontSize: 16,
        color: '#030303',
        marginLeft: 18,
        marginTop: 18
    },
    productsLine: {
        flexDirection: 'row',
        marginLeft: 18,
        flexWrap: 'wrap',
        marginBottom: 16
    }
}