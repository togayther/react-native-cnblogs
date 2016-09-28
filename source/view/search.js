import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as SearchAction from '../action/search';
import Config from '../config';
import SearchBar from '../component/searchBar';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import { decodeHTML, getImageSource } from '../common';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

//仅搜索博文类别。
const searchCategory = "blog"; 

class SearchPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false,
      searchFlag: false
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onSearchHandle(key){
    const { searchAction, ui } = this.props;
    key = _.trim(key);
    if (key && key!=this.searchKey && !ui.searchPending) {
      this.searchKey = key;
      this.searchFlag = true;
      searchAction.searchByKey(searchCategory, key);  
    }
  }

  onSearchClearHandle(){
    let { authorAction } = this.props;
    searchAction.clearSearchResult();  
  }

  onSearchItemPress(searchItem){
    let { router } = this.props;
    
  }

  renderSearchResultItem(item, index){
     return (
      <View key = { index }>
        <Text>
          这是搜索项渲染
        </Text>
      </View>
    )
  }

  renderSearchResult(){
    let { search } = this.props;
    return (
      <View>
        {
            search.map((searchItem, index)=>{
              return this.renderSearchResultItem(searchItem, index);
            })
        }
      </View>
    )
  }


  renderSearchFlag(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          <Text style={[ CommonStyles.font_xs ]}>
            搜索结果
          </Text>
          <TouchableOpacity 
            onPress={ this.onSearchClearHandle.bind(this) }>
            <Icon 
              name={'ios-close-circle-outline'}
              color = { StyleConfig.color_danger } 
              size={ StyleConfig.icon_size }/>
          </TouchableOpacity>
        </View>
    )
  }

  renderSearchContent(){
    let { search } = this.props;
    if(search && search.length){
      return (
          <View>
              { this.renderSearchFlag() }
              { this.renderSearchResult() }
          </View>
      )
    }
    if(this.searchFlag === true){
      return <HintMessage/>
    }
  }

  renderContent(){
    let { authors, ui } = this.props;
   
    if (ui.searchPending === true) {
      return(
          <Spinner style={ ComponentStyles.message_container }/>
      );
    }

    return this.renderSearchContent();
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        <SearchBar 
          onSearchHandle = { this.onSearchHandle.bind(this) } 
          placeholder = { '请输入博文关键字' }
          router={ this.props.router }/>

        <ScrollView
          showsVerticalScrollIndicator = {false}
          showsHorizontalScrollIndicator = {false}>
          { this.renderContent() }
        </ScrollView>
        
      </View>
    );
  }
}

export default connect(state => ({
  search : state.search[searchCategory],
  ui: state.searchUI[searchCategory]
}), dispatch => ({ 
  searchAction : bindActionCreators(SearchAction, dispatch)
}), null, {
  withRef: true
})(SearchPage);
