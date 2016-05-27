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

import { html_decode } from '../common/util';
import HtmlRenderStyle from '../style/htmlRender';

const {width, height} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;

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
	        if (index == (codeLen - 1)) return null;
	        if (line == '') line = '\n';
	        if (line) {
		        return (
		            <View key={'codeRow'+index} style={HtmlRenderStyle.codeRow}>
		                <View style={HtmlRenderStyle.codeLineWrapper}>
		                    <Text style={HtmlRenderStyle.codeLine}>
		                        {line}
		                    </Text>
		                </View>
		            </View>
		        );
	        }
	    });
	}

	onImageLoadEnd(imageUri, imageId){

		console.info("onImageLoadEnd trigger");
		console.info(imageUri);
		console.info(Image.getSize);

		Image.getSize && Image.getSize(imageUri, (w, h)=> {
			if (w >= defaultMaxImageWidth) {
				h = (defaultMaxImageWidth / w) * h;
				w = defaultMaxImageWidth;
			}

			console.info(`onImageLoadEnd:${w}, ${h}`);

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
						source={{uri:imageUri}}
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
                if (codeText) {
                	codeText = entities.decodeHTML(codeText);
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
		width: defaultMaxImageWidth,
		height: defaultMaxImageWidth,
		resizeMode: Image.resizeMode.cover
	}
});


export default HtmlRender;
