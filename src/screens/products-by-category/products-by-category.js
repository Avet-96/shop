import React, { Component } from 'react'
import { View, FlatList, Text, Image } from 'react-native'

import { SearchButton } from '../../common/header-buttons';

import CategoryInfoButton from '../../common/header-buttons/category-info-button'

// import { getProductsByCategory } from '../../gets/productsListPost';
import FilterButton from '../../common/filter-button';

import FooterButton from '../../common/footer-button';

import ProductListItem from '../../common/product-list-item';

import { getPreviewProductData, getProductsByCategory } from '../../gets/productPosts';

import Loading from '../loading';

import { connect } from 'react-redux'

//export default class ProductsByCategory extends Component {
class ProductsByCategory extends Component {

    static navigationOptions = ({ navigation }) => {
        const cmsText = navigation.getParam('cmsText', null)
        const name = navigation.getParam('categoryName', 'Kategorien')
        return {
            title: name,
            headerRight: (
                <View style={{ flexDirection: 'row', marginRight: 9 }}>
                    {/* {cmsText ? <CategoryInfoButton cmsText={cmsText} name={name} /> : null} */}
                    <CategoryInfoButton cmsText={cmsText} name={name} />
                    <SearchButton />
                </View>
            )
        }
    }

    state = {
        IDs: [],
        data: [],
        from: 0,
        loaded: false
    }

    getProductsIDs() {
        // const id = 1
        const id = this.props.navigation.getParam('categoryID', null)
        getProductsByCategory(id)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    data: responseJson.products,
                    IDs: responseJson.productsCount,
                    loaded: true,
                });
            });
    }

    getIDs(IDs) {
        this.setState({ IDs, loaded: true })
        this.getData(0)
    }

    // getData(from) {
    //     this.setState({from})
    //     const currentID = this.state.currentID 
    //     console.log(currentID)
    //     this.state.IDs.filter((id, key) => {
    //         // console.log(id, key)
    //         if(key >= from && key < (from + 12)) {
    //             getPreviewProductData(id).then(res => {this.setState({data: [...this.state.data, {...res, id}]}); console.log('added')}).catch(e => console.log(id, e))
    //             console.log(id)
    //         }
    //     })
    // }

    componentDidMount() {
        this.getProductsIDs()
    }

    render() {
        console.log("this.state RENDER() in products-by-category.js", this.state)
        if (!this.state.loaded) {
            return <Loading />
        }
        if (this.state.IDs.length < 1) {
            return (
                <View style={styles.noProductsContainer}>
                    <Image source={require('../../assets/message-icons/no-categorie-products.png')} style={styles.noProductImage} />
                    <Text style={styles.noProductText} >Kein Produkt gefunden</Text>
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    // contentContainerStyle={{paddingLeft: 18}}                    
                    data={this.state.data.filter(item => item.stock > 0)}
                    renderItem={({ item }) => {
                        const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID } = item
                        return (
                            <View style={{ paddingBottom: 8 }}>
                                <ProductListItem
                                    name={productName}
                                    //price={price}
                                    price={this.props.userInfo.selectedUserType === 'EK' ? price.toFixed(2) : companyPrice.toFixed(2)}
                                    salePrice={salePrice != 0 ? 'UVP ' + salePrice.toFixed(2): ''}
                                    companyPrice={companyPrice.toFixed(2)}
                                    rate={rate}
                                    stock={stock}
                                    id={productID}
                                    imageURL={previewImgURL}
                                    salePercent={productSalePercent ? productSalePercent.int : null}
                                />
                            </View>
                        )
                        // }
                    }}
                    columnWrapperStyle={{ flexWrap: 'wrap' }}
                    numColumns={4}
                    ListFooterComponent={this.state.IDs.length > this.state.data.length && (this.state.from + 12 === this.state.data.length) ? <FooterButton text='Weitere Produkte' onPress={() => { this.getData(this.state.from + 12) }} /> : null}
                    // ListFooterComponent={<TouchableOpacity onPress={() => {this.getData(this.state.from+12)}} ><Text>END</Text></TouchableOpacity>}
                    initialNumToRender={12}
                    windowSize={4}
                    keyExtractor={item => item.siteURL}
                />
            </View>
        )
    }
}


const mapStateToProps = ({ userID, userInfo }) => ({ userID, userInfo })

export default connect(mapStateToProps)(ProductsByCategory)

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
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noProductImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    noProductText: {
        marginTop: 10,
        color: '#717171',
        fontSize: 16
    }
}