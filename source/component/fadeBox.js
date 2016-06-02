import React, { PropTypes, Component} from 'react';
import {
    StyleSheet,
    Animated,
    Easing,
    Text,
    View,
    Image
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
        component: PropTypes.string,
        easing: PropTypes.func,
        callback: PropTypes.func,
        isDisabled: PropTypes.bool,
        style: View.propTypes.style
    }

    static defaultProps = {
        fromOpacity: 1,
        toOpacity: 0,
        duration: 100,
        isDisabled: false
    }

    fadeToggle(){
        let that = this;
        let callback = function() {
          if (that.props.callback && !that.props.isDisabled) {
            that.props.callback();
          }
        };

        let t;
        if(this.state.opacity == this.props.toOpacity){
            t = this.props.fromOpacity;
        }else{
            t = this.props.toOpacity;
        }
        this.setState({opacity: t});
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: t,
                duration: this.props.duration,
                easing: Easing.elastic(2)
            },
        ).start(callback);
    }

    render(){
        return (
            <Animated.View style={ [this.props.style, { opacity: this.state.fadeAnim} ] }>
                { this.props.children }
            </Animated.View>
        )
    }
}

module.exports = FadeBox;