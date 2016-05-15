import React, {
  Component,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as PostList } from '../../component/postList';
const { height, width } = Dimensions.get('window');
import { postCategory } from '../../config';

class HomeCategory extends Component {

  constructor () {
    super(); 
  }

  render() {
    return (
        <View style={ styles.container }>
          <PostList router={ this.props.router } category={ postCategory.home }/>
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
  
}))(HomeCategory);
