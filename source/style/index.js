
import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

//style config
export const StyleConfig = {
	mainColor:'rgba(60, 177, 158, 1)',
	secondaryColor:'rgba(199, 85, 74, 1)',
	foregroundColor: 'rgba(255, 255, 255, 1)',
	borderColor:'rgba(248, 248, 248, 1)',
	parallaxHeaderHeight: 200,
	navbarHeight: 70,
	avatarSize: 20,
	contentPadding: 15,
	htmlFontSize : 18,
	htmlBlankHeight: 10,
	headerFontSize: 22,
	headerFontColor:'rgba(0, 0, 0, 0.9)',
	titleFontSize: 18,
	titleFontColor:'rgba(0, 0, 0, 0.8)',
	contentFontSize: 16,
	contentFontColor:'rgba(0, 0, 0, 0.8)',
	hintFontSisze: 16,
	hintFontColor: 'rgba(0, 0, 0, 0.6)',
	touchablePressColor:'rgba(0, 0, 0, 0.04)'
};

//htmlconvertor
export const HtmlConvertorStyles = StyleSheet.create({
	img: {
		flex:1,
        width: width - 30,
        height: 200,
		marginBottom: StyleConfig.htmlBlankHeight,
        resizeMode: Image.resizeMode.stretch
    },
    div:{
        fontSize: StyleConfig.htmlFontSize,
        lineHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.7)'
    },
    span:{
        fontSize: StyleConfig.htmlFontSize,
        lineHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.7)'
    },
    p: {
    	fontSize: StyleConfig.htmlFontSize,
        lineHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.7)'
    },
	font:{
		fontSize: StyleConfig.htmlFontSize,
		lineHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.7)'
	},
    label: {
    	fontSize: 16,
        lineHeight: 24,
        paddingTop: 0,
        paddingBottom: 0,
        color: 'rgba(0,0,0,0.8)'
    },
	comment:{
		fontSize: 16,
        lineHeight: 24,
        paddingTop: 0,
        color: 'rgba(0,0,0,0.7)'
	},
    a: {
        color: '#2692db',
        fontSize: StyleConfig.htmlFontSize,
        lineHeight: 30,
        paddingTop: 0,
        paddingBottom: 0,
		marginBottom: StyleConfig.htmlBlankHeight
    },
    h1: {
        fontSize: StyleConfig.htmlFontSize * 1.6,
        fontWeight: "bold",
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.8)'
    },
    h2: {
        fontSize: StyleConfig.htmlFontSize * 1.5,
        fontWeight: 'bold',
		marginBottom: StyleConfig.htmlBlankHeight,
        color: 'rgba(0,0,0,0.85)'
    },
    h3: {
        fontWeight: 'bold',
		marginBottom: StyleConfig.htmlBlankHeight,
        fontSize: StyleConfig.htmlFontSize * 1.4,
        color: 'rgba(0,0,0,0.8)'
    },
    h4: {
        fontSize: StyleConfig.htmlFontSize * 1.3,
        color: 'rgba(0,0,0,0.7)',
		marginBottom: StyleConfig.htmlBlankHeight,
        fontWeight: 'bold'
    },
    h5: {
        fontSize: StyleConfig.htmlFontSize * 1.2,
        color: 'rgba(0,0,0,0.7)',
		marginBottom: StyleConfig.htmlBlankHeight,
        fontWeight: 'bold'
    },
    h6: {
        fontSize: StyleConfig.htmlFontSize * 1.1,
        color: 'rgba(0,0,0,0.7)',
		marginBottom: StyleConfig.htmlBlankHeight,
        fontWeight: 'bold'
    },
    li: {
        fontSize: StyleConfig.htmlFontSize,
        color: 'rgba(0,0,0,0.7)',
		marginBottom: StyleConfig.htmlBlankHeight,
    },
    strong: {
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)',
		marginBottom: StyleConfig.htmlBlankHeight,
        fontSize: StyleConfig.htmlFontSize,
    },
    em: {
		marginBottom: StyleConfig.htmlBlankHeight,
        fontStyle: 'italic'
    },
    codeScrollView:{
        backgroundColor: '#333',
        flexDirection: 'row',
        paddingVertical: StyleConfig.contentPadding,
		marginBottom: StyleConfig.htmlBlankHeight,
		marginTop: StyleConfig.htmlBlankHeight,
    },
    codeWrapper: {
        flexDirection: 'column'
    },
    codeRow: {
        flexDirection: 'row',
        height: 25,
        alignItems: 'center'
    },
    codeLine: {
        color: StyleConfig.mainColor
    },
    codeLineWrapper: {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: StyleConfig.contentPadding
    }
});

