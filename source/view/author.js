import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';
import entities  from 'entities';
import Icon from 'react-native-vector-icons/Entypo';
import Backer from '../component/backer';
import Spinner from '../component/spinner';
import * as AuthorAction from '../action/author';
import AuthorPostList from '../component/authorPostList';
import NavigationBar from '../component/navbar/';
import AuthorHeader from '../component/authorHeader';

import { CommonStyles, PostDetailStyles, AuthorDetailStyles, StyleConfig } from '../style';

const headerText = "博主详情";

class AuthorPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false,
      scrollButtonVisiable: false
    }
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  componentDidMount(){
    let { authorAction, name } = this.props;

    authorAction.getAuthorDetail(name);
  }

  renderHeaderLeftConfig(){
    let { router } = this.props;
      return (
        <Backer router = { router }/>
      )
  }

  renderHeaderTitleConfig(){
    return (
      <Text style={ CommonStyles.navbarText }>
        { headerText }
      </Text>
    )
  }

  renderAuthorPosts(author){
    const { name, router } = this.props;
    return (
      <AuthorPostList name={ name } router = { router } author={ author }/>
    )
  }

  renderAuthorContent(){
    let { author } = this.props;

    if (this.state.hasFocus && author) {
      return (
        <View style={ CommonStyles.container }>
          <AuthorHeader author={ author }/>
          {
            author.entry?
            this.renderAuthorPosts(author) 
            :null
          }
        </View>
      )
    }
    return (
      <Spinner size="large" style = { CommonStyles.refreshSpinner } animating={true}/>
    )
  }

  render() {

    let { author } = this.props;

    return (
      <View style={ CommonStyles.container}>
        <NavigationBar
            style = { CommonStyles.navbar}
            leftButton= { this.renderHeaderLeftConfig() }
            title={ this.renderHeaderTitleConfig() }>
        </NavigationBar>

        { this.renderAuthorContent() }
        
      </View>
    );
  }
}

export default connect((state, props) => ({
  author: state.author.details[props.name],
  ui: state.authorDetailUI[props.name]
}), dispatch => ({ 
  authorAction : bindActionCreators(AuthorAction, dispatch)
}), null, {
  withRef: true
})(AuthorPage);

