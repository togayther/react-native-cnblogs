import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { CommonStyles, StyleConfig, SearchStyles} from '../style';
import SearchBar from '../component/searchBar';
import * as AuthorAction from '../action/author';
import Spinner from '../component/spinner';

const defaultRankAuthorCount = 20;

class SearchPage extends Component {

  constructor (props) {
    super(props); 
  }

  componentDidMount(){
    this.fetchRankAuthors();
  }

  fetchRankAuthors(){
    const { authorAction, authors, ui } = this.props;
    if (!authors.ranks || !authors.ranks.length || !ui.rankPending) {
      authorAction.getAuthorByRank({ pageSize: defaultRankAuthorCount });
    }
  }

  onSearchHandle(){
    const { authorAction } = this.props;

    this.

    authorAction.getAuthorsByKey('麦克');
  }

  renderAuthorItem(item, index){
    return (
      <TouchableHighlight
        key={ index }
        onPress={ ()=> null }
        underlayColor={ StyleConfig.touchablePressColor }>
        <View style={ CommonStyles.listItem }>
          <Image source = {{uri: item.avatar}} style={ CommonStyles.listItemIcon }/>
          <Text style={ CommonStyles.listItemText }>
            { item.title }
          </Text>
          <Text style={ CommonStyles.listItemTail }>
            <Icon
              name='chevron-thin-right'
              size={14}
              color = {'#888'}
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
          <View style={ styles.titleContainer }>
            <Text style={ styles.titleText }>热门博主</Text>
          </View>
          { this.renderAuthors(rankAuthors) }
        </View>
      )
    }
    return (
      <Spinner size="large" style = { CommonStyles.refreshSpinner } animating={true}/>
    )
  }

  renderSearchAuthors(){
    let { searchs: searchAuthors } = this.props.authors;

    if (searchAuthors && searchAuthors.length) {
      return (
        <View>
          <View style={ styles.titleContainer }>
            <Text style={ styles.titleText }>搜索结果</Text>
          </View>
          { this.renderAuthors(searchAuthors) }
        </View>
      )
    }
    return (
      <Spinner size="large" style = { CommonStyles.refreshSpinner } animating={true}/>
    )
  }

  render() {

    let { authors, ui } = this.props;
    let { ranks: rankAuthors, searchs: searchAuthors } = authors;

    return (
      <View style={ CommonStyles.container }>
        <SearchBar 
          onSearchHandle = { this.onSearchHandle.bind(this) } 
          placeholder = { '请输入博主名称' }
          router={ this.props.router }/>

        <ScrollView>
          {
             (searchAuthors && searchAuthors.length) || ui.searchPending === true ?
             this.renderSearchAuthors()
             :
             this.renderRankAuthors()
          }
        </ScrollView>
        
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  titleContainer:{
    flex: 1,
    backgroundColor:'#f8f8f8',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent:'center'
  },
  titleText:{
    fontSize: 16,
  }
});

export default connect(state => ({
  authors : state.author,
  ui: state.authorListUI
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}), null, {
  withRef: true
})(SearchPage);

