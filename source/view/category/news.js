import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { default as NewsList } from '../../component/newsList';
import { postCategory } from '../../config';
import { CommonStyles } from '../../style';
class NewsCategory extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
        <View style={ CommonStyles.container }>
          <NewsList router={ this.props.router } />
        </View>
    );
  }
}

export default NewsCategory;
