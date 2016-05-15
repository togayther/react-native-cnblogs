import React,{
	Component
} from 'react-native';
import { Provider } from 'react-redux';
import { Store }  from './common/store';
import Navigation from './component/navigation';

class App extends Component {
	render() {
		return (
			<Provider store={ Store }>
				<Navigation/>
			</Provider>
		);
	}
}

export default App;
