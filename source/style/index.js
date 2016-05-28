
import React, { Component } from 'react';
import {
	StyleSheet,
	Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

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
	rowContainer: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 15,
		paddingRight: 15,
		flexDirection: 'column',
		borderBottomColor: "rgba(0, 0, 0, 0.02)",
		borderBottomWidth: 1
	},
	authorInfo: {
		flex:1,
		alignItems:'center',
		flexDirection: 'row'
	},
	authorAvatar: {
		height: 20,
		width: 20,
		borderRadius: 10
	},
	authorName: {
		marginLeft: 5
	},
	postInfo: {
		marginTop: 10
	},
	postTitle: {
		color:'#555',
		fontSize: 16
	},
	metaInfo:{
		marginTop: 10,
		flexDirection:'row'
	},
	metaDate:{
		
	},
	metaCount: {
		flex: 1,
		textAlign:'right'
	}
});

//post detail
export const PostDetailStyles = StyleSheet.create({
	container: {
		flex:1,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 18,
		paddingRight: 18
	},
	header:{
        flexDirection:'row',
        alignItems:'center',
        width: width,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomColor:'#f8f8f8',
	    borderBottomWidth:1,
        backgroundColor:'rgba(255,255,255,1)'
	},
	headerAuthor: {
		flexDirection:'column',
		justifyContent:'flex-start',
		alignItems:'flex-start'
	},
	headerAvatar:{
		width: 30,
		height: 30,
		borderRadius: 15
	},
	headerContent: {
		flex: 1,
		marginLeft: 15,
	},
	headerTitle:{
		fontSize: 16,
		color:'rgba(0,0,0,0.7)',
		fontWeight:'normal',
		flexWrap:'wrap'
	},
	headerMeta:{
		flexDirection:'row'
	},
	headerMetaName: {

	},
	headerMetaDate:{
		flex:1,
		textAlign:'right'
	},
	spinner:{
		marginTop: 50,
		marginBottom: 50
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
		fontSize: 18,
		color:'rgba(255,255,255, 1)',
		marginBottom:5
	},
	headerDescr:{
		color:'rgba(255,255,255, 0.7)',
		fontSize: 14
	},
	list:{
		flex:1,
		flexDirection:'column',
		paddingTop:10
	},
	listItem:{
		paddingTop:15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight:20,
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
	    fontSize: 18,
	    marginBottom:2, //hack
	    color:'rgba(0,0,0,0.7)',
	    fontWeight:'normal'
	},
	navbarMenu: {
	    marginLeft: 10,
	    marginRight: 10,
	    color:'rgba(0,0,0,0.7)'
	},

	container: {
		flex:1,
		backgroundColor: 'white',
		flexDirection: 'column'
	},
	spinnerLoading: {
		"paddingTop": 20,
		"paddingBottom": 20
	}
});
