import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	Linking,
	Dimensions,
	ScrollView
} from 'react-native';

import _ from 'lodash';
import HTMLView from 'react-native-html-converter';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { HtmlConvertorStyles, StyleConfig } from '../style';
import { filterCodeSnippet, decodeHTML, formatNewsImgUri } from '../common';
import ImageBox from './imageBox';

const {width, height} = Dimensions.get('window');
const defaultImageMaxWidth = width - StyleConfig.contentPadding * 2;

class HtmlRender extends Component {
	
	constructor(props) {
		super(props);
		this.images = {};

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	onLinkPress(url) {
		Linking.canOpenURL(url).then(supported=> {
			if (supported) {
				return Linking.openURL(url)
			}
		})
		.catch(err=> {
			console.warn('cannot open url: '+ url);
		})
	}


	renderCodeBlock(codeText) {
	    let codeLines = codeText.split('\n');
	    let codeLen = codeLines.length;
	    return codeLines.map((line, index)=>{
			if (index == codeLen) return null;
	        return (
	            <View key={ index } style={ HtmlConvertorStyles.codeRow }>
	                <View style={ HtmlConvertorStyles.codeLineWrapper }>
	                    <Text style={ HtmlConvertorStyles.codeLine }>
	                        {line}
	                    </Text>
	                </View>
	            </View>
	        );
		});
	}

	getNodeCodeText(node, codeText){
		if(node.type == 'text'){
			if (node.data) {
				codeText = codeText + node.data;	
			}
		}
		if(node.name && node.children && node.children.length){
			node.children.map((child)=>{
				codeText = this.getNodeCodeText(child, codeText);
			});
		}
		return codeText;
	}

	getCodeViewHeight(codeText){
		//there has a scrollview bug.
		//https://github.com/facebook/react-native/issues/8369
		//codeViewHeight = codeRow height * codeRowLength + paddingVertical
		const codeRowHeight = 25,
			  codeViewPadding = 30;
			
		let codeRowCount = codeText.split('\n').length,
			codeViewHeight = codeRowCount * codeRowHeight + codeViewPadding; 
		return codeViewHeight;
	}

	renderNode(node, index, list) {

		const { imgDisabled } = this.props;

		if(node.type == 'tag'){
			//note: 解析图片
			if(node.name == "img" && node.attribs && node.attribs.src){

				if(imgDisabled === true){
					return undefined;
				}

				let imageUri = formatNewsImgUri(node.attribs.src);
				let imageId = _.uniqueId('image_');
				return (
					<ImageBox
						maxWidth = { defaultImageMaxWidth } 
						style={ HtmlConvertorStyles.img }
						key={imageId} 
						uri={ imageUri }/>
				);
			}

			//note: 评论引用链接
			if(node.name == "a"){
				if (node.attribs && node.attribs.onclick) {
					return <Text>@</Text>;
				}
			}

			//note: 暂时先解析这几种代码片段
			if(node.name == "code" || 
			   node.name == "pre" || 
			   (node.name == "div" && node.attribs && node.attribs.class && node.attribs.class=="cnblogs_code")){

				//不解析code snippet
				if(this.props.renderCode === false){
					return undefined;
				}

				let codeId = _.uniqueId('code_');
				let codeText = "";
                codeText = this.getNodeCodeText(node, codeText);
               	
                codeText = decodeHTML(codeText);
                codeText = filterCodeSnippet(codeText);

				let codeViewHeight = this.getCodeViewHeight(codeText);

                if (codeText) {	
                	return (
	                    <ScrollView
	                    	key= { codeId }
							style={[HtmlConvertorStyles.codeScrollView, {height: codeViewHeight}]}
							horizontal={ true }
							showsVerticalScrollIndicator ={ true }
	                        showsHorizontalScrollIndicator={ true }>
	                        <View style={HtmlConvertorStyles.codeWrapper}>
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
				stylesheet={ HtmlConvertorStyles }
				containerStyle={ this.props.containerStyle }
				onLinkPress={this.onLinkPress.bind(this)}
				renderNode={this.renderNode.bind(this)}>
			</HTMLView>
		)
	}
}

export default HtmlRender;