//home
export const HomeStyles = StyleSheet.create({
	headerContainer: {
	    alignItems: 'center',
	    flex: 1,
	    flexDirection: 'column',
	    paddingTop: 40,
	    paddingHorizontal: 15
	},
	headerAvatar: {
	    marginBottom: 10,
	    height: 60,
	    width: 60,
	    borderRadius: 60 / 2
	},

	headerTitleText: {
	    color: StyleConfig.foregroundColor,
	    fontSize: 24,
	    lineHeight: 32,
	    paddingVertical: 5,
	},

	headerSubText: {
	    color: 'rgba(255,255,255, 0.6)',
	    fontSize: 16
	}
});

//author
export const AuthorStyles = StyleSheet.create({
	headerContainer: {
	    alignItems: 'center',
	    flex: 1,
	    flexDirection: 'column',
	    paddingTop: 50,
	    paddingHorizontal: 15
	},
	headerAvatar: {
	    marginBottom: 10,
	    height: 50,
	    width: 50,
	    borderRadius: 50 / 2
	},

	headerTitleText: {
	    color: StyleConfig.foregroundColor,
	    fontSize: 24,
	    lineHeight: 32,
	    paddingVertical: 5,
	},

	headerMetas:{
		position:'absolute',
		bottom:0,
		left:0,
		right:0,
		width: width,
		height: 40,
		paddingHorizontal: StyleConfig.contentPadding,
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'rgba(0,0,0,0.1)'
	},

	headerMetaText: {
	    color: 'rgba(255,255,255, 0.8)',
	    fontSize: StyleConfig.hintFontSize
	}
});

//search
export const SearchStyles = StyleSheet.create({
	header:{
		flex: 1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
	    backgroundColor: 'rgba(0, 0, 0, 0.04)',
	    paddingVertical: StyleConfig.contentPadding,
	    paddingHorizontal: StyleConfig.contentPadding
	},
	headerText:{
		fontSize: StyleConfig.contentFontSize,
		color: StyleConfig.contentFontColor,
	},
	searchInput:{
		flex: 1,
		fontSize: 16,
		paddingTop: 0,
		paddingBottom: 0,
		color: StyleConfig.foregroundColor
	}
});

//comment
export const CommentStyles = StyleSheet.create({
	metaInfo:{
		flexDirection:'row',
		alignItems:'center',
		marginBottom: 10
	},

	metaAvatar:{
		width: StyleConfig.avatarSize,
		height: StyleConfig.avatarSize,
		borderRadius: StyleConfig.avatarSize / 2,
		marginRight: 10
	},

	metaAuthor:{
		flexDirection:'row',
		alignItems:'center',
		flex: 1,
		justifyContent:'space-between'
	},

	authorName:{
		fontSize: StyleConfig.contentFontSize,
		color: StyleConfig.secondaryColor
	},

	published:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.hintFontColor
	}

});

//post 
export const PostStyles = StyleSheet.create({
	authorInfo: {
		flex:1,
		alignItems:'center',
		flexDirection: 'row',
		marginBottom: 10
	},
	authorAvatar: {
		height: StyleConfig.avatarSize,
		width: StyleConfig.avatarSize,
		borderRadius: StyleConfig.avatarSize / 2,
		marginRight: 10
	},
	authorName:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.secondaryColor
	},

	title:{
		fontSize: StyleConfig.titleFontSize,
		lineHeight: StyleConfig.titleFontSize * 1.5,
		color: StyleConfig.titleFontColor,
		marginBottom: 5
	},
	summary:{
		fontSize: StyleConfig.contentFontSize,
		lineHeight: StyleConfig.contentFontSize * 1.5,
		color: StyleConfig.hintFontColor,
		marginBottom: 5
	},
	metaInfo:{
		flexDirection:'row'
	},

	metaRight:{
		flex: 1,
		flexDirection:'row',
		alignItems:'center', 
		justifyContent:'flex-end'
	},

	metaText:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.hintFontColor
	}
});


