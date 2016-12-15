import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

class Panel extends Component {

	constructor (props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	renderTitle(){
		return (
			<View>
				<Text style={[ CommonStyles.text_danger, CommonStyles.font_sm, CommonStyles.line_height_md, this.props.titleStyle ]}>
					{ this.props.title }
				</Text>
			</View>
		)
	}

	renderDescr(){
		if(this.props.descr){
			return (
				<View style={[ CommonStyles.flex_1, CommonStyles.m_t_2 ]}>
					<Text style={[ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm, this.props.descrStyle ]}>
						{ this.props.descr }
					</Text>
				</View>
			)
		}
	}

	renderTail(){
		if(this.props.tailControl){
			return (
				<View style={[ CommonStyles.flexItemsMiddle, CommonStyles.flexItemsRight ]}>
					{ this.props.tailControl }
				</View>
			)
		}
	}

	renderContent(){
		return (
			<View style = {[ComponentStyles.list, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween]}>
				<View style={[ CommonStyles.flexColumn, CommonStyles.flex_4 ]}>
					{ this.renderTitle() }
					{ this.renderDescr() }
				</View>
				{ this.renderTail() }
			</View>
		)
	}

	render() {
		if(this.props.onPress){
			return (
				<TouchableHighlight 
					onPress={()=> this.props.onPress() }
					underlayColor ={ StyleConfig.touchable_press_color }>
					{ this.renderContent() }
				</TouchableHighlight>
			)
		}
		return this.renderContent();
	}
}

export default Panel;
