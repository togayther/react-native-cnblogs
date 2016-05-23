import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';

import Button from './button';
import { ScrollTabStyles } from '../../style';

const tabsBackgroundImg = 'http://123.56.135.166/cnblog/public/img/scrolltab-bg.jpg'

const CustomTabbar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: View.propTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: '#fff',
      inactiveTextColor: '#ddd',
      underlineColor: '#fff',
      backgroundColor: '#222',
      underlineHeight: 2,
    };
  },

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'normal' : 'normal';

    return (
      <Button
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => this.props.goToPage(page)}>
        <View style={ScrollTabStyles.tab}>
          <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
            {name}
          </Text>
        </View>
      </Button>
    );
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: this.props.underlineHeight,
      backgroundColor: this.props.underlineColor,
      bottom: 0,
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });

    return (
      <View style={[ScrollTabStyles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
          <Image source={{ uri: tabsBackgroundImg }}
            style={ScrollTabStyles.container}>
            {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          </Image>
        <Animated.View style={[tabUnderlineStyle, { left, }, ]} />
      </View>
    );
  },
});

module.exports = CustomTabbar;