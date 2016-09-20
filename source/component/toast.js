import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
} from 'react-native'

const { height, width } = Dimensions.get('window');
const ToastOpacity = 0.8;

class Toast extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visiabled: false,
            message: '',
            opacityValue:new Animated.Value(ToastOpacity),
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    show(opts) {
        this.duration= opts.duration || 2500;
        this.setState({
            visiabled: true,
            message: opts.message,
        });
        this.visiabled=true;
        this.state.opacityValue.setValue(ToastOpacity)
        this.hide(opts);
    }

    hide(opts) {
        if(!this.visiabled) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: 500,
                }
            ).start(()=>{
                this.setState({
                    visiabled: false,
                });
                this.visiabled = false;
            });
            opts.onHide && opts.onHide();
        }, this.duration);
    }

    getTopOffset(){
        let topOffset;
        let { position = 'bottom' } = this.props;
        switch (position){
            case 'top':
                topOffset = 80;
                break;
            case 'center':
                topOffset = height / 2;
                break;
            case 'bottom':
                topOffset = height - 120;
                break;
        }
        return topOffset;
    }
    
    render() {
        let topOffset = this.getTopOffset();
        return (
            this.state.visiabled ?
            <View
                style={[ styles.container, { top : topOffset }]}
                pointerEvents="none">
                <Animated.View
                    style={[ styles.content, { opacity: this.state.opacityValue }, this.props.style ]}>
                    <Text style={ styles.text }>
                        { this.state.message }
                    </Text>
                </Animated.View>
            </View>
            : null
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#222',
        opacity: ToastOpacity,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    text:{
        color:'#fff'
    }
});

export default Toast;