import './scss/main.scss';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Elevator from './components/Elevator';

import configureStore from './store/config';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Elevator />
  </Provider>,
  document.getElementById('elevator')
);
