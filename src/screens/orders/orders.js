import React, { Component } from 'react'

import { Text, View, ScrollView, Image } from 'react-native';

import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import { SearchButton }  from '../../common/header-buttons';

import {
    getCurrentOrders,
    getDoneOrders,
    getDeniedOrders,
    getReturnOrders,
    getOrderDetails
} from '../../gets/ordersPosts';

import Loading from '../loading';

import { connect } from 'react-redux'

import OrderListItem from '../../common/order-list-item';

import { CartItem } from '../../screens/cart/cart';

import FooterButton from '../../common/footer-button';

NoOrders = () => (
    <View style={styles.noOrdersContainer} >
        <Image style={styles.noOrdersImage} source={require('../../assets/message-icons/no-categorie-products.png')}/>
        <Text style={styles.noOrdersText} >Es gibt noch keine Bestellungen</Text>
    </View>
)

class CurrentOrders extends Component {
  state = {
    isDetails: false,
    orderDetailsID: 0,
    orders: [],
    loaded: false
  }

  componentDidMount() {
      this.props.navigation.addListener('willBlur', (route) => { this.setState({isDetails: false}) });
      this.getOrdersAndSetToState()
      this.getOrders()
  }

  getOrdersAndSetToState() {
      getCurrentOrders(this.props.userID).then(orders => this.setState({orders: orders.orders, loaded: true}))
  }

  getOrders() {
    console.log(this.state)

      return this.state.orders.map(({orderID, date, status, deliveryAddress, deliveryService}) => (
          <OrderListItem 
              key={orderID}
              id={orderID}
              time={date}
              delivery={`${deliveryAddress} / ${deliveryService}`}
              status='process'
              statusText={status}
              showRepeat={() => this.setState({orderDetailsID: orderID, isDetails: true})}
          />
      ))
  }

  render() {
    console.log(this.props)
    if(this.state.isDetails) {
      const {orderID, date, status, deliveryAddress, deliveryService} = this.state.orders.find(e => e.orderID===this.state.orderDetailsID)
      return <OrderInfo id={orderID} date={date} statusText={status} delivery={`${deliveryAddress} / ${deliveryService}`} />
    }
    if (!this.state.loaded) {
      return <Loading />
    }
    if(!this.state.orders || this.state.orders.length < 1) {
      return <NoOrders />
    }
    return(
      <View style={{flex: 1}}>
        <ScrollView >
          <View style={{ paddingHorizontal: 18, marginBottom: 20 }} >
            {this.getOrders()}
          </View>
        </ScrollView>
      </View>
    )  
  }
}

class DoneOrders extends Component {
  state = {
    isDetails: false,
    orderDetailsID: 0,
    orders: [],
    loaded: false
  }

  getOrdersAndSetToState() {
      getDoneOrders(this.props.userID).then(orders => this.setState({orders: orders.orders, loaded: true}))
  }

  componentDidMount() {
      this.props.navigation.addListener('willBlur', (route) => { this.setState({isDetails: false}) })
      this.getOrdersAndSetToState()
      this.getOrders()
  }

  getOrders() {
    console.log(this.state)
    
    return this.state.orders.map(({orderID, date, status, deliveryAddress, deliveryService}) => (
        <OrderListItem 
            key={orderID}
            id={orderID}
            time={date}
            delivery={`${deliveryAddress} / ${deliveryService}`}
            status='done'
            statusText={status}
            showRepeat={() => this.setState({isDetails: true, orderDetailsID: orderID})}
        />
    ))
  }

  render() {
    if(this.state.isDetails) {
      const {orderID, date, status, deliveryAddress, deliveryService} = this.state.orders.find(e => e.orderID===this.state.orderDetailsID)
      return <OrderInfo id={orderID} date={date} statusText={status} delivery={`${deliveryAddress} / ${deliveryService}`} />
    }
    if (!this.state.loaded) {
      return <Loading />
    }
    if(!this.state.orders || this.state.orders.length < 1) {
      return <NoOrders />
    }
    return (
      <View style={{flex: 1}}>
          <ScrollView >
              <View style={{ paddingHorizontal: 18, marginBottom: 20 }} >
                  {this.getOrders()}
              </View>
          </ScrollView>
        </View>
      )
  }
}

