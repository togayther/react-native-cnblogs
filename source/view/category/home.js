import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { default as PostList } from '../../component/postList';
import { postCategory } from '../../config';
import { CommonStyles } from '../../style';

class HomeCategory extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
        <View style={ CommonStyles.container }>
          <PostList router={ this.props.router } 
            category={ postCategory.home }/>
        </View>
    );
  }
}

export default HomeCategory;
