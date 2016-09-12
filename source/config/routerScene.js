import React, {
	Dimensions,
	Navigator
} from 'react-native';

const { width } = Dimensions.get('window');

const baseConfig = Navigator.SceneConfigs.PushFromRight;

const popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
	edgeHitWidth: width / 4
});

const fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom.gestures.pop, {
	edgeHitWidth: width
});

export const customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom, {
	gestures: {
		pop: fullPopGestureConfig
	}
});

export const customPushFromRight = Object.assign({}, baseConfig, {
	gestures: {
		pop: popGestureConfig
	}
});