class DeniedOrders extends Component {
  state = {
    isDetails: false,
    orderDetailsID: 0,
    orders: [],
    loaded: false
  }

  getOrdersAndSetToState() {
      getDeniedOrders(this.props.userID).then(orders => this.setState({orders: orders.orders, loaded: true}))
  }

  componentDidMount() {
      this.props.navigation.addListener('willBlur', (route) => { this.setState({isDetails: false}) })
      this.getOrdersAndSetToState()
      this.getOrders()
  }

  getOrders() {
    console.log(this.state)
    
    return this.state.orders.map(({orderID, date, status, deliveryAddress, deliveryService}) => (
        <OrderListItem 
            key={orderID}
            id={orderID}
            time={date}
            delivery={`${deliveryAddress} / ${deliveryService}`}
            status='denied'
            statusText={status}
            showRepeat={() => this.setState({isDetails: true, orderDetailsID: orderID})}
        />
    ))
  }

  render() {
    if(this.state.isDetails) {
      const {orderID, date, status, deliveryAddress, deliveryService} = this.state.orders.find(e => e.orderID===this.state.orderDetailsID)
      return <OrderInfo id={orderID} date={date} statusText={status} delivery={`${deliveryAddress} / ${deliveryService}`} />
    }
    if (!this.state.loaded) {
      return <Loading />
    }
    if(!this.state.orders || this.state.orders.length < 1) {
      return <NoOrders />
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView >
          <View style={{ paddingHorizontal: 18, marginBottom: 20 }} >
              {this.getOrders()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

class ReturnOrders extends Component {
  state = {
    isDetails: false,
    orderDetailsID: 0,
    orders: [],
    loaded: false
  }

  getOrdersAndSetToState() {
      getReturnOrders(this.props.userID).then(orders => this.setState({orders: orders.orders, loaded: true}))
  }

  componentDidMount() {
      this.props.navigation.addListener('willBlur', (route) => { this.setState({isDetails: false}) })
      this.getOrdersAndSetToState()
      this.getOrders()
  }
  // {"orders":[{"orderID":39478,"date":"2019-05-08 14:46:27","status":"Offen","deliveryAddress":"Deutschland, Dnepr, Otakara Yarosha 222","deliveryService":"GLS"}]}
  getOrders() {
    console.log(this.state)
    return this.state.orders.map(({orderID, date, status, deliveryAddress, deliveryService}) => (
        <OrderListItem 
            key={orderID}
            id={orderID}
            time={date}
            delivery={`${deliveryAddress} / ${deliveryService}`}
            status='return'
            statusText={status}
            showRepeat={() => this.setState({isDetails: true, orderDetailsID: orderID})}
        />
    ))
  }

  render() {
    if(this.state.isDetails) {
      const {orderID, date, status, deliveryAddress, deliveryService} = this.state.orders.find(e => e.orderID===this.state.orderDetailsID)
      return <ReturnOrderInfo id={orderID} date={date} statusText={status} delivery={`${deliveryAddress} / ${deliveryService}`} />
    }
    if (!this.state.loaded) {
      return <Loading />
    }
    if(!this.state.orders || this.state.orders.length < 1) {
      return <NoOrders />
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView >
          <View style={{ paddingHorizontal: 18, marginBottom: 20 }} >
                {this.getOrders()}
            </View>
        </ScrollView>
      </View>
    )
  }
}

getDiscounts = (discounts) => {
    return discounts.map(({productName, productPrice, productID}) => {
        return(
            <View style={styles.line} key={productID} >
                  <Text style={styles.lineText}>{productName}:</Text>
                  <Text style={styles.lineText}>{productPrice} €</Text>
             </View>
        )
    })
}

class OrderInfo extends Component {
    state = {loaded: false}

    componentDidMount() {
      getOrderDetails(this.props.id).then(res => {this.setState({...res, loaded: true}); console.log(res)})
    }

    getProductsCards() {
        return this.state.products.map(({productName, productCount, previewImageURL, productPrice, productID}) => 
            // <View style={{marginBottom: 10}}>
                <CartItem 
                    order
                    id={productID}
                    key={productID}
                    img={previewImageURL} 
                    name={productName}
                    pcs={productCount}
                    price={productPrice}
                    stock
                />
            // </View>
        )
    }

    render() {
      console.log(this.props)
      console.log(this.state)
      if(!this.state.loaded) {
        return <Loading />
      }
      // const 
      return(
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{marginVertical: 23, marginHorizontal: 18, marginBottom: 80}}>
              {this.getProductsCards()}
              <View style={styles.shadowBlock}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9, marginBottom: 14, marginHorizontal: 10}}>
                    <Text style={styles.orderNumber} >Bestellen №{this.props.id}</Text>
                    <Text style={styles.dateText} >{this.props.date}</Text>
                </View>
                <Text style={styles.deliveryText}>Versand: <Text style={{color: '#000', flex: 1}}>{this.props.delivery}</Text></Text>
                <Text style={[styles.deliveryText, {color: '#000'}]}>{this.props.statusText}</Text>
              </View>
              <View style={styles.line}>
                  <Text style={styles.lineText}>Preis: </Text>
                  <Text style={styles.lineText}>{this.state.orderTotalPrice} €</Text>
              </View>
              <View style={styles.line}>
                  <Text style={styles.lineText}>Versandkosten:</Text>
                  <Text style={styles.lineText}>{this.state.orderDeliveryPrice} €</Text>
              </View>
              {/* <View style={styles.line}>
                  <Text style={styles.lineText}>Rabatt:</Text>
                  <Text style={styles.lineText}>XX €</Text>
              </View> */}
              {getDiscounts(this.state.pseudoProducts)}
              <View style={styles.line}>
                  <Text style={styles.lineText}>Summe:</Text>
                  <Text style={styles.lineText}>{this.state.orderVAT} €</Text>
              </View>
              <View style={styles.line}>
                  <Text style={styles.lineText}>MwSt:</Text>
                  <Text style={styles.lineText}>{(this.state.orderVAT - this.state.orderTotalPrice).toFixed(2)} €</Text>
              </View>

            </View>
          </ScrollView>
          <View style={styles.summaryContainer}>
              <Text style={styles.lineText}>Gesamt:</Text>
              <Text style={styles.lineText}>{this.state.orderVAT + this.state.orderDeliveryPrice} €</Text>
          </View>
          <FooterButton text='Bestellung wiederholen' onPress={() => {}} />
        </View>
      )
    } 
}

class ReturnOrderInfo extends Component {
  state = {loaded: false}

