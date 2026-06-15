import React from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
// import { View } from 'react-native/types_generated/index';
import Entypo from 'react-native-vector-icons/Entypo';
const AlertModal = ({ value, close, bigText, text }) => {
  return (
    <Modal
      visible={value}
      transparent={true}
      animationType="fade"
      onRequestClose={close}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000088',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: '#1A1A1A',
            borderRadius: 10,
            padding: 20,
            width: '90%',
          }}
        >
          <TouchableOpacity
            onPress={() => close()}
            style={{ alignItems: 'flex-end' }}
          >
            <Entypo name="circle-with-cross" color={'white'} size={20} />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>
            {bigText}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => close()}
              style={{
                width: '47%',
                height: 50,
                // backgroundColor: 'black',
                borderWidth: 1,
                borderColor: '#22C35D',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => close()}
              style={{
                width: '47%',
                height: 50,
                backgroundColor: '#22C35D',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
