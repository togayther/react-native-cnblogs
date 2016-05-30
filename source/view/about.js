import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { AboutStyles, CommonStyles, StyleConfig } from '../style';
import NavigationBar from '../component/navbar/';
import Config from '../config';

class AboutPage extends Component {

  constructor (props) {
    super(props); 
  }

  componentDidMount(){
  }

  renderHeaderLeftConfig(){
    let { router } = this.props;
      return (
        <TouchableOpacity onPress={ ()=>{ router.pop() } }>
          <Icon
            name='chevron-left'
            size={22}
            style={ CommonStyles.navbarMenu }
          />
        </TouchableOpacity>
      )
  }

  renderHeaderTitleConfig(){
      return (
        <Text style={ CommonStyles.navbarText }>
          关于
        </Text>
      )
  }

  render() {
    return (
      <View style={ CommonStyles.container}>
          <NavigationBar
                style = { CommonStyles.navbar}
                leftButton= { this.renderHeaderLeftConfig() }
                title={ this.renderHeaderTitleConfig() }>
          </NavigationBar>
          <View style={ AboutStyles.container }>
            <Image style={ AboutStyles.logo } source={{ uri: Config.appInfo.logo }}/>
            <Text style={ AboutStyles.title }>
               { Config.appInfo.name }
            </Text>
            <Text style={ AboutStyles.descr }>
              { Config.appInfo.descr }
            </Text>
            <Text style={ AboutStyles.descr }>
              { Config.appInfo.site }
            </Text>
          </View>  
          <View>
            <TouchableHighlight
              onPress={ ()=> null }
              underlayColor={ StyleConfig.touchablePressColor }>
              <View style={ CommonStyles.listItem }>
                <Icon
                  name='mail-with-circle'
                  size={18}
                  style={ CommonStyles.listItemIcon } />
                <Text style={ CommonStyles.listItemText }>
                  { Config.authorInfo.email }
                </Text>
                <Text style={ CommonStyles.listItemTail}>
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={ ()=> null }
              underlayColor={ StyleConfig.touchablePressColor }>
              <View style={ CommonStyles.listItem }>
                <Icon
                  name='info-with-circle'
                  size={18}
                  style={ CommonStyles.listItemIcon } />
                <Text style={ CommonStyles.listItemText }>
                  当前版本
                </Text>
                <Text style={ CommonStyles.listItemTail}>
                  { Config.appInfo.version }
                </Text>
              </View>
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}

export default connect(state => ({

}), dispatch => ({ 

}), null, {
  withRef: true
})(AboutPage);