  componentDidMount() {
    getOrderDetails(this.props.id).then(res => {this.setState({...res, loaded: true}); console.log(res)})
  }

  getProductsCards() {
      return this.state.products.map(({productName, previewImageURL, productPrice, productID, returnData}) => {
        if(returnData){
          return(
            <CartItem 
              order
              id={productID}
              key={productID}
              img={previewImageURL} 
              name={productName}
              pcs={returnData.count}
              orderReturnReason={returnData.reason}
              price={productPrice}
              stock
            />
          )
        }
      })
  }

  getDiscounts() {
    const discounts = this.state.pseudoProducts
    if(discounts) {
      console.log(discounts)
    }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    if(!this.state.loaded) {
      return <Loading />
    }
    // const 
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{marginVertical: 23, marginHorizontal: 18, marginBottom: 80}}>
            {this.getProductsCards()}
            <View style={styles.shadowBlock}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9, marginBottom: 14, marginHorizontal: 10}}>
                  <Text style={styles.orderNumber} >Bestellen №{this.props.id}</Text>
                  <Text style={styles.dateText} >{this.props.date}</Text>
              </View>
              <Text style={styles.deliveryText}>Versand: <Text style={{color: '#000', flex: 1}}>{this.props.delivery}</Text></Text>
              <Text style={[styles.deliveryText, {color: '#000'}]}>{this.props.statusText}</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.lineText}>Preis: </Text>
                <Text style={styles.lineText}>{this.state.orderTotalPrice} €</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.lineText}>Versandkosten:</Text>
                <Text style={styles.lineText}>{this.state.orderDeliveryPrice} €</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.lineText}>Summe:</Text>
                <Text style={styles.lineText}>{this.state.orderVAT} €</Text>
            </View>
            <View style={styles.line}>
                <Text style={styles.lineText}>MwSt:</Text>
                <Text style={styles.lineText}>{(this.state.orderVAT - this.state.orderTotalPrice).toFixed(2)} €</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.summaryContainer}>
            <Text style={styles.lineText}>Gesamt:</Text>
            <Text style={styles.lineText}>{this.state.orderVAT + this.state.orderDeliveryPrice} €</Text>
        </View>
        <FooterButton text='Bestellung wiederholen' onPress={() => {}} />
      </View>
    )
  } 
}

