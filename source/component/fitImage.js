import React, { Component } from 'react';
import {
	Image,
	Dimensions
} from 'react-native';

import resolveAssetSource from 'resolveAssetSource';

const { height, width } = Dimensions.get('window');
class FitImage extends Component {

	constructor(props) {
	    super(props)
	    this.getSource = this.getSource.bind(this)
	}
	getSource(assetSource) {
		console.info("assetSource:");
		console.info(assetSource);

	    let source = resolveAssetSource(assetSource);

	    console.info("source:");
		console.info(source);

	    let ratio = source.width / source.height;
	    let width = this.props.width || width;
	    let height = this.props.height || width / ratio;
	    source.width = width;
	    source.height = height;
	    return source;
	}

	render() {
	    let source = this.getSource(this.props.source);
	    return (
	        <Image source={ source} resizeMode='cover' />
	    );
	}
}

export default FitImage;


