import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CommonStyles, SearchStyles } from '../style';
import SearchBar from '../component/searchBar';

class SearchPage extends Component {

  constructor (props) {
    super(props); 
  }

  componentDidMount(){
  }


  onSearchHandle(){
    console.info("handle search");
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
        <SearchBar onSearchHandle = { this.onSearchHandle.bind(this) } router={ this.props.router }/>

        <View>
          
        </View>
      </View>
    );
  }
}

export default connect(state => ({

}), dispatch => ({ 

}), null, {
  withRef: true
})(SearchPage);

