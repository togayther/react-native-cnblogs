import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as SearchAction from '../action/search';
import SearchBar from '../component/searchBar';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import SearchList from '../component/listview/searchList';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

//仅搜索博文类别。
const searchCategory = "blog"; 

class SearchPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false
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

  onListEndReached(){
		const { searchAction, ui } = this.props;
		searchAction.searchByKeyWithPage(searchCategory, this.searchKey, {
			pageIndex: ui.pageIndex + 1
		});
	}

  onSearchClearHandle(){
    const { searchAction } = this.props;
    searchAction.clearSearchResult(searchCategory);  
  }

  renderSearchFlag(){
    return (
        <View style={[ CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, CommonStyles.p_a_3, ComponentStyles.panel_bg ]}>
          <Text style={[ CommonStyles.font_xs ]}>
            搜索结果
          </Text>
          <TouchableOpacity 
            onPress={ ()=>this.onSearchClearHandle() }>
            <Icon 
              name={'ios-close-circle-outline'}
              color = { StyleConfig.color_primary } 
              size={ StyleConfig.icon_size }/>
          </TouchableOpacity>
        </View>
    )
  }

  renderSearchList(){
    const { router } = this.props;
    return (
        <SearchList
            router =  { router }
            category={ searchCategory } 
            onListEndReached = {()=>this.onListEndReached()}/>
    )
  }

  renderSearchContent(){
    const { search, router } = this.props;
    if(search && search.length){
      return (
         <View style={ CommonStyles.flex_1 }>
              { this.renderSearchFlag() }
              { this.renderSearchList() }
         </View>
      )
    }
    if(this.searchFlag === true){
      return <HintMessage message='无搜索结果信息'/>
    }
  }

  renderContent(){
    const { authors, ui } = this.props;
    if (this.state.hasFocus === false || ui.searchPending !== false) {
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
          { this.renderContent() }
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
