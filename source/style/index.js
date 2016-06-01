
import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const StyleConfig = {
	mainColor:'#09a097',
	borderColor:'#f8f8f8',
	padding: 15,
	headerFontSize: 18,
	headerColor: 'rgba(0,0,0,0.7)',
	titleFontSize: 16,
	titleColor: 'rgba(0,0,0,0.7)',
	hintFontSize: 14,
	hintColor: 'rgba(0,0,0,0.5)',
	touchablePressColor:'rgba(0,0,0,0.02)'
};

//scroll tabs
export const ScrollTabStyles = StyleSheet.create({
	container: {
		flex: 1,
	    flexDirection:'row',
	    backgroundColor: 'transparent'
	},
	tabs: {
		flexDirection: 'row',
	    justifyContent: 'space-around',
	    borderBottomColor: StyleConfig.borderColor,
	    borderBottomWidth: 1
	},
	tab: {
		flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    paddingBottom: 10,
	    paddingTop: 10
	}
});

//post list
export const PostListRowStyles = StyleSheet.create({
	authorInfo: {
		flex:1,
		alignItems:'center',
		flexDirection: 'row',
		marginBottom: 10
	},
	authorAvatar: {
		height: 20,
		width: 20,
		borderRadius: 10,
		marginRight: 5
	}
});


//post detail
export const PostDetailStyles = StyleSheet.create({
	headerAuthor: {
		paddingTop: 5,
		paddingBottom: 5,
		justifyContent:'flex-start',
		marginRight: StyleConfig.padding,
		alignItems:'center'
	},
	headerAvatar:{
		flex:1,
		width: 30,
		height: 30,
		borderRadius: 15
	},
	headerContent:{
		flex: 1
	}
});

export const PostBarStyles = StyleSheet.create({
	container: {
	    flexDirection:'row',
	    paddingRight: StyleConfig.padding + 3,
	    paddingTop: StyleConfig.padding,
	    paddingLeft: StyleConfig.padding + 3,
	    paddingBottom: StyleConfig.padding,
	    borderTopWidth: 1,
	    borderTopColor: StyleConfig.borderColor,
	    alignItems:'center',
	    backgroundColor: 'rgba(255, 255,255,1)'
	},
	icon:{
		color: StyleConfig.mainColor
	},
	text:{
		color: StyleConfig.mainColor,
		marginLeft: 5
	},
	leftButton:{
		flexDirection:'row',
		alignItems: 'center'
	},
	rightButton:{
		flex:1,
		flexDirection: 'row',
		justifyContent:'flex-end',
		alignItems:'center'
	}
});

//about
export const AboutStyles = StyleSheet.create({
	container:{
	    paddingTop: 50,
	    paddingBottom: 50,
	    backgroundColor:'#f8f8f8',
	    alignItems:'center'
	},
	logo:{
	    width: 80, 
	    height: 80, 
	    marginBottom: 15
	},
	title:{
		fontSize: StyleConfig.headerFontSize,
		marginBottom: 5,
	},
	descr:{
		fontSize: StyleConfig.hintFontSize
	}
});

//drawer panel
export const DrawerPanelStyles = StyleSheet.create({
	container:{
		flex:1
	},	
	header:{
		height: 150,
		backgroundColor:'#0cb2a6',
	},
	headerBg: {
		flex:1,
		height: 150,
		flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'stretch',
	    flexDirection:'column',
		justifyContent:'center',
		paddingLeft: 20
	},
	headerTitle:{
		color: 'rgba(255,255,255, 1)',
		fontSize: StyleConfig.titleFontSize + 2
	},
	headerHint: {
		color: 'rgba(255,255,255, 0.8)',
		fontSize: StyleConfig.hintFontSize
	},
	list:{
		marginTop: StyleConfig.padding
	},
	listItem:{
		borderBottomWidth: 0,
		paddingLeft: StyleConfig.padding + 3,
		paddingRight: StyleConfig.padding + 3
	}
});

//common
export const CommonStyles = StyleSheet.create({
	navbar:{
	    alignItems:'center',
	    borderBottomColor: StyleConfig.borderColor,
	    borderBottomWidth:1
	},
	navbarText: {
	    fontSize: StyleConfig.headerFontSize,
	    marginBottom: 2, 
	    color: StyleConfig.headerColor,
	    fontWeight:'normal'
	},
	navbarMenu: {
	    marginLeft: 10,
	    marginRight: 10,
	    color:StyleConfig.headerColor
	},

	container: {
		flex:1,
		backgroundColor: 'rgba(255,255,255,1)',
		flexDirection: 'column'
	},

	messageContainer:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
		paddingTop: StyleConfig.padding,
		paddingLeft: StyleConfig.padding,
		paddingRight: StyleConfig.padding,
		paddingBottom: StyleConfig.padding
	},

	rowContainer:{
		paddingTop: StyleConfig.padding,
		paddingBottom: StyleConfig.padding,
		paddingLeft: StyleConfig.padding,
		paddingRight: StyleConfig.padding,
		flexDirection: 'column',
		borderBottomColor: "rgba(0, 0, 0, 0.02)",
		borderBottomWidth: 1
	},

	detailContainer:{
		flex:1,
		paddingTop: StyleConfig.padding,
		paddingBottom: StyleConfig.padding,
		paddingLeft: StyleConfig.padding + 3,
		paddingRight: StyleConfig.padding + 3
	},

	detailHeader:{
		flexDirection:'row',
        alignItems:'flex-start',
        width: width,
        flex: 1,
        paddingTop: StyleConfig.padding - 5,
        paddingBottom: StyleConfig.padding - 5,
        paddingLeft: StyleConfig.padding,
        paddingRight: StyleConfig.padding,
        borderBottomColor: StyleConfig.borderColor,
	    borderBottomWidth:1,
        backgroundColor:'rgba(255,255,255,1)'
	},

	titleContainer:{
		flex:1
	},

	title:{
		flexWrap:'wrap',
		marginBottom: 6,
		color: StyleConfig.titleColor,
		fontSize: StyleConfig.titleFontSize
	},

	meta:{
		flexDirection:'row'
	},

	metaRight: {
		flex: 1,
		textAlign:'right'
	},

	hint:{
		flexWrap:'wrap',
		color: StyleConfig.hintColor,
		fontSize: StyleConfig.hintFontSize
	},

	listItem: {
	    paddingTop: 15,
	    paddingBottom: 15,
	    paddingLeft: 15,
	    paddingRight: 15,
	    borderBottomWidth: 1,
	    flexDirection:'row',
	    alignItems:'center',
	    borderBottomColor: StyleConfig.borderColor,
	},

	listItemText:{
		fontSize: 15,
		color: 'rgba(0,0,0, 0.7)'
	},

	listItemIcon:{
	    width: 18,
	    height: 18,
	    borderRadius: 9,
	    marginRight: 10
	},

	listItemTail:{
		fontSize: 15,
		color: 'rgba(0,0,0, 0.7)',
	    flex: 1,
	    textAlign:'right'
	},

	refreshSpinner:{
		marginTop: 50,
		marginBottom: 50
	},

	pageSpinner: {
		paddingTop: 20,
		paddingBottom: 20
	}
});
