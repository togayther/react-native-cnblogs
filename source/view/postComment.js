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
import Navbar from '../component/navbar';
import Spinner from '../component/spinner';
import CommentList from '../component/listview/postCommentList';
import HintMessage from '../component/hintMessage';

import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const navTitle = "评论";

class CommentPage extends Component {

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
    const { commentAction, category, pid } = this.props;
    commentAction.getCommentsByPost(category, pid);
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
    let { router, comments, ui, category, pid } = this.props;
    
    if (this.state.hasFocus === false || ui.refreshPending !== false) {
      return (
        <View style={ CommonStyles.spinnerContainer }>
          <Spinner />
        </View>
      )
    }
    if (comments && comments.length) {
      return (
        <CommentList router={ router } category={ category } pid={ pid }/>
      )
    }
    return(
      <HintMessage />
    );
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
        
        { this.renderNavbar() }

        { this.renderCommentList() }

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