import React, { Component } from 'react';
import {
  View,
  RefreshControl,
  DrawerLayoutAndroid
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ViewPage from '../component/view';
import DrawerPanel from '../component/drawerPanel';
import HomeButton from '../component/button/home';
import SingleButton from '../component/button/single';
import HomeRender from '../component/header/home';
import PostList from '../component/listview/postList';
import NewsList from '../component/listview/newsList';
import BlinkList from '../component/listview/blinkList';
import QuestionList from '../component/listview/questionList';
import * as UserAction from '../action/user';
import * as PostAction from '../action/post';
import Config, { postCategory } from '../config';
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
    this.fetchData(this.state.category);
  }

  fetchData(category){
    const { postAction, userAction, user } = this.props;
    postAction.getPostByCategory(category).then(()=>{
      this.setState({category: category});
      if(user.DisplayName === Config.appInfo.name){
        userAction.getUserInfo();
      }
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
      const { posts, ui } = this.props;
      const category = drawerItem.flag;
      if ((!posts[category] || posts[category].length === 0) && ui[category].refreshPending === false) {
        this.fetchData(category);
      }else{
        this.setState({ category: category });
      }
    }else{
      const { router } = this.props;
      router[drawerItem.action] && ViewPage[drawerItem.flag] && router[drawerItem.action](ViewPage[drawerItem.flag]());
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
    this.props.router.push(ViewPage.search())
  }

  onListEndReached(){
    const { postAction, posts, ui } = this.props;
    const { category } = this.state;
    if (posts && posts[category] && posts[category].length && ui[category].pageEnabled) {
      postAction.getPostByCategoryWithPage(category, {
        pageIndex: ui[category].pageIndex + 1
      });
    }
  }

  renderListRefreshControl(){
    const { ui, postAction } = this.props;
    const { category } = this.state;
    return (
      <RefreshControl { ...refreshControlConfig }
        refreshing={ ui[category].refreshPending }
        onRefresh={ ()=> this.fetchData(category) } />
    );
  }

  renderHomeButton(){
    const { user, router } = this.props;
    if(user && user.DisplayName != Config.appInfo.name){
      return <HomeButton router = { router}/>
    }
  }

  renderContent(){
    const { router } = this.props;
    const { category } = this.state;
    
    if(category === postCategory.news){
      return <NewsList router={ router } />;
    }
    if(category === postCategory.blink){
      return <BlinkList router={ router } />;
    }
    if(category === postCategory.question){
      return <QuestionList router={ router } />;
    }
    return <PostList router={ router } category={ category } />;
  }
  
  render() {
    return (
      <DrawerLayoutAndroid
          ref={ (view)=>{ this.drawer = view } }
          drawerWidth={ StyleConfig.screen_width - 100 }
          keyboardDismissMode="on-drag"
          drawerBackgroundColor = { 'rgba(255, 255, 255, 0.95)' }
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

          { this.renderHomeButton() }
          
          <SingleButton icon="ios-menu" onPress = { ()=>this.onMenuPress() }/>
      </DrawerLayoutAndroid>
    );
  }
}

export default connect((state, props) => ({
  posts : state.post,
  user: state.user,
  ui: state.postListUI
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch),
  userAction : bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(HomePage);