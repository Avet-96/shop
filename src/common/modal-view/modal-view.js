import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback,  View, ScrollView } from 'react-native';

import {sHeight} from '../../helpers/screenSize'

import ModalButton from '../modal-button';

class ModalView extends Component {

  render() {
    const {title, buttonText, children, onSubmit, visible, onRequestClose} = this.props;

    return (
      <View>
        <Modal
          animationType="slide"
          transparent
          visible={visible}
          onRequestClose={() => onRequestClose()}>
          <TouchableOpacity
            onPress={() => 
                onRequestClose()
            }
            style={styles.backgroundStyle}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalStyle}>
                <ScrollView style={styles.modalContentStyle}>
                  <Text style={styles.modalTitleStyle}>{title}</Text>
                  {children}
                </ScrollView>
                <ModalButton
                  onPress={() => {
                    onSubmit();
                    onRequestClose();
                  }}
                  text={buttonText}/>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}


const styles = {
  backgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width:'100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalStyle: {
    zIndex: 50,
    width: '90%',
    maxHeight: sHeight-100,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 5,
  },
  modalTitleStyle: {
    color: '#d10019',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10
  },
  modalContentStyle: {
    paddingHorizontal: 10,
    paddingBottom: 26
  }
}

export default ModalView;
