import React, {
  Component,
  StyleSheet,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PostAction from '../action/post';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { default as HomeCategory } from './category/home';
import { default as RankCategory } from './category/rank';
import { default as NewsCategory } from './category/news';
import { postCategory } from '../config';

const customScrollTabView = {
  tabBarUnderlineColor:"#fff"
};

const { height, width } = Dimensions.get('window');

class MainPage extends Component {

  constructor () {
    super(); 
  }

  componentDidMount(){
    const { postAction } = this.props;
    postAction.getPostByCategory(postCategory.home);
  }

  _onPageChanged(page) {
    const { postAction, posts, ui } = this.props;
    const category = Object.keys(postCategory)[page.i];
    if (posts[category] && ui[category] && !ui[category].flag) {
      postAction.getPostByCategory(category);
    }
  }

  render() {

    let { router } = this.props;

    return (
        <ScrollableTabView { ...customScrollTabView } 
              tabBarTextStyle={ styles.tabBarText} 
              onChangeTab={ this._onPageChanged.bind(this) }>
            <HomeCategory tabLabel="首页2" router={ router }/>
            <RankCategory tabLabel="排行" router={ router }/>
            <NewsCategory tabLabel="新闻" router={ router }/>
        </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabBarText: {
    color:"#fff"
  }
});

export default connect(state => ({
  posts : state.post,
  ui: state.listui
}), dispatch => ({ 
  postAction : bindActionCreators(PostAction, dispatch)
}), null, {
  withRef: true
})(MainPage);
