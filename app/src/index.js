import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/createStore';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/nb_NO';

import reportWebVitals from './reportWebVitals';


// AntDesign
import 'antd/dist/antd.css';

// temporarily
//import "react-datetime/css/react-datetime.css";

// Bootstrap
//import 'bootstrap/dist/css/bootstrap.min.css';

// App
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <ConfigProvider locale={locale}>
            <App />
          </ConfigProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
