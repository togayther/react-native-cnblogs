var FadeToogle = require('react-native-fade-toogle');
var {
    StyleSheet,
    Text,
    View,
    Easing,
} = React;

var fadedemo = React.createClass({
    _startButtonPressed(event) {
        var r = this.refs.fade;
        r.fadeToggle();
    },
    _fadeToogleCallback(){
        var r = this.refs.fade;
        console.log('fade: '+r.state.opacity);
    },
    render: function() {
        return (
            <View style={styles.container}>
                <FadeToogle ref="fade" component="View" easing={Easing.elastic(2)} callback={this._fadeToogleCallback}>
                    <Text>Hello</Text>
                </FadeToogle>
                <Button style={styles.button} onPress={this._startButtonPressed}>Fade</Button>
            </View>
        );
    }
});