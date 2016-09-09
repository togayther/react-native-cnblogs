import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  TouchableHighlight
} from 'react-native';

import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as AuthorAction from '../action/author';
import Spinner from '../component/spinner';
import HintMessage from '../component/hintMessage';
import AuthorRender from '../component/authorRender';
import AuthorPostList from '../component/authorPostList';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

class AuthorPage extends Component {

  constructor (props) {
    super(props);

    this.state = {
      hasFocus: false
    }

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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

  onListEndReached(){
    const { authorAction, ui, name } = this.props;
    if (ui && ui.postPageEnabled) {
      authorAction.getAuthorDetailWithPage(name, {
        pageIndex: ui.postPageIndex + 1
      });
    }
  }

  renderAuthorContent(){
    let { author, ui } = this.props;

    if (this.state.hasFocus === false || (ui && ui.refreshPending !== false)) {
      return (
        <View style={ CommonStyles.spinnerContainer }>
          <Spinner />
        </View>
      )
    }

    if (author && author.entry) {
      return (
        <View style={ CommonStyles.container }>
          <AuthorPostList name={ this.props.name } router = { this.props.router } author={ author }/>
        </View>
      )
    }
    return(
      <HintMessage />
    );
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
          <AuthorRender 
            author={ this.props.author } 
            router = { this.props.router }
            onListEndReached = { ()=>this.onListEndReached() }>

            { this.renderAuthorContent() }
          </AuthorRender>
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