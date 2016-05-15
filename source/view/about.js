import React, {
  Component,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { height, width } = Dimensions.get('window');

class AboutPage extends Component {

  constructor () {
    super(); 
  }

  componentDidMount(){
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          about
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#292829'
  }
});

export default connect(state => ({

}), dispatch => ({ 

}))(AboutPage);

