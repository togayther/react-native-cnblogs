import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as CommentAction from '../action/comment';
import { postCategory } from '../config';
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import PostCommentBar from '../component/bar/postComment';
import NewsCommentList from '../component/listview/newsCommentList';
import PostCommentList from '../component/listview/postCommentList';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "评论";

class PostCommentPage extends Component {

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

  componentDidMount() {
    const { commentAction, category, id, blogger } = this.props;
    commentAction.getCommentsByPost(category, id, {
      blogger
    });
  }
  
  renderNavbar(){
    return (
      <Navbar
        leftIconName = { "ios-arrow-round-back" }
        leftIconOnPress={ ()=>this.props.router.pop() }
        title={ navTitle }/>
    )
  }

  renderCommentList(){
    let { router, comments, ui, category, blogger,  id } = this.props;
    if (this.state.hasFocus === false || ui.refreshPending !== false) {
      return (
					<Spinner style={ ComponentStyles.message_container }/>
      )
    }
    if (comments && comments.length) {
      return (
          <View style={ CommonStyles.flex_1 }>
              {
                category === postCategory.news?
                <NewsCommentList router={ router } category={ category } blogger={ blogger } id={ id }/>
                :
                <PostCommentList router={ router } category={ category } blogger={ blogger } id={ id }/>
              }
              <View style={ ComponentStyles.bar_patch }></View>
          </View>
      )
    }
    return(
      <HintMessage />
    );
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        { this.renderNavbar() }
        { this.renderCommentList() }
        <PostCommentBar {...this.props}/>
      </View>
    );
  }
}

export default connect((state, props) => ({
  comments : state.comment[props.id],
  ui: state.commentListUI[props.id]
}), dispatch => ({ 
  commentAction : bindActionCreators(CommentAction, dispatch)
}), null, {
  withRef: true
})(PostCommentPage);