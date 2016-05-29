import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToolbarAndroid,
  Dimensions,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer'
import Icon from 'react-native-vector-icons/Entypo';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar';

import CustomTabbar from '../component/tabbar/customTabbar';
import DrawerPanel from '../component/drawerPanel';

import { default as HomeCategory } from './category/home';
import { default as RankCategory } from './category/rank';
import { default as NewsCategory } from './category/news';

import * as PostAction from '../action/post';
import { postCategory } from '../config';
import { CommonStyles } from '../style';

const { height, width } = Dimensions.get('window');

class MainPage extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    const { postAction } = this.props;
    postAction.getPostByCategory(postCategory.home);
  }

  onTabChanged(page) {
    const { postAction, posts, ui } = this.props;
    const category = Object.keys(postCategory)[page.i];
    if (posts[category] && ui[category] && !ui[category].fetchStatus) {
      postAction.getPostByCategory(category);
    }
  }

  renderNavigationView(){
    let { router } = this.props;
    return (
      <DrawerPanel router={ router } hideDrawerFunc={ this.hideDrawer.bind(this) }/>
    );
  }

  onMenuPress(){
    this.drawer &&
    this.drawer.openDrawer();
  }

  onSearchPress(){
    this.props.router.toSearch();
  }

  hideDrawer(){
    this.drawer &&
    this.drawer.closeDrawer();
  }

  getHeaderLeftConfig(){
    return (
      <TouchableOpacity onPress={ this.onMenuPress.bind(this) }>
        <Icon
          name='menu'
          size={20}
          style={ CommonStyles.navbarMenu }
        />
      </TouchableOpacity>
    )
  }

  getHeaderRightConfig(){
      return (
        <TouchableOpacity onPress={ this.onSearchPress.bind(this) }>
          <Icon
            name='magnifying-glass'
            size={20}
            style={ CommonStyles.navbarMenu }
          />
        </TouchableOpacity>
      )
  }

  getHeaderTitleConfig(){
    return (
      <Text style={ CommonStyles.navbarText }>
        博客园
      </Text>
    )
  }

  render() {

    let { router } = this.props;

    return (
      <DrawerLayoutAndroid
          ref={ (view)=>{ this.drawer = view } }
          drawerWidth={ width - 100 }
          keyboardDismissMode="on-drag"
          drawerPosition={ DrawerLayoutAndroid.positions.Left }
          renderNavigationView={ this.renderNavigationView.bind(this) }>

        <View style={ CommonStyles.container }>
          <NavigationBar
            style = { CommonStyles.navbar}
            leftButton= { this.getHeaderLeftConfig() }
            rightButton = { this.getHeaderRightConfig() }
            title={ this.getHeaderTitleConfig() }>
          </NavigationBar>

          <ScrollableTabView 
            renderTabBar={() => <CustomTabbar />}
            onChangeTab={ this.onTabChanged.bind(this) }>
              <HomeCategory tabLabel="首页" router={ router }/>
              <RankCategory tabLabel="排行" router={ router }/>
              <NewsCategory tabLabel="新闻" router={ router }/>
          </ScrollableTabView>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

export default connect(state => ({
  posts : state.post,
  ui: state.listui
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(MainPage);
