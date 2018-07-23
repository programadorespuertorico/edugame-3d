import React, { Component } from 'react';
import Scene from './Scene';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import logo from './logo.svg';
import './App.css';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
	      <div className="App">
		<Scene />
	      </div>
      </Provider>
    );
  }
}

export default App;
