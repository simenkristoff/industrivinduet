import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/nb_NO';
import 'antd/dist/antd.less';
import App from '@/App';

import configureStore from './state';

const initialState = (window as any).initialReduxState;
const { store, persistor } = configureStore(initialState);

const render = () => {
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
      {/* </PersistGate> */}
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./App', () => {
    render();
  });
}
