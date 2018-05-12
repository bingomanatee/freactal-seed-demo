import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';
import {HashRouter, Route} from 'react-router-dom'

const root = document.getElementById('root');
const load = () => render((
  <AppContainer>
    <HashRouter>
      <App/>
    </HashRouter>
  </AppContainer>
), root);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./App', load);
}

load();
