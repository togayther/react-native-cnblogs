import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { default as PostList } from '../../component/postList';
import { postCategory } from '../../config';
import { CommonStyles } from '../../style';

class HomeCategory extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    let { router } = this.props;
    return (
        <View style={ CommonStyles.container }>
          <PostList 
            router={ router } 
            category={ postCategory.home }/>
        </View>
    );
  }
}

export default connect(state => ({
  
}), dispatch => ({ 
  
}))(HomeCategory);
