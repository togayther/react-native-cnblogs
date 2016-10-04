import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as Animatable from 'react-native-animatable';
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

class removeModal extends Component {

	constructor (props) {
	    super(props);
        this.state = {
            modalVisiable : false,
            modalBackdropVisiable: false
        };
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

    onModelBackdropShow(){
        this.setState({
            modalVisiable: true
        });
    }

    renderBackdrop(){
        const { modalVisiable } = this.props;
        if(modalVisiable === true){
            return (
                <View
                    style={ [ComponentStyles.modal_backdrop, styles.modal_backdrop] } >
                </View>
            ) 
        }
    }

    renderModalContent(){
        
        const { onRemovePress = ()=>null } = this.props;

        return (
            <View style={[ styles.modal_content ]}>
                <TouchableHighlight
                    onPress={(e)=> onRemovePress() }
                    underlayColor={ StyleConfig.touchable_press_color }
                    style = { [ ComponentStyles.btn, ComponentStyles.btn_primary, ComponentStyles.modal_button, CommonStyles.m_b_2 ] }>
                    <Text style={ ComponentStyles.btn_text }>
                        删除项目
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={(e)=> this.props.onCancelPress() }
                    underlayColor={ StyleConfig.touchable_press_color }
                    style = { [ ComponentStyles.btn, ComponentStyles.btn_dark, ComponentStyles.modal_button ] }>
                    <Text style={ ComponentStyles.btn_text }>
                        取消
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderModal(){
        const { modalVisiable } = this.props;
        return (
            <Modal 
                animationType={ 'fade' }
                transparent={ true }
                onRequestClose = {()=> null }
                visible={ modalVisiable }>
                <View style={ ComponentStyles.modal_container }>
                    { this.renderModalContent() }
                </View>  
            </Modal>
        )
    }

	render() {
        return (
            <View>
                { this.renderModal() }
                { this.renderBackdrop() }
            </View>
        )
	}
}

const styles = StyleSheet.create({
    modal_backdrop: {
        width: StyleConfig.screen_width,
        height: StyleConfig.screen_height
    },
    modal_content:{
       backgroundColor: 'rgba(255, 255, 255, 0.9)',
       padding: 15
    }
})

export default removeModal;
