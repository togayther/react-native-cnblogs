
import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

export const StyleConfig = {
	mainColor:'#09a097',
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
	    borderBottomColor:'#f8f8f8',
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
		flex:1,
		flexDirection:'column',
		paddingTop: 10
	},
	listItem:{
		paddingTop: StyleConfig.padding,
		paddingBottom: StyleConfig.padding,
		paddingLeft: StyleConfig.padding + 5,
		paddingRight: StyleConfig.padding + 5,
		flex:1,
		flexDirection:'row',
		alignItems:'center',
	},
	listItemIcon:{
		marginRight: 10
	},
	listItemText:{
		fontSize: 15
	}
});

//common
export const CommonStyles = StyleSheet.create({
	navbar:{
	    alignItems:'center',
	    borderBottomColor:'#f8f8f8',
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
        borderBottomColor:'#f8f8f8',
	    borderBottomWidth:1,
        backgroundColor:'rgba(255,255,255,1)'
	},

	titleContainer:{
		flex:1
	},

	title:{
		flex:1,
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
		flex:1,
		flexWrap:'wrap',
		color: StyleConfig.hintColor,
		fontSize: StyleConfig.hintFontSize
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
