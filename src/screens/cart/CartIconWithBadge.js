import React from 'react';
import IconWithBadge from '../cart/IconWithBadge'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { store } from '../../app/app'

class CartIconWithBadge extends React.Component {

    state = {
        cartItemCount: 0,
    };

    componentWillReceiveProps() {
        setTimeout(() => { this.badgeCountChecker() }, 5);
    }
    badgeCountChecker() {
        var sum = 0;
        try {
            AsyncStorage.getItem('Cart', (err, res) => {
                if (res != null) {
                    let arr = JSON.parse(res)
                    if (arr.length > 0)
                        arr.forEach(element => sum += element.count);
                    this.setState({
                        cartItemCount: sum,
                    })
                }
            });
        } catch (e) {
            console.warn(e)
        }
    };


    render() {
        return (
            <Provider store={store}>
                <IconWithBadge {...this.props} badgeCount={this.state.cartItemCount} />
            </Provider>

        )
    }
}

const mapStateToProps = ({ userInfo, cart }) => ({ userInfo, cart })


export default connect(mapStateToProps)(CartIconWithBadge)