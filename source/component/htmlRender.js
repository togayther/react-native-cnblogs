import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	ScrollView,
	Dimensions
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import _ from 'lodash';
import entities  from 'entities';
import HtmlRenderStyle from '../style/htmlRender';

const {width, height} = Dimensions.get('window');
const defaultImageWidth = width - 36; // CommonStyles.detailContainer.padding * 2
const defaultImageHeight = 250;       // how can i get Image.getSize ? 

class HtmlRender extends Component {
	
	constructor(props) {
		super(props);
		this.images = {};
	}

	onLinkPress(url) {
		console.info("onLinkPress, url="+url);
	}

	renderCodeBlock(codeText) {
	    let codeLines = codeText.split('\n');
	    let codeLen = codeLines.length;
	    return codeLines.map(function (line, index, arr) {
	        if (index == codeLen) return null;
	        if (line == '') line = '\n';
	        return (
	            <View key={ index } style={ HtmlRenderStyle.codeRow }>
	                <View style={ HtmlRenderStyle.codeLineWrapper }>
	                    <Text style={ HtmlRenderStyle.codeLine }>
	                        {line}
	                    </Text>
	                </View>
	            </View>
	        );
	    });
	}

	onImageLoadEnd(imageUri, imageId){

		/* 本来想通过 Image.getSize 获取图片宽高，做图片的自适应
		 * 但这里打印出的 Image.getSize 竟然为 undefined
		 * 相关issue: https://github.com/facebook/react-native/issues/5838
		 ======================================================================*/

		/*
		console.info("htmlRender onImageLoadEnd");
		console.info(Image.getSize);
        */

		Image.getSize && Image.getSize(imageUri, (width, height)=> {

			if (width >= defaultImageWidth) {
				height = (defaultImageWidth / width) * height;
				width = defaultImageWidth;
			}

			this.images[imageId] && this.images[imageId].setNativeProps({
				style: {
					width: w,
					height: h
				}
			});
		});
	}

	getNodeCodeText(node, codeText){
		if(node.type == 'text'){
        	codeText = codeText + node.data;
		}
		if(node.name && node.children && node.children.length){
			node.children.map((child)=>{
				codeText = this.getNodeCodeText(child, codeText);
			});
		}
		return codeText;
	}

	renderNode(node, index, list) {
		if(node.type == 'tag'){
			//note: 解析图片
			if(node.name == "img" && node.attribs && node.attribs.src){
				let imageUri = node.attribs.src;
				let imageId = _.uniqueId('image_');
				return (
					<Image
						key={ imageId }
						ref={ view=>this.images[imageId] = view }
						style={ contentStyles.img }
						resizeMode='contain'
						source={ {uri:imageUri} }
						onLoadEnd={ this.onImageLoadEnd.bind(this, imageUri, imageId) }
					/>
				);
			}

			//note: 暂时先解析这几种代码片段
			if(node.name == "code" || 
			   node.name == "pre" || 
			   (node.name == "div" && node.attribs && node.attribs.class && node.attribs.class=="cnblogs_code")){

				let codeId = _.uniqueId('code_');
				let codeText = "";

                codeText = this.getNodeCodeText(node, codeText);
                codeText = entities.decodeHTML(codeText);

                if (codeText) {
                	return (
	                    <ScrollView
	                    	key= { codeId }
	                        style={HtmlRenderStyle.codeScrollView}
	                        horizontal={true}>
	                        <View style={HtmlRenderStyle.codeWrapper}>
	                            { this.renderCodeBlock(codeText) }
	                        </View>
	                    </ScrollView>
	                );
                }
			}
		}
	}


	render() {
		return (
			<HTMLView
				value={this.props.content}
				stylesheet={ HtmlRenderStyle }
				onLinkPress={this.onLinkPress.bind(this)}
				renderNode={this.renderNode.bind(this)}>
			</HTMLView>
		)
	}
}

const contentStyles = StyleSheet.create({
	img: {
		flex: 1,
		width: defaultImageWidth,
		height: defaultImageHeight
	}
});


export default HtmlRender;
