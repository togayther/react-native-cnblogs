import React, { Component } from 'react';
import {
  View,
  Dimensions,
  RefreshControl,
  DrawerLayoutAndroid
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DrawerPanel from '../component/drawerPanel';
import MenuButton from '../component/menuButton';

import HomeRender from '../component/header/home';
import PostList from '../component/listview/postList';
import NewsList from '../component/listview/newsList';
import BlinkList from '../component/listview/blinkList';
import QuestionList from '../component/listview/questionList';

import * as PostAction from '../action/post';
import { postCategory } from '../config';
import refreshControlConfig from '../config/refreshControl';
import { StyleConfig } from '../style';

class HomePage extends Component {

  constructor (props) {
    super(props);

    this.state = {
      category: postCategory.home
    };

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount(){
    this.fetchPostData(this.state.category);
  }

  fetchPostData(category, param){
    this.props.postAction.getPostByCategory(category).then(()=>{
      this.setState({ category:category });
    });  
  }

  renderNavigationView(){
    return (
      <DrawerPanel 
        router={this.props.router} 
        onDrawerPress={(e)=>this.onDrawerPress(e)}
        onDrawerHide={(e)=> this.onDrawerHide(e)}/>
    );
  }

  onDrawerPress(drawerItem){
    if (drawerItem.action === "refresh" && drawerItem.flag !== this.state.category) {
      let { posts, ui } = this.props;
      let category = drawerItem.flag;
      if ((!posts[category] || posts[category].length === 0) && ui[category].refreshPending === false) {
        this.fetchPostData(category);
      }else{
        this.setState({ category: category });
      }
    }else{
      this.props.router[drawerItem.action]  && this.props.router[drawerItem.action]();
    }
  }

  onDrawerHide(){
    this.drawer &&
    this.drawer.closeDrawer();
  }

  onMenuPress(){
    this.drawer &&
    this.drawer.openDrawer();
  }

  onSearchPress(){
    this.props.router.toSearch();
  }

  onListEndReached(){
    const { postAction, posts, ui } = this.props;
    if (posts && posts[this.state.category].length && ui[this.state.category].pageEnabled) {
      postAction.getPostByCategoryWithPage(this.state.category, {
        pageIndex: ui[this.state.category].pageIndex + 1
      });
    }
  }

  renderListRefreshControl(){
    let { ui, postAction } = this.props;
    return (
      <RefreshControl { ...refreshControlConfig }
        refreshing={ ui[this.state.category].refreshPending }
        onRefresh={ ()=>{ postAction.getPostByCategory(this.state.category) } } />
    );
  }

  renderContent(){
    const { router } = this.props;
    const { category } = this.state;
    
    if(category === postCategory.news){
      return <NewsList router={ router }/>;
    }
    if(category === postCategory.blink){
      return <BlinkList router={ router }/>;
    }
    if(category === postCategory.question){
      return <QuestionList router={ router }/>;
    }
    return <PostList router={ router } category={ category }/>;
  }

  render() {
    return (
      <DrawerLayoutAndroid
          ref={ (view)=>{ this.drawer = view } }
          drawerWidth={ StyleConfig.screen_width - 80 }
          keyboardDismissMode="on-drag"
          drawerPosition={ DrawerLayoutAndroid.positions.Left }
          renderNavigationView={ ()=> this.renderNavigationView() }>
        
          <HomeRender 
            category={ this.state.category } 
            refreshControl={ this.renderListRefreshControl() }
            onMenuPress={ ()=>this.onMenuPress() }
            onSearchPress={ ()=>this.onSearchPress() }
            onListEndReached = { ()=>this.onListEndReached() }>

            { this.renderContent() }

          </HomeRender>
      </DrawerLayoutAndroid>
    );
  }
}

export default connect((state, props) => ({
  posts : state.post,
  ui: state.postListUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(HomePage);