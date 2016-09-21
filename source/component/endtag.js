import React, { Component } from 'react';
import {
	Text,
	View
} from 'react-native';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { CommonStyles } from '../style';

class EndTag extends Component {

	constructor(props) {
	    super(props);
	    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
        let { text = "— 我是有底线的 —" } = this.props;
	    return (
	    	<View style={ [CommonStyles.p_a_4] }>
                <Text style={ [CommonStyles.text_center, CommonStyles.text_gray] }>
                    { text }
                </Text>
            </View>
	    )
	}
}

export default EndTag;


