import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimerMixin from 'react-timer-mixin';
import * as Animatable from 'react-native-animatable';
import * as ConfigAction from '../action/config';
import * as UserAction from '../action/user';
import Config, { storageKey } from '../config';
import CodeLogo from '../component/codeLogo';
import { PanelStyles, StyleConfig,  CommonStyles } from '../style';
const { height, width } = Dimensions.get('window');

class AuthPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      modalMaskVisiable: false,
      modalVisiable : false
    };
  }

  componentDidMount(){
    //this.checkUserToken();
    this.showModal();
  }

  checkUserToken(){
    this.props.configAction.getConfig({
      key: storageKey.USER_TOKEN,
      resolved: (data)=>{
        if(data && data.access_token){
          this.refreshUserToken(data.refresh_token);
        }else{
          this.props.router.toLogin();
        }
      },
      rejected: (data)=>{
        console.warn("调用本地存储失败");
      }
    });
  }
  
  refreshUserToken(refreshToken){
    this.props.UserAction.refreshToken({
      token: refreshToken,
      resolved: (data)=>{
        console.info("refreshToken resolve");
        console.info(data);
        this.updateUserToken(data);
      }
    })
  }

  updateUserToken(data){
    const { configAction, router } = this.props;
    configAction.updateConfig({
        key: storageKey.USER_TOKEN, 
        value: data
    }).then(()=>{
        router.toHome();
    });
  }

  hideModal(){
    this.setState({
      modalVisiable: false
    });

    this.timer = TimerMixin.setTimeout(() => { 
			 this.setState({
        modalMaskVisiable: false
      });
	  }, 200);
  }

  showModal(){
    this.setState({
      modalMaskVisiable: true
    });

    this.timer = TimerMixin.setTimeout(() => { 
			 this.setState({
        modalVisiable: true
      });
	  }, 500);
  }

  renderModal(){
    return (
      <Modal
          animationType={ 'slide' }
          transparent={ true }
          onRequestClose  = {()=>null}
          visible={ this.state.modalVisiable }>
          <View style={ styles.modalContainer }>
            <View style={ styles.modalHeader }>
              <Image
                style={ styles.modalHeaderImg } 
                source={ require("../image/modal-header.jpg") } />
            </View>
            <View style={ styles.modalContent}>
              <Text style={{ fontSize:22, color:'#222', textAlign:'center', marginBottom:5 }}>
                博客园
              </Text>
              <Text style={{ fontSize:16, color:'#222', textAlign:'center', marginBottom: 20 }}>
                程序员的网上家园
              </Text>
              <Text style={{ fontSize:14, color: '#444', textAlign:'left', marginBottom: 10, lineHeight: 20 }}>
                提示：进入全国知名的同性交友软件，需要先授权登录。如果你还没有博客园账户，请前往其官方网站注册。
              </Text>
              <Text style={{ fontSize:14, color: '#444', textAlign:'left', lineHeight: 20}}>
                声明：本软件为开源软件，将不会以任何形式保存您的博客园账户信息，请放心使用。
              </Text>
            </View>
            <View style={ styles.modalFooter }>
              <TouchableHighlight
                style = { styles.buttonContainer }
                underlayColor  ={'#3bb09e'}
                onPress={()=>this.hideModal() }>
                <Text style={ styles.button }>
                    登录
                </Text>
              </TouchableHighlight>
            </View>
          </View>  
      </Modal>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
          <Animatable.View animation="fadeIn">
             <CodeLogo style={ styles.logo}/>
          </Animatable.View>
          <Animatable.Text animation="fadeIn" style={ styles.title }>
            { Config.appInfo.name }
          </Animatable.Text>

          {
            this.state.modalMaskVisiable?
            <Animatable.View animation="fadeIn" duration={ 500 }  style={ styles.modalMask }>
            </Animatable.View>
            : null
          }
          
          { this.renderModal() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:"center",
    height: height,
    width: width,
    backgroundColor:'#f8f8f8'
  },
  modalMask:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalContainer:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:"center",
    width: width - 60,
    marginVertical: 100,
    marginHorizontal: 30,
    borderRadius: 5,
    overflow:'hidden',
    backgroundColor:'#fff'
  },
  modalHeader:{
  },

  modalHeaderImg: {
    width: width - 60,
    height:100,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },

  modalContent:{
    padding: 20,
  },
  modalFooter:{
    padding: 20,
    borderTopWidth: .5,
    borderTopColor:'#f2f2f2'
  },
  logo:{
    borderWidth: 1,
		borderColor: StyleConfig.secondaryColor
  },
  title : {
    fontSize: 18,
    color: StyleConfig.secondaryColor
  },
  descr:{
    fontSize: 14
  },

  buttonContainer:{
       backgroundColor:'#259d8b',
       paddingVertical: 15,
       borderRadius: 2,
       width: width - 100,
   },
   button:{
       color:'#fff',
       fontSize: 14,
       textAlign:"center"
   }
});

export default connect((state, props) => ({
  config: state.config
}), dispatch => ({ 
  configAction : bindActionCreators(ConfigAction, dispatch),
  userAction : bindActionCreators(UserAction, dispatch)
}), null, {
  withRef: true
})(AuthPage);