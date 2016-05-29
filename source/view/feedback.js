import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class FeedBackPage extends Component {

  constructor (props) {
    super(props); 
  }

  componentDidMount(){
  }


  render() {
    return (
      <View>
        <Text>
          feedback
        </Text>
      </View>
    );
  }
}

export default connect(state => ({

}), dispatch => ({ 

}), null, {
  withRef: true
})(FeedBackPage);

