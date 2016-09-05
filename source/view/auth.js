import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigAction from '../action/config';
import { storageKey } from '../config';
import { PanelStyles, StyleConfig,  CommonStyles } from '../style';

const { height, width } = Dimensions.get('window');

class AuthPage extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount(){
    const { configAction, router } = this.props;
    configAction.getConfig({
      key: storageKey.USER_TOKEN,
      resolved: (data)=>{
        if(data && data.access_token){
          router.toHome();
        }else{
          router.toLogin();
        }
      },
      rejected: (data)=>{
        console.info("failed");
        console.info(data);
      }
    });
  }

  render() {
    return (
      <View style={ CommonStyles.container }>
          <Image
              style = { styles.startup }
              source={ {uri: "http://123.56.135.166/cnblog/public/img/common/startup.png"} }
              resizeMode= {'cover'}>
          </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  startup : {
    width: width,
    height: height
  }
});

export default connect((state, props) => ({
  config: state.config
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch)
}), null, {
  withRef: true
})(AuthPage);