import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, Share, StyleSheet, LayoutAnimation } from 'react-native'

import { addToCart } from '../../functions/cart-funcs'

import { connect } from 'react-redux'

import Loading from '../loading'

import { addToFavourite } from '../../posts/favouritesPosts'

import { getPreviewProductData } from '../../gets/productPosts';

import Rating from '../../common/rating';

import { sHeight } from '../../helpers/screenSize';

import ProductListItem from '../../common/product-list-item';

import Slider from '../../common/slider';

import NavigationService from '../../navigation-service';


import HTML from 'react-native-render-html';

class ProductDescription extends Component {
  componentDidMount() {
    this.getSimilarToState(this.props.productSimilar)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.productSimilar != nextProps.productSimilar) {
      const productsIDs = nextProps.productSimilar
      productsIDs ? this.getSimilarToState(productsIDs) : null
      // this.getSimilarToState(productsIDs)
      // this.setState({...this.props.userInfo, });
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // if(info.productName){
  //   //   return true
  //   // }
  //   // console.log(nextProps)
  //   return false
  // }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  state = {
    descMore: false,
    similar: []
  }

  getProductImages(images) {
    return images.map(image => {
      return { uri: image }
    })
  }

  getStock(count) {
    if (count < 1) {
      return <Text style={styles.notInStock}>Produkt nicht verfügbar</Text>
    }
    return <Text style={styles.inStock}>Produkt ist verfügbar</Text>
  }

  getPrices(price, salePrice, companyPrice) {
    // if (salePrice && salePrice != 0) {
    if (salePrice != 0) {
      return (
        <View>
          <Text style={styles.previousPrice}>{'UVP ' + salePrice.toFixed(2)} €</Text>
          <Text style={styles.salePrice}>{this.props.userInfo.selectedUserType === 'EK' ? price.toFixed(2) : companyPrice.toFixed(2)} €</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.price}>{this.props.userInfo.selectedUserType === 'EK' ? price.toFixed(2) : companyPrice.toFixed(2)} €</Text>
        </View>
      )
    }
  }

  getSalePercent(percent) {
    if (percent) {
      return (
        <View style={styles.discountBlock} >
          <Text style={styles.discountText}>-{percent}%</Text>
        </View>
      )
    }
    return null
  }

  handleMoreLessButton() {
    this.setState({ descMore: !this.state.descMore })
  }

  getDescButton() {
    if (this.state.descMore) {
      return (
        <TouchableOpacity style={styles.showMoreButton} onPress={() => this.handleMoreLessButton()} >
          <Text style={styles.showMoreButtonText}>
            Schließen
                  </Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity style={styles.showMoreButton} onPress={() => this.handleMoreLessButton()} >
        <Text style={styles.showMoreButtonText}>
          Mehr Details
              </Text>
      </TouchableOpacity>
    )
  }

  getSimilarToState(productsIDs) {
    if (!productsIDs) {
      return
    }
    if (productsIDs.length < 1) {
      return
    }
    productsIDs.map((id) => {
      getPreviewProductData(id)
        .then(res => {
          this.setState({ similar: [...this.state.similar, { ...res, id }] })
        })
    })
  }

  getSimilarText() {
    if (this.state.similar.length < 1) {
      return null
    }
    return (
      <View>
        <Text style={styles.similarText}>          Ähnliche Produkte                  </Text>
      </View>
    )
  }

  getSimilarProductsCards() {
    if (this.state.similar.length < 1) {
      return null
    }
    return this.state.similar.map(product => {
      const { companyPrice, previewImgURL, price, productName, productSalePercent, rate, salePrice, stock, productID } = product
      // return (
      //   <Text style={styles.similarText}>
      //       Ähnliche Produkte
      //   </Text>
      // )      
      return (
        <ProductListItem
          name={productName}
          price={this.props.userInfo.selectedUserType === 'EK' ? price.toFixed(2) : companyPrice.toFixed(2)}
          // salePrice={'UVP ' + salePrice.toFixed(2)}
          salePrice={salePrice != 0 ? 'UVP ' + salePrice.toFixed(2) : ''}
          companyPrice={companyPrice.toFixed(2)}
          rate={rate}
          stock={stock}

          id={productID}
          imageURL={previewImgURL}

          key={productID}
          favourite
          salePercent={productSalePercent ? productSalePercent.int : null}
        />
      )
    })
  }

  getCartButton(stock, id) {
    if (stock > 0) {
      return (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart(id)}>
          <Image style={styles.cartButtonImage} source={require('../../assets/icons-color/002-shopping2.png')} key={'cartImageOnProductPage'} />
          <Text style={styles.cartButtonText}>In den Warenkorb</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    console.log("this.state in product-description.js", this.state)
    const productInfo = this.props.productInfo
    if (!this.props.productInfo.productName) {
      return <Loading />
    }
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.line}>
            <Text style={styles.name}>
              {productInfo.productName}
            </Text>
            <TouchableOpacity style={styles.shareBbutton} onPress={() => Share.share({ message: `teleropa.de/${productInfo.siteURL}`, url: `teleropa.de/${productInfo.siteURL}` })} >
              <Image source={require('../../assets/icons/031-share.png')} style={styles.shareButtonImage} key={'shareImage'} />
            </TouchableOpacity>
          </View>
          <View style={styles.carousel}>
            <Slider data={this.props.images ? this.getProductImages(this.props.images) : null} />
            {this.props.userID !== 'notloggedin' && this.props.userID ? <TouchableOpacity style={styles.favButton} onPress={() => addToFavourite(this.props.userID, this.props.id)}>
              <Image style={styles.favImage} source={require('../../assets/icons-color/004-heart-white.png')} key={'favImageButton1'} />
            </TouchableOpacity> : null}
            {this.getSalePercent(productInfo.productSalePercent ? productInfo.productSalePercent.int : null)}
          </View>

          {/* цена в описании продукта (не стики) */}
          {/* <View style={styles.line}>
            {this.getStock(productInfo.stock)}
            <Text style={styles.id}>Artikelnummer: {this.props.id} </Text>
          </View>
          <View style={[styles.line, { marginTop: 12 }]} >
            {this.getPrices(productInfo.price, productInfo.salePrice, productInfo.companyPrice)}
            {this.getCartButton(productInfo.stock, this.props.id)}
          </View> */}

          <View style={{ marginLeft: 18, marginTop: 10 }}>
            <Rating rating={productInfo.rate} />
          </View>
          <View style={styles.descriptionBlock}>
            <Text style={styles.descriptionHelper}>
              Beschreibung
                    </Text>
            <HTML staticContentMaxWidth={50} html={this.props.productDescription ? this.props.productDescription : 'Produktbeschreibung ist nicht vorhanden'} containerStyle={[styles.description, { maxHeight: this.state.descMore ? 10000 : 100 }]} tagsStyles={HTMLStyles} />

            <View style={styles.descLine}></View>
            {this.getDescButton()}
          </View>
          <TouchableOpacity style={styles.subscribeButton} onPress={() => NavigationService.navigate('ProductSubscribe', { productID: this.props.id })}>
            <Text style={styles.subscribeButtonText}>
              Newsletter anmelden
                    </Text>
          </TouchableOpacity>
          {this.getSimilarText()}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
            {this.getSimilarProductsCards()}
          </View>
        </ScrollView>

        {/* цена в описании продукта (стики) */}
        <View style={[styles.line, { marginTop: 10 }]} >

          {this.getStock(productInfo.stock)}
          <Text style={styles.id}>Artikelnummer: {this.props.id} </Text>
        </View>

        <View style={[styles.line]} >
          {this.getPrices(productInfo.price, productInfo.salePrice, productInfo.companyPrice)}
          {this.getCartButton(productInfo.stock, this.props.id)}
        </View>

      </View>
    )
  }
}

