import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';

import { connect } from 'react-redux'

export class PaypalConfirm extends Component {

    render() {
        return(
            <View>
                <Text>
                    Status
                </Text>
            </View>
        )
    }
}

const mapStateToProps = ({ userInfo, userID }) => ({ userInfo, userID })

export default connect(mapStateToProps)(PaypalConfirm)
