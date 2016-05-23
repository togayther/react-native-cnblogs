import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { default as PostList } from '../../component/postList';
import { postCategory } from '../../config';
import Styles from '../../style';

class NewsCategory extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    let { router } = this.props;
    return (
        <View>
          <PostList 
            router={ router } 
            category={ postCategory.news }/>
        </View>
    );
  }
}

export default connect(state => ({
  
}), dispatch => ({ 
  
}))(NewsCategory);
