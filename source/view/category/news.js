import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as PostList } from '../../component/postList';
const { height, width } = Dimensions.get('window');
import { postCategory } from '../../config';

class NewsCategory extends Component {

  constructor () {
    super(); 
  }

  render() {
    let { router } = this.props;
    return (
        <View style={ styles.container }>
          <PostList router={ this.props.router } category={ postCategory.news }/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height,
      width,
      backgroundColor: '#fff'
    }
});

export default connect(state => ({
  
}), dispatch => ({ 
  
}))(NewsCategory);