//post detail
export const PostDetailStyles = StyleSheet.create({
	headerContainer:{
		alignItems: 'flex-start',
	    flex: 1,
	    flexDirection: 'column',
	    justifyContent:'space-around',
	    paddingHorizontal: StyleConfig.contentPadding
	},

	headerTitleText:{
		color: StyleConfig.foregroundColor,
	    fontSize: 24,
	    lineHeight: 32
	},

	headerMetaContainer:{
		position:'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		width: width,
		paddingVertical: StyleConfig.contentPadding,
		paddingHorizontal: StyleConfig.contentPadding,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between'
	},

	headerMetaInfo:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'flex-start'
	},

	metaAuthorAvatar:{
	    height: StyleConfig.avatarSize,
	    width:StyleConfig.avatarSize,
	    borderRadius: StyleConfig.avatarSize / 2,
	    marginRight: 10
	},

	metaAuthorName:{
		fontSize: StyleConfig.contentFontSize,
		color: StyleConfig.foregroundColor
	},

	metaRight:{
		fontSize: StyleConfig.hintFontSize,
		color: 'rgba(255,255,255, 0.8)'
	}
});

//nav bar
export const NavbarStyles = StyleSheet.create({
	container: {
	    height: StyleConfig.navbarHeight,
	    width: width,
	    backgroundColor:'#111',
	    flexDirection:'row',
	    justifyContent:'space-between'
	},

	backgroundImage: {
	    width: width,
	    height: StyleConfig.navbarHeight,
	    opacity: 0.2,
	    position:'absolute',
	    top:0,
	    left:0,
	    right:0
	},

	leftContent:{
		flex: 2,
	    height: StyleConfig.navbarHeight,
	    flexDirection:'row',
	    alignItems:'center',
	    backgroundColor:'transparent',
	    justifyContent: 'flex-start',
	    paddingLeft: StyleConfig.contentPadding,
	    paddingTop: 30,
	    paddingBottom: 10
	},

	rightContent:{
		flex: 1,
	    height: StyleConfig.navbarHeight,
	    flexDirection:'row',
	    alignItems:'center',
	    backgroundColor:'transparent',
	    justifyContent: 'flex-end',
	    paddingTop: 30,
	    paddingRight: StyleConfig.contentPadding - 10,
	    paddingBottom: 10
	},
	icon:{
		height: 20,
		marginRight: 10,
	},
	iconImage:{
		height: StyleConfig.avatarSize,
		width: StyleConfig.avatarSize,
	    borderRadius: StyleConfig.avatarSize /2,
	},

	title:{
		color: StyleConfig.foregroundColor,
	    fontSize: 18
	}
});

//float button
export const FloatButtonStyles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: 50,
		width: 50,
		borderRadius: 25,
		backgroundColor: 'rgba(199, 85, 74, 0.8)',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	positionLeft:{
		left: StyleConfig.contentPadding,
		bottom: StyleConfig.contentPadding
	},
	positionRight:{
		right: StyleConfig.contentPadding,
		bottom: StyleConfig.contentPadding
	},
	icon:{
		color: StyleConfig.foregroundColor
	},
	text:{
		color: StyleConfig.foregroundColor
	}
});

//drawer
export const DrawerPanelStyles = StyleSheet.create({
	header:{
		backgroundColor:'rgba(0,0,0, 0.9)'
	},
	headerBg:{
		flex:1,
		height: 200,
		width: width - 80,
	    justifyContent: 'center',
	    flexDirection:'column',
		paddingLeft: StyleConfig.contentPadding
	},
	headerContent:{
		flexDirection:'row',
		alignItems:'center'
	},
	headerAvatar:{
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10
	},
	headerText:{
		flexDirection:'column',
		justifyContent:'space-between'
	},
	headerName:{
		fontSize: 20,
		color:'#f2f2f2',
		marginBottom: 5
	},
	headerDate:{
		fontSize: 12,
		color: '#aaa'
	},
	list:{
		paddingTop: 10
	}
});

