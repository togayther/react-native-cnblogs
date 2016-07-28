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
import * as AuthorAction from '../action/author';
import Config from '../config';
import SearchBar from '../component/searchBar';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import { decodeHTML, getImageSource } from '../common';
import { CommonStyles, StyleConfig, SearchStyles } from '../style';

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

  componentDidMount(){
    const { authorAction, authors, ui } = this.props;
    if (!authors.ranks || !authors.ranks.length || !ui.rankPending) {
      authorAction.getAuthorByRank({ pageSize: 20 });
    }
  }

  onSearchHandle(key){
    const { authorAction, ui } = this.props;
    key = _.trim(key);
    if (key && key!=this.searchKey && !ui.searchPending) {
      this.searchKey = key;
      this.searchTag = true;
      authorAction.getAuthorsByKey(key);  
    }
  }

  onSearchClearHandle(){
    let { authorAction } = this.props;
    this.searchTag = false;
    authorAction.clearAuthorSearchResult();  
  }

  onAuthorPress(author){
    let { router } = this.props;
    if (author) {
      router.toAuthor({
        name: author
      });
    }
  }

  renderAuthorItem(item, index){

    let authorName = decodeHTML(item.title);
    let authorAvatar = item.avatar || Config.appInfo.avatar;

    return (
      <TouchableHighlight
        key={ index }
        onPress={ ()=>this.onAuthorPress(item.blogapp) }
        underlayColor={ StyleConfig.touchablePressColor }>
        <View style={ [CommonStyles.listItem, CommonStyles.borderBottom ] }>
          <Image source = {{uri: authorAvatar}} style={ CommonStyles.listItemIcon }/>
          <Text style={ CommonStyles.listItemText }>
            { authorName }
          </Text>
          <Text style={ CommonStyles.listItemTail }>
            <Icon
              name='ios-return-right'
              size={ 20 }
              color = { StyleConfig.headerColor }
            />
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderAuthors(authors){
    return authors.map((item, index)=> this.renderAuthorItem(item,index));
  }

  renderRankAuthors(){
    let { ranks: rankAuthors } = this.props.authors;
    if (rankAuthors && rankAuthors.length) {
      return (
        <View>
          <View style={ SearchStyles.header }>
            <Text style={ SearchStyles.headerText }>热门博主</Text>
          </View>
          { this.renderAuthors(rankAuthors) }
        </View>
      )
    }
    return (
      <View style = { CommonStyles.spinnerContainer } >
        <Spinner/>
      </View>
    )
  }

  renderSearchAuthors(){
    let { searchs: searchAuthors } = this.props.authors;

    return (
      <View>
        <View style={ SearchStyles.header }>
          <Text style={ SearchStyles.headerText }>搜索结果</Text>
          <TouchableOpacity 
            onPress={ this.onSearchClearHandle.bind(this) }>
            <Icon 
              name={'ios-close-circle-outline'} 
              size={ 22 }/>
          </TouchableOpacity>
        </View>
        {
          searchAuthors && searchAuthors.length?
          this.renderAuthors(searchAuthors)
          :
          <HintMessage />
        }
      </View>
    )
  }

  renderContent(){
    let { authors, ui } = this.props;
    let { ranks: rankAuthors, searchs: searchAuthors } = authors;
    if (!this.state.hasFocus || ui.searchPending === true) {
      return(
        <View style = { CommonStyles.spinnerContainer } >
          <Spinner/>
        </View>
      );
    }

    if (searchAuthors && searchAuthors.length || this.searchTag === true) {
      return this.renderSearchAuthors();
    }

    return this.renderRankAuthors();
  }

  render() {

    return (
      <View style={ CommonStyles.container }>
        <SearchBar 
          onSearchHandle = { this.onSearchHandle.bind(this) } 
          placeholder = { '请输入博主名称' }
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
  authors : state.author,
  ui: state.authorListUI
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}), null, {
  withRef: true
})(SearchPage);
