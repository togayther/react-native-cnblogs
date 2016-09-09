import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ComponentStyles, StyleConfig } from '../style';

class Panel extends Component {

	constructor (props) {
	    super(props);

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	renderTitle(){
		return (
			<Text style={ [ComponentStyles.title, this.props.titleStyle ] }>
              { this.props.title }
            </Text>
		)
	}

	renderDescr(){
		return (
			<Text style={ [ComponentStyles.descr, this.props.descrStyle ] }>
              { this.props.descr }
            </Text>
		)
	}

	render() {

		let { onPress = (()=>null) } = this.props;

		return (
			<TouchableHighlight 
		        onPress={()=> onPress() }
		        underlayColor ={ StyleConfig.touchablePressColor }>
		        <View style={ ComponentStyles.container }>
		          <View style={ ComponentStyles.content }>
		            { this.renderTitle() }
		            { this.renderDescr() }
		          </View>

		          <View style={ ComponentStyles.tail }>
		            { this.props.tailControl }
		          </View>
		        </View>
		    </TouchableHighlight>
		);
	}
}

export default Panel;
