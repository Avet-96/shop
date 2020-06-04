import React, { Component } from 'react'

import { View, Text, ScrollView, StyleSheet } from 'react-native';

import Input from '../../common/input';

import { connect } from 'react-redux'

import { getReturnData } from '../../gets/ordersPosts';

import { makeReturn } from '../../posts/ordersPosts'

import PickerInput from '../../common/picker-input'

import FooterButton from '../../common/footer-button';

import Loading from '../loading'


class Return extends Component {

    static navigationOptions = {
        title: 'Artikel zurückschicken'
    }

    ReturnItem = ({name, count, price, selectedCount, selectedReason, onChangeCount, onChangeReason}) => {
        const countValues=[]
        for (let countValue = 0; countValue <= count; countValue++) {
            countValues.push(countValue)
        }
        return (
            <View style={styles.returnProductContainer} >
                <Text style={styles.itemSeparator} >Artikel</Text>
                <View style={styles.namePriceContainer}>
                    <Text style={styles.productName} >{name}</Text>
                    <Text style={styles.productPrice} >{price}€</Text>
                </View>
                {
                    this.state.editable ? 
                        <PickerInput values={countValues} selected={selectedCount} placeholder='Anzahl' onValueChange={count => onChangeCount(count)} />
                        : <Input value={'' + selectedCount} editable={false} /> 
                }
                {
                    this.state.editable && selectedCount > 0 ? 
                    <PickerInput values={this.state.reasons} selected={selectedReason} placeholder='Grund' onValueChange={reason => onChangeReason(reason)} />
                    : (!this.state.editable ? <Input value={selectedReason} editable={false} /> : null)
                }
                    
                
                
            </View>
        )
    }

    state = {
        loaded: false,
        products: [],
        comment: '',
        orderID: this.props.navigation.getParam('orderID', null),
        userID: this.props.userID
    }

    componentDidMount() {
        const orderID = this.props.navigation.getParam('orderID', null)
        getReturnData(orderID).then(res => {
            this.setState({
                ...res,
                loaded: true,
            })
        })
    }

    getReturnCards() {
        const ReturnItem = this.ReturnItem
        return this.state.products.map(({productID, quantity, title, price, returnQuantity, reason}) => {
            return (
                <ReturnItem
                    key={productID}
                    name={title}
                    id={productID}
                    count={quantity}
                    selectedCount={returnQuantity}
                    selectedReason={reason}
                    price={price}
                    onChangeCount={count => this.changeReturnCount(productID, count)}
                    onChangeReason={reason => this.changeReturnReason(productID, reason)}
                />
            )
        })
    }

    changeReturnReason(id, reason) {
        const {products} = this.state
        const arrayID = products.findIndex(({productID}) => productID === id)
        products[arrayID].reason=reason
        this.setState({products})
        console.log(id, reason)
    }

    changeReturnCount(id, count) {
        const {products} = this.state
        const arrayID = products.findIndex(({productID}) => productID === id)
        products[arrayID].returnQuantity=count
        this.setState({products})
        console.log(id, count)
    }

    isFormValid() {
        const {products} = this.state
        const returnCount = products.reduce((sum,{returnQuantity}) =>  sum+returnQuantity, 0)
        if (returnCount < 1) {
            alert('Der Mindestbetrag für die Rücksendung wurde nicht erreicht')
            return false
        }
        const isProductsWithoutReason = products.find(({returnQuantity, reason}) => returnQuantity>0&&reason.length===0 )
        if(isProductsWithoutReason) {
            alert('Kennzeichnen Sie bitte Ihre Rücksendung, indem Sie die Anzahl und den Grund für den entsprechenden Artikel auswählen.')
            return false
        }
        return true
    }

    sendRequest() {
        if(this.isFormValid()) {
            const returnData = encodeURIComponent(JSON.stringify(this.state))
            console.log(returnData)
            makeReturn(returnData)
        }
    }

    render() {
        if(!this.state.loaded) {
            return <Loading />
        }      
        return (
            <View style={{flex: 1}}>
                <ScrollView style={{paddingHorizontal: 18}}>
                    <Text style={styles.titleText}>Bitte kennzeichnen Sie Ihre Rücksendung, indem Sie zuerst die Anzahl und dann den Grund für den entsprechenden Artikel auswählen.</Text>
                    {this.getReturnCards()}
                    <View style={styles.commentTextContainer}>
                        <Text style={styles.commentText}>Ihr Kommentar zur Rücksendung</Text>
                    </View>
                    <Input containerStyle={{marginBottom: 26}} multiline editable={this.state.editable} value={this.state.comment} onChangeText={comment => this.setState({comment})} />
                </ScrollView>
                {this.state.editable ? <FooterButton text='Weiter' onPress={() => {this.sendRequest()}} /> : null}
            </View>
        )
    }
}

const mapStateToProps = ({userID}) => ({userID})

export default connect(mapStateToProps)(Return)

const styles = StyleSheet.create({
    titleText: {
        color: '#040404',
        fontSize: 12,
        lineHeight: 16,
        marginTop: 20
    },
    itemSeparator: {
        fontSize: 12,
        color: '#a0a0a0'
    },
    returnProductContainer: {
        marginTop: 20,
        marginBottom: 4,
    },
    namePriceContainer: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 16,
        borderBottomWidth: .7,
        borderBottomColor: '#949494'
    },
    productName: {
        flex: .75,
        fontSize: 16,
        color: '#040404'
    },
    productPrice: {
        flex: .25,
        textAlign: 'right',
        fontSize: 16,
        color: '#040404'
    },
    commentTextContainer: {
        paddingVertical: 16,
        borderBottomWidth: .7,
        borderBottomColor: '#949494'
    },
    commentText: {
        color: '#040404',
        fontSize: 14,
        fontWeight: 'bold',
    }
})