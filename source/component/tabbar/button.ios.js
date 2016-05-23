import React from 'react';
import {
  View,
  TouchableOpacity
} from 'react-native';

const Button = (props) => {
  return <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>;
};

module.exports = Button;