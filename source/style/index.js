
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
	    borderWidth: 0
	},
	tab: {
		flex: 1,
	    alignItems: 'center',
	    justifyContent: 'center',
	    paddingBottom: 15,
	    paddingTop: 15
	}
});

//post list
export const PostListRowStyles = StyleSheet.create({
	rowContainer: {
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 20,
		paddingRight: 20,
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
		paddingTop:20,
		paddingBottom:20,
		paddingLeft:20,
		paddingRight: 20
	}
});

//drawer panel
export const DrawerPanelStyles = StyleSheet.create({

});

//common
export const CommonStyles = StyleSheet.create({
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
