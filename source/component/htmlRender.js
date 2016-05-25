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
	        if (index == (codeLen - 1)) return '';
	        if (line == '') line = '\n';
	        let lineNum = index + 1;
	        return (
	            <View key={'codeRow'+index} style={HtmlRenderStyle.codeRow}>
	                <View style={HtmlRenderStyle.lineNumWrapper}>
	                    <Text style={HtmlRenderStyle.lineNum}>
	                        {lineNum + '.'}
	                    </Text>
	                </View>

	                <View style={HtmlRenderStyle.codeLineWrapper}>
	                    <Text style={HtmlRenderStyle.codeLine}>
	                        {line}
	                    </Text>
	                </View>
	            </View>
	        )
	    });
	}

	onImageLoadEnd(imageUri, imageId){
		
		console.info("onImageLoadEnd trigger: " + imageUri);

		Image.getSize && Image.getSize(imageUri, (w, h)=> {
			if (w >= defaultMaxImageWidth) {
				h = (defaultMaxImageWidth / w) * h;
				w = defaultMaxImageWidth;
			}
			this.images[imageId] && this.images[imageId].setNativeProps({
				style: {
					width: w,
					height: h
				}
			});
		});
	}

	renderNode(node, index, list) {
		if(node.name && node.name == 'img'){
			const imageUri = node.attribs.src;
			const imageId = _.uniqueId('image_');
			return (
				<Image
					key={ imageId }
					ref={ view=>this.images[imageId] = view }
					style={ contentStyles.img }
					source={{uri:imageUri}}
					onLoadEnd={ this.onImageLoadEnd.bind(this, imageUri, imageId) }
				/>
			)
		}


		if(node.name && node.name == 'pre'){
			if (node.children && node.children.length > 0) {
				let codeText = '';
				node.children.forEach(function (code) {
					if(code.data){
	                	codeText = codeText + code.data;
					}
					if(code.name == "span"){
						let codeChild = code.children[0];
						if (codeChild.data) {
							codeText = codeText + codeChild.data;
						}
					}
	            });

	            const codeId = _.uniqueId('code_');

	            return (
	            	<View
	                    key= {codeId}
	                    horizontal={true}
	                    style={HtmlRenderStyle.codeScrollView}>
	                    <View style={HtmlRenderStyle.codeWrapper}>
	                        { this.renderCodeBlock(codeText) }
	                    </View>
	                </View>
	           );
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
