import './scss/main.scss';

import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Elevator from './components/Elevator';

import configureStore from './store/config';

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Elevator />
  </Provider>,
  document.getElementById('elevator')
);
