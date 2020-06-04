import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import ModalView from '../modal-view';

export default class PickerInput extends Component {
  

  state = {
    placeholder: this.props.placeholder,
    selected: this.props.selected,
    showPicker: false
  }

  PickerItems = () => (
    this.props.values.map((value, index) => {
      let style;
      if (this.state.selected === value) {
          style=[styles.unselectedDot, {borderWidth: 3.3, borderColor: '#d10019'}]
      } else style=styles.unselectedDot
      return (
          <TouchableOpacity 
              key={index} 
              style={{flexDirection: 'row', marginTop: 18}} 
              onPress={() => this.onSelect(value)}
          >
              <View style={style}></View>
              <Text style={styles.itemText} >{value}</Text>
          </TouchableOpacity>
      )
    })
  )

    onSelect(value) {
        this.setState({selected: value})
        this.props.onValueChange(value)
    }

  renderHelper() {
    // console.log(this.state.selected)
      if (this.state.selected) {
          return(
            <Text style={styles.inputStyle}>
                {this.state.selected}
            </Text>
          )
      } else {
          return(
              <Text style={[styles.inputStyle, {color: '#a0a0a0'}]}>
                  {this.state.placeholder}
              </Text>
          )
      }
  }

  render() {
    
    return(
      <>
          <TouchableOpacity style={styles.inputBox} onPress={() => this.setState({showPicker: !this.state.showPicker})}>
              {this.renderHelper()}
              <Image source={require('../../assets/icons/038-down-arrow.png')} style={styles.arrowStyle} key={'pickerArrowDown'} />
          </TouchableOpacity>
          <ModalView
            title={this.props.placeholder}
            buttonText='Speichern'
            onSubmit={() => {}}
            visible={this.state.showPicker}
            onRequestClose={() => this.setState({showPicker: !this.state.showPicker})}
          >
              {this.PickerItems()}
          </ModalView>
      </>
        
    )
  }
}

const styles = {
  inputStyle: {
    fontSize: 16,
    paddingLeft: 0,
    height: 54,
    lineHeight: 54,
    width: '90%',
    flex: 1,
    color: '#040404'
  },
  inputBox: {
    borderBottomWidth: 0.7,
    borderColor: '#949494',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  arrowStyle: {
    width: 10,
    height: 6,
    resizeMode: 'contain'
  },
  placeholder: {
    color: '#a0a0a0',
    fontSize: 12
  },
  unselectedDot: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderColor: '#a0a0a0'
  },
  itemText: {
    fontSize: 16,
    color: '#030303',
    marginLeft: 14
  }
}