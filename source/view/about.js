import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Styles from '../style';

class AboutPage extends Component {

  constructor (props) {
    super(props); 
  }

  componentDidMount(){
  }


  render() {
    return (
      <View>
        <Text>
          about
        </Text>
      </View>
    );
  }
}

export default connect(state => ({

}), dispatch => ({ 

}))(AboutPage);

