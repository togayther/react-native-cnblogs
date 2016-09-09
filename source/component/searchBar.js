import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ComponentStyles, CommonStyles, StyleConfig } from '../style';

import { getImageSource } from '../common';

class SearchBar extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	key:''
	    };

	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onSearchPress(){
		let { onSearchHandle } = this.props;
		let txtSearch = this.refs.txtSearch;
		if (this.state.key === '') {
			txtSearch.focus();
		}else{
			txtSearch.blur();
			onSearchHandle(this.state.key);
		}
	}

	renderBackground(){
		if (!this.backgroundImage) {
			this.backgroundImage = getImageSource();
		}
		return (
			<Image 
         		style={ ComponentStyles.backgroundImage } 
         		source={ {uri: this.backgroundImage} } />
		)
	}
	
	renderLeftContent(){
		let { placeholder = '请输入博主名称' } = this.props;
	    return (
	        <View style={ ComponentStyles.leftContent }>
	        	<TouchableOpacity 
		        	style = { ComponentStyles.iconContainer }
		        	onPress={ ()=>{ this.props.router.pop() } }>
			      <Icon
			        name={ "ios-arrow-round-back" }
			        color={ StyleConfig.foregroundColor } 
			        size= { 22 }
			        style = { ComponentStyles.icon } />
			    </TouchableOpacity>

			    <TextInput 
			    	ref="txtSearch"
			    	blurOnSubmit ={true}
			    	onSubmitEditing = { ()=> this.onSearchPress() }
			    	style={ CommonStyles.searchInput }
	    			placeholder ={ placeholder }
	    			placeholderTextColor  = { StyleConfig.foregroundColor }
	    			maxLength = { 20 }
	    			underlineColorAndroid = { 'transparent' }
				    onChangeText={(key) => this.setState({key})}
				    value={this.state.key} />
	        </View>
	    );
	}

	renderRightContent(){
		return (
			<View style={ ComponentStyles.rightContent }>
				<TouchableOpacity 
					style = { ComponentStyles.iconContainer }
					onPress={()=> this.onSearchPress() }>
	    			<Icon 
	    				name={ "ios-search-outline" }
	    				color={ StyleConfig.foregroundColor }  
	    				size= { 22 }
	    				style={ ComponentStyles.icon }/>
				</TouchableOpacity>
			</View>
		);
	}


	render() {
	    return (
	    	<View style={ ComponentStyles.container }>
				{ this.renderBackground() }
				{ this.renderLeftContent() }
				{ this.renderRightContent() }
          	</View>
	    )
	}
}

export default SearchBar;


