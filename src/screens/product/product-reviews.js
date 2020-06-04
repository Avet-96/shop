import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux'

import {sWidth} from '../../helpers/screenSize'

import Rating from '../../common/rating';

import Loading from '../loading';

import ReviewsFooterButton from '../../common/reviews-footer-button';



const ReviewItem = ({name, rating, date, text}) => {
  return(
    <View style={styles.reviewContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Rating rating={rating} />
          </View>
          
          <Text style={styles.date}>
            {date}
          </Text>
      </View>
      
      <Text style={styles.reviewContent}>
        {text}
      </Text>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButoonText}>
            Weiterlesen
        </Text>
      </TouchableOpacity>
    </View>
  )
}


class ProductReviews extends Component {

    getReviewsCards() {
        const reviews = this.props.reviews
        return reviews.map(review => (
            <ReviewItem 
                name={review.user}
                rating={review.rate*2}
                date={review.date}
                text={review.text}
                key={review.date}
            />
        )) 
    }

    render() {
        console.log(this.props)
        if(!this.props.id) {
            return <Loading />
        }
        if (this.props.reviews.length < 1) {
          return (
            <View style={styles.noReviewsContainer}>
                <Image source={require('../../assets/message-icons/no-reviews.png')} style={styles.noReviewImage} />
                <Text style={styles.noReviewText} >Es gibt noch keine Bewertungen</Text>
                <ReviewsFooterButton productID={this.props.id} />
            </View>
          )
        }
        return (
          <View style={{flex: 1}}>
            <ScrollView>
              <Text style={styles.counterText}>
                Bewertungen insgesamt: {this.props.reviews.length}
              </Text>
              {this.getReviewsCards()}
              <View style={{height: 60}}></View>
            </ScrollView>
          <ReviewsFooterButton productID={this.props.id} />
        </View>

        );
    }
}

const mapStateToProps = ({currentProduct}) => (
  {
    productID: currentProduct.id
  }
)

export default connect(mapStateToProps)(ProductReviews)

const styles = {
  noReviewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noReviewImage: {
    height: 80,
    width: 80,
    resizeMode: 'contain'
  },
  noReviewText: {
    marginTop: 10,
    color: '#717171',
    fontSize: 16
  },
  counterText: {
    fontSize: 12,
    color: '#030303',
    marginLeft: 18,
    marginTop: 20,
    marginBottom: 15
  },
  reviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 18,
    marginVertical: 7,
    elevation: 4,
    shadowColor: 'rgb(0, 0, 0, 0.75)',
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  name: {
    maxWidth: sWidth/3,
    color: '#c00017',
    fontSize: 12,
    marginHorizontal: 12
  },
  date: {
    fontSize: 10,
    color: '#a0a0a0',
    marginRight: 12
  },
  reviewContent: {
    fontSize: 12,
    lineHeight: 20,
    color: '#070707',
    marginTop: 14,
    marginHorizontal: 12
  },

  moreButoonText: {
    color: '#a0a0a0',
    fontSize: 12
  },
  moreButton: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  }
}