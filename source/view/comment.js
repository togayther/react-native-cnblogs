import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import entities  from 'entities';
import Icon from 'react-native-vector-icons/Entypo';
import Backer from '../component/backer';
import Spinner from '../component/spinner';
import * as CommentAction from '../action/comment';
import NavigationBar from '../component/navbar/';
import PostHeader from '../component/postHeader';
import CommentList from '../component/commentList';
import { CommonStyles } from '../style';

const headerText = "博文评论";

class CommentPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      hasFocus: false,
      scrollButtonVisiable: false
    }
  }

  componentDidMount() {
    const { commentAction, category, pid } = this.props;
    commentAction.getCommentsByPost(category, pid);
  }

  componentDidFocus() {
    this.setState({
      hasFocus: true
    });
  }

  onScrollButtonPress(){
    this.scrollView.scrollTo({y:0});
  }

  onScrollHandle(event){
    let offsetY = event.nativeEvent.contentOffset.y;
    let scrollButtonVisiable = false;
    if (offsetY > scrollEnabledOffset) {
          scrollButtonVisiable = true;
    }else{
      scrollButtonVisiable = false;
    }

    this.setState({
      scrollButtonVisiable
    });
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

  renderCommentList(){
    let { router, comments, category, pid } = this.props;
    if (this.state.hasFocus && comments) {
      return (
        <CommentList router={ router } category={ category } pid={ pid }/>
      )
    }
    return (
      <Spinner size="large" style = { CommonStyles.refreshSpinner } animating={true}/>
    )
  }

  render() {
    
    let { post, router } = this.props;

    return (
      <View style={ CommonStyles.container}>
        <NavigationBar
            style = { CommonStyles.navbar}
            leftButton= { this.renderHeaderLeftConfig() }
            title={ this.renderHeaderTitleConfig() }>
        </NavigationBar>

        <View style={ CommonStyles.container }>
          
          <PostHeader post={ post } router={ router }/>

          { this.renderCommentList() }
        </View>
      </View>
    );
  }
}

export default connect((state, props) => ({
  comments : state.comment[props.pid],
  ui: state.commentListUI[props.pid]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(CommentPage);

