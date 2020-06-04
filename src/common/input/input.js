import React, { Component } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';

export default class Input extends Component {




  constructor(props) {
    super(props);
    this.state = {
      secure: false,
      height: 56
    }
    if (this.props.password) {
      this.state = {
        secure: true,
        img: require('../../assets/icons/040-eye-1.png'),
        height: 56
      }
    }
  }



  showPass() {
    this.setState(prevState => ({
      secure: !prevState.secure
    }))
    console.log(this.state.secure);
    let img;
    if (this.state.secure) {
      img = require('../../assets/icons/039-eye.png');
    } else {
      img = require('../../assets/icons/040-eye-1.png');
    }
    this.setState({img});
  }

  render() {
    const { placeholder, multiline, numberOfLines, value, keyboardType, maxLength, onChangeText, containerStyle, ...remainingProps } = this.props
    return (
      <View style={[styles.inputBox, { height: Math.max(56, this.state.height)}, containerStyle]}>
        <TextInput
          style={styles.inputStyle}
          placeholder={placeholder}
          placeholderTextColor='#a0a0a0'
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
          value={value}
          onChangeText={text => { onChangeText ? onChangeText(text) : null }}
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
          }}
          numberOfLines={numberOfLines}
          secureTextEntry={this.state.secure}
          {...remainingProps}
        />
        {this.state.img ? (
          <TouchableOpacity style={{flex: .1}} onPress={() => this.showPass()}>
            <Image style={{width: 24, height: 24, resizeMode: 'contain'}} source={this.state.img} key={'this.state.img'} />
          </TouchableOpacity>
        ) : null}

      </View>
    )
    
  }
}


const styles = {
  inputStyle: {
    textAlignVertical: 'center',
    fontSize: 16,
    paddingLeft: 0,
    width: '90%',
    flex: 1
  },
  inputBox: {
    height: 56,
    borderBottomWidth: 0.7,
    borderColor: '#949494',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  }
}