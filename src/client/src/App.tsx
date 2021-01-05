import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchOptionsStart } from './redux/Option/option.actions';

// Hoc
import WithAdminAuth from './hoc/WithAdminAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Components
import Toolbar from './components/Toolbar';

// Styles
import './assets/sass/app.scss';

const App: React.FC = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOptionsStart());
  }, []);

  return (
    <div id='App'>
      <Toolbar />
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <MainLayout>
              <Homepage />
            </MainLayout>
          )}
        />

        <Route
          path='/logg_inn'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />

        <Route
          path='/registrer'
          render={() => (
            <MainLayout>
              <Register />
            </MainLayout>
          )}
        />

        <Route
          path='/admin'
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
