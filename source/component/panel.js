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
			<View style={[ CommonStyles.m_b_2 ]}>
				<Text style={[ CommonStyles.text_black, CommonStyles.font_md, CommonStyles.line_height_md, this.props.titleStyle ]}>
					{ this.props.title }
				</Text>
			</View>
		)
	}

	renderDescr(){
		return (
			<View style={[ CommonStyles.flex_1 ]}>
				<Text style={[ CommonStyles.text_gray, CommonStyles.font_xs, CommonStyles.line_height_sm, this.props.descrStyle ]}>
					{ this.props.descr }
				</Text>
			</View>
		)
	}

	render() {

		let { onPress = (()=>null) } = this.props;

		return (
			<TouchableHighlight 
				onPress={()=> onPress() }
				underlayColor ={ StyleConfig.touchable_press_color }>
		        <View style = {[ComponentStyles.list, CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween]}>
					<View style={[ CommonStyles.flexColumn, CommonStyles.flex_4 ]}>
						{ this.renderTitle() }
						{ this.renderDescr() }
					</View>
					{
						this.props.tailControl?
						<View style={[ CommonStyles.flexItemsMiddle, CommonStyles.flex_1 ]}>
							{ this.props.tailControl }
						</View>
						: null
					}
		        </View>
		    </TouchableHighlight>
		);
	}
}

export default Panel;
