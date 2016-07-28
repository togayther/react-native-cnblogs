import React, { Component } from 'react';
import {
	View,
	Image,
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { StyleConfig } from '../style';
const {width, height} = Dimensions.get('window');
const defaultMaxWidth = width - 30;

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
                    <View style={ styles.progress }>
                        <ActivityIndicator color={ StyleConfig.secondaryColor }/>
                    </View>
                    : null
                }
            </Image>
	    )
	}
}

const styles = StyleSheet.create({
	progress:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
        backgroundColor:'transparent'
	}
});

export default ImageBox;