class Orders extends Component {

    static navigationOptions = {
        title: 'Bestellungen',
        headerRight: (
            <View style={{flexDirection: 'row', marginRight: 9}}>
                <SearchButton />
            </View>
        )
    }

      render() {
        console.log(this.props)
        const tabOptions = {
          initialRouteName: this.props.navigation.getParam('selected', 'Offene Bestellungen'),
          tabBarOptions: {
            allowFontScaling: true,
            activeTintColor: 'red',
            upperCaseLabel: false,
            scrollEnabled: true,
            inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
            tabStyle: {
              height: 42
            },
            pressOpacity: 0,
            indicatorStyle: {
              backgroundColor: '#fff',
              height: 1.7,
              marginBottom: 1.7
            },
            style: {  
              height: 42,
              backgroundColor: '#c00017'
            },
            labelStyle: {
              color: '#fff',
              fontSize: 12,
              margin: 0,
              // borderWidth: 1,
              height: 12,
              lineHeight: 12,
              textAlignVertical: 'center'
            }
          },
        }
        const Tab = createMaterialTopTabNavigator({
          'Offene Bestellungen': {
            screen: props => <CurrentOrders {...props} userID={this.props.userID} />
          },
          'Abgeschlossene Bestellungen': {
            screen: props => <DoneOrders {...props} userID={this.props.userID} />
          },
          'Stornierte Bestellungen': {
            screen: props => <DeniedOrders {...props} userID={this.props.userID} />
          },
          'Retouren': {
            screen: props => <ReturnOrders {...props} userID={this.props.userID} />
          }
        }, tabOptions);
        const Aaa = createAppContainer(Tab);
        return <Aaa />;
      }
}

const mapStateToProps = ({userID}) => (
  {userID}
)

export default connect(mapStateToProps)(Orders)

const styles = {
      noOrdersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      noOrdersImage: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
      },
      noOrdersText: {
        marginTop: 10,
        color: 'grey',
        fontSize: 16
      },
      underHeaderSection: {
        height: 42,
        backgroundColor: '#c00017'
      },
      underHeaderButton: {
        paddingHorizontal: 10,
        marginHorizontal: 8,
        justifyContent: 'center'
      },
      underHeaderButtonText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)'
      },
      selectedUnderHeaderButton: {
        paddingHorizontal: 10,
        marginHorizontal: 8,
        justifyContent: 'center',
        paddingTop: 2,
        borderBottomWidth: 1.7,
        borderBottomColor: '#fff',
        marginBottom: 0.3
      },
      selectedUnderHeaderButtonText: {
        fontSize: 12,
        color: '#fff'
      },
      shadowBlock: {
        marginBottom: 22,
        elevation: 1.5,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        backgroundColor: '#fff',
        borderRadius: 5,
      },
      orderNumber: {
        fontSize: 16,
        color: '#c00017'
      },
      deliveryText: {
        marginLeft: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#a0a0a0'
      },
      dateText: {
        fontSize: 12,
        color: '#a0a0a0'
      },
      line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
      },
      lineText: {
        fontSize: 16,
        color: '#040404'
      },
      summaryContainer: {
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 1.5,
        shadowColor: 'rgb(0, 0, 0, 0.75)',
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        position: 'absolute',
        bottom: 59,
        width: '100%',
        backgroundColor: '#fff',
        height: 50,
        alignItems: 'center'
      },
};
    