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
		const { onSearchHandle } = this.props;
		const txtSearch = this.refs.txtSearch;
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
         		style={[ ComponentStyles.pos_absolute, styles.background]} 
         		source={  this.backgroundImage } />
		)
	}

	renderBackdrop(){
		return (
			<View style={ [ ComponentStyles.pos_absolute, styles.backdrop] }>
			</View>
		)
	}

	renderLeftIcon(){
		return (
			<TouchableOpacity 
				style = { [ CommonStyles.p_r_2 ] } 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={ ()=>{ this.props.router.pop() } }>
				<Icon
					name={ "ios-arrow-round-back" }
					color={ StyleConfig.color_white } 
					size= { StyleConfig.icon_size } />
			</TouchableOpacity>
		)
	}
	
	renderSearchInput(){
		const { placeholder = '请输入博主名称' } = this.props;
	    return (
			<TextInput 
				ref="txtSearch"
				blurOnSubmit ={true}
				onSubmitEditing = { ()=> this.onSearchPress() }
				style={ styles.searchInput }
				placeholder ={ placeholder }
				placeholderTextColor  = { StyleConfig.color_light }
				maxLength = { 20 }
				underlineColorAndroid = { 'transparent' }
				onChangeText={(key) => this.setState({key})}
				value={this.state.key} />
	    );
	}

	renderRightIcon(){
		return (
			<TouchableOpacity 
				style = { [ CommonStyles.p_l_2 ] } 
				activeOpacity={ StyleConfig.touchable_press_opacity }
				onPress={()=> this.onSearchPress() }>
				<Icon 
					name={ "ios-search-outline" }
					color={ StyleConfig.color_white }  
					size= { StyleConfig.icon_size }/>
			</TouchableOpacity>
		);
	}

	renderContent(){
		return (
			<View style={[CommonStyles.flexRow, CommonStyles.flexItemsMiddle, CommonStyles.flexItemsBetween, styles.container]}>
				{ this.renderLeftIcon() }
				{ this.renderSearchInput() }
				{ this.renderRightIcon() }
			</View>
		)
	}


	render() {
	    return (
	    	<View>
				{ this.renderBackground() }
				{ this.renderBackdrop() }
				{ this.renderContent() }
          	</View>
	    )
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
		paddingHorizontal: StyleConfig.space_3,
		paddingTop: 25
	},
	background: {
		width: StyleConfig.screen_width,
	    height: StyleConfig.navbar_height,
	    top:0
	},
	backdrop:{
		top:0,
		height: StyleConfig.navbar_height,
		width: StyleConfig.screen_width,
		backgroundColor: StyleConfig.color_black
	},
	searchInput: {
		flex: 1,
		fontSize: StyleConfig.font_sm,
		color: StyleConfig.color_white
	}

})

export default SearchBar;