//about
export const AboutStyles = StyleSheet.create({
	footer:{
	    position:'absolute', 
	    bottom: 20, 
	    width: width,
	    flexDirection:'column', 
	    alignItems:'center',
	    justifyContent:'center'
	},
	footerText:{
		color: 'rgba(0,0,0,0.4)',
	    textAlign:'center'
	}
});

//post bar
export const PostBarStyles = StyleSheet.create({
	container: {
		position:'absolute',
		width: width,
		left: 0,
		right:0,
		bottom: 0,
	    flexDirection:'row',
	    borderTopWidth: 1,
	    borderTopColor: StyleConfig.borderColor,
	    alignItems:'center',
	    justifyContent:'space-around',
	    backgroundColor: 'rgba(255, 255,255, 0.9)'
	},
	barItem:{
		flex:1,
	    paddingVertical: 10,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	barItemBadge:{
		justifyContent:'center',
		alignItems:'center',
		top: 0,
		position:'absolute'
	},
	barItemBadgeText:{
		color: StyleConfig.secondaryColor,
		fontSize: 14,
		fontStyle: 'italic',
		fontWeight:'bold'
	},
	barItemIcon:{
		color: StyleConfig.contentFontColor,
		fontSize: 26
	},
	barItemIconActive:{
		color: StyleConfig.secondaryColor,
		fontSize: 20
	}
});

//setting
export const PanelStyles = StyleSheet.create({
	container:{
		padding: StyleConfig.contentPadding,
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth: .5,
		borderBottomColor: StyleConfig.borderColor,
		justifyContent: 'space-between'
	},
	content:{
		flex:1,
		flexDirection:'column'
	},
	title:{
		fontSize: StyleConfig.titleFontSize,
		color: StyleConfig.secondaryColor,
		marginBottom: 5
	},
	icon:{
		width: 40,
		height: 40,
		borderRadius: 20
	},
	descr:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.hintFontColor,
		lineHeight: 22
	}
});

//common
export const CommonStyles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: 'rgba(255,255,255,1)',
		flexDirection: 'column'
	},

	rowContainer:{
		paddingVertical:StyleConfig.contentPadding,
		paddingHorizontal:StyleConfig.contentPadding,
		flexDirection: 'column',
		borderBottomColor: StyleConfig.contentPadding,
		borderBottomWidth: .5
	},

	pageContainer:{
		paddingVertical: StyleConfig.contentPadding
	},

	spinnerContainer:{
		paddingVertical: 100
	},

	detailContainer:{
		paddingVertical: StyleConfig.contentPadding,
		paddingHorizontal: StyleConfig.contentPadding,
		paddingBottom: 60,
	},

	messageContainer:{
		paddingVertical: 80,
		width: width,
		flexDirection:'column',
		alignItems:'center',
		justifyContent:'center'
	},

	messageIcon:{
		color:StyleConfig.mainColor, 
		marginBottom: 5
	},

	messageText:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.mainColor
	},

    codeLogoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor:'rgba(255,255,255, 0.8)',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 10
    },

    codeLogoText:{
        color: StyleConfig.secondaryColor,
        fontSize:40,
        fontWeight:'bold'
    },

	borderBottom:{
		borderBottomWidth: .5,
		borderBottomColor: StyleConfig.borderColor
	},

	listItem: {
	    paddingVertical: StyleConfig.contentPadding,
	    paddingHorizontal: StyleConfig.contentPadding,
	    flexDirection:'row',
	    alignItems:'center'
	},

	listItemActive:{
		backgroundColor: StyleConfig.mainColor
	},

	listItemText:{
		fontSize: 16,
		color: 'rgba(0, 0, 0, 0.7)'
	},

	listItemIcon:{
		width: 20,
		height: 20,
		borderRadius: 10,
	    flexDirection:'row',
	    alignItems:'center',
	    justifyContent:'center',
	    marginRight: 15
	},

	listItemTail:{
		fontSize: StyleConfig.hintFontSize,
		color: StyleConfig.hintFontColor,
	    flex: 1,
	    textAlign: 'right'
	},

	headerBackgroundImage:{
	    width: width,
	    height: StyleConfig.parallaxHeaderHeight
	},

	headerBackgroundMask:{
	    position: 'absolute',
	    top: 0,
	    width: width,
	    backgroundColor: 'rgba( 0, 0, 0, 0.2)',
	    height: StyleConfig.parallaxHeaderHeight
	}
});