const mapStateToProps = ({ userID, userInfo }) => ({ userID, userInfo })

export default connect(mapStateToProps)(ProductDescription)

const HTMLStyles = StyleSheet.create({
  p: {
    margin: 0,
    padding: 0
  },
  h1: {
    margin: 0,
    padding: 0
  }

})

const styles = {
  descLine: {
    width: '100%',
    height: .7,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  descriptionBlock: {
    marginTop: 18,
    elevation: 4,
    shadowColor: 'rgb(0, 0, 0, 0.5)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18
  },
  name: {
    fontSize: 16,
    color: '#040404',
    lineHeight: 24,
    width: '80%',
    marginTop: 20
  },
  shareBbutton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  shareButtonImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  carousel: {
    marginVertical: 20,
    height: sHeight / 2,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: 'rgb(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  inStock: {
    fontSize: 16,
    color: '#3f911b'
  },
  notInStock: {
    fontSize: 16,
    color: '#d10019'
  },
  price: {
    fontSize: 20,
    marginTop: 8,
    color: '#000'
  },
  salePrice: {
    fontSize: 20,
    color: '#d10019',
    marginTop: 8
  },
  previousPrice: {
    fontSize: 12,
    color: '#a0a0a0',
    textDecorationLine: 'line-through'
  },
  id: {
    fontSize: 12,
    color: '#050505'
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f911b',
    height: 40,
    width: 164,
    borderRadius: 5
  },
  cartButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff'
  },
  cartButtonImage: {
    width: 22,
    height: 18
  },
  descriptionHelper: {
    fontSize: 12,
    color: '#a0a0a0',
    marginLeft: 18,
    marginTop: 10,
    marginBottom: 10
  },
  description: {
    marginHorizontal: 18,
    overflow: 'hidden',
    paddingBottom: 5
  },
  showMoreButton: {
    backgroundColor: '#fff',
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18
  },
  showMoreButtonText: {
    color: '#a0a0a0',
    fontSize: 11,
    textAlignVertical: 'center',
  },
  subscribeButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#d10019',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 22
  },
  subscribeButtonText: {
    fontSize: 16,
    color: '#d10019'
  },
  similarText: {
    fontSize: 16,
    color: '#050505',
    marginLeft: 18,
    marginTop: 10
  },
  favButton: {
    height: 28,
    width: 28,
    backgroundColor: '#d10019',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    position: 'absolute',
    top: 15,
    right: 15
  },
  favImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  discountBlock: {
    position: 'absolute',
    left: 16,
    bottom: 25,
    borderRadius: 5,
    backgroundColor: '#d10019',
    alignItems: 'center',
    justifyContent: 'center',
    height: 22,
    width: 45
  },
  discountText: {
    fontSize: 12,
    color: '#fff'
  }
}