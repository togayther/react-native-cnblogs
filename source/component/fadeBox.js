import React, { PropTypes, Component} from 'react';
import {
    Animated,
    Easing,
    View
} from 'react-native';

class FadeBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: this.props.fromOpacity,
            fadeAnim: new Animated.Value(this.props.fromOpacity)
        };
    }

    static propTypes = {
        fromOpacity: PropTypes.number,
        toOpacity: PropTypes.number,
        duration: PropTypes.number,
        style: View.propTypes.style
    }

    static defaultProps = {
        fromOpacity: 1,
        toOpacity: 0,
        duration: 500
    }

    fadeIn(){
        let toOpacity = this.props.toOpacity;
        this.fade(toOpacity);
    }

    fadeOut(){
        let toOpacity = this.props.fromOpacity;
        this.fade(toOpacity);
    }

    fade(toOpacity){
        this.setState({
            opacity: toOpacity
        });
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: toOpacity,
                duration: this.props.duration
            },
        ).start();
    }

    render(){
        return (
            <Animated.View style={ [this.props.style, { opacity: this.state.fadeAnim} ] }>
                <View>
                { this.props.children }
                </View>
            </Animated.View>
        )
    }
}

module.exports = FadeBox;