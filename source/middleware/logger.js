
export default function logger({ getState }) {
  return (next) => (action) => {
	//console.log('logger dispatching', action);
    const result = next(action);
	//console.log('next state', getState());
    return result;
  };
}
