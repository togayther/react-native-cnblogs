import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { default as NewsList } from '../../component/newsList';
import { postCategory } from '../../config';
import { CommonStyles } from '../../style';
class NewsCategory extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    let { router } = this.props;
    return (
        <View style={ CommonStyles.container }>
          <NewsList router={ router } />
        </View>
    );
  }
}

export default connect(state => ({
  
}), dispatch => ({ 
  
}))(NewsCategory);
