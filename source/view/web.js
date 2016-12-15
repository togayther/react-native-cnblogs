import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  StyleSheet
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import TimerMixin from 'react-timer-mixin';
import Spinner from '../component/spinner';
import Navbar from '../component/navbar';
import { StyleConfig, ComponentStyles, CommonStyles } from '../style';

const loadTimeout = 6000;

class WebPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentWillUnmount() {
	  this.timer && TimerMixin.clearTimeout(this.timer);
	}

  onError(){
    Toast.show("加载外部链接失败");
    this.setWebViewLoaded();
  }

  onLoadStart(){
    this.timer = TimerMixin.setTimeout(() => {
        if(this.state.loaded === false){
          Toast.show("页面响应不太给力");
        }
        this.setWebViewLoaded();
        TimerMixin.clearTimeout(this.timer);
	  }, loadTimeout);
  }

  onLoadEnd(){
    this.setWebViewLoaded();
  }

  setWebViewLoaded(){
    this.setState({
      loaded: true
    });
  }

  renderNavbar(){
    const { title, router } = this.props;
    let titleText;
    if(title.length < 20){
      titleText = title;
    }else{
      titleText = title.substring(0, 25) + "...";
    }

    return (
      <Navbar
        title={ titleText }
        leftIconOnPress={ ()=>router.pop() }/>
    )
  }

  renderLoading(){
    if(this.state.loaded === false){
       return (
        <Spinner style={ [ComponentStyles.pending_container, styles.pending] }/>
      );
    }
  }

  renderWebView(){
    const { url } = this.props;
    return (
      <WebView
        source={{uri:  url }}
        onError = { ()=> this.onError() }
        onLoadEnd = { ()=>this.onLoadEnd() }
        onLoadStart = { ()=>this.onLoadStart() }
      />
    );
  }

  render() {
    return (
      <View style={ [ComponentStyles.container] }>
        { this.renderNavbar() }
        { this.renderWebView() }
        { this.renderLoading() }
      </View>
    );
  }
}

export const styles = StyleSheet.create({ 
    pending: {
      top: StyleConfig.navbar_height,
      height: StyleConfig.screen_height - (StyleConfig.navbar_height * 3),
      backgroundColor:'transparent'
    }
});

export default WebPage;