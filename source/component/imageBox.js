import React, { Component } from 'react';
import {
	View,
	Image,
    ActivityIndicator
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { CommonStyles, StyleConfig } from '../style';

const defaultMaxWidth = StyleConfig.screen_width - ( StyleConfig.space_3 * 2 );

class ImageBox extends Component {

	constructor(props) {
	    super(props);
        this.state = {
            loading: true
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

    onImageLoadEnd(){
        const { uri, maxWidth = defaultMaxWidth } = this.props;
        this.setState({
            loading: false
        });
		Image.getSize && Image.getSize(uri, (width, height)=> {
			if (width >= maxWidth) {
				height = (maxWidth / width) * height;
				width = maxWidth;
			}
			this.image && this.image.setNativeProps({
				style: {
					width: width,
					height: height
				}
			});
		},() => null);
	}

	render() {
        const { uri, style } = this.props;
	    return (
	    	<Image
                ref={ view=>this.image = view }
                source={ {uri: uri} }
                style={ style }
                onLoadEnd={ ()=> this.onImageLoadEnd() }>
                {
                    this.state.loading?
                    <View style={[ CommonStyles.flexItemsMiddle, CommonStyles.flexItemsCenter, CommonStyles.flex_1 ]}>
                        <ActivityIndicator color={ StyleConfig.color_danger }/>
                    </View>
                    : null
                }
            </Image>
	    )
	}
}

export default ImageBox;


