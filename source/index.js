import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store }  from './reducer/store';
import Navigation from './component/navigation';

class ReactNativeCnblogsApp extends Component {
	render() {
		return (
			<Provider store={ Store }>
				<Navigation/>
			</Provider>
		);
	}
}

export default ReactNativeCnblogsApp;
