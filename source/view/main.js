import React, { Component } from 'react';
import {
  View,
  ToolbarAndroid,
  Dimensions,
  DrawerLayoutAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer'
import ScrollableTabView from 'react-native-scrollable-tab-view';

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
    return (
      <DrawerPanel />
    );
  }

  render() {

    let { router } = this.props;

    return (
       <DrawerLayoutAndroid
        ref={'drawer'}
        drawerWidth={ width - 100 }
        keyboardDismissMode="on-drag"
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderNavigationView}>

        <View style={ CommonStyles.container }>
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
