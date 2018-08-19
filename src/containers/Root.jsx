import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Signup from './Signup';
import Places from './Places';
import NotFound from '../components/NotFound';
import fetchUserData from '../actions/user';
import { saveReturnTo } from '../actions/url';
import { addBar } from '../actions/bar';
import { defaultLocation } from '../util/locations';
import Modals from './Modals';

class Root extends Component {
  componentDidMount = () => {
    const approvedReturnPath = ['places'];
    const { dispatch, history } = this.props;
    this.unlisten = history.listen((location) => {
      const { pathname, search } = location;
      for (let i = 0; i < approvedReturnPath.length; i++) {
        if (pathname === `/${approvedReturnPath[i]}`) {
          dispatch(saveReturnTo(`${pathname}${search}`));
          break;
        }
      }
    });
    const canHover = !(matchMedia('(hover: none)').matches);
    if (canHover) {
      document.body.classList.add('can-hover');
    }
    dispatch(fetchUserData());
  }

  componentWillUnmount = () => {
    this.unlisten();
  }

  render() {
    const {
      store, history, persistor, dispatch,
    } = this.props;
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
        >
          <ConnectedRouter history={history}>
            <React.Fragment>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Redirect to={`/places?loc=${defaultLocation.address}&bar=show`} />
                  )}
                />
                <Route
                  path="/signup"
                  render={(props) => {
                    const { authenticated } = store.getState().reducer.user;
                    return authenticated ? (<Redirect to="/return-from-success-login" />)
                      : (<Signup {...props} />);
                  }}
                />
                <Route
                  path="/places"
                  render={(props) => {
                    const { userId } = store.getState().reducer.user;
                    const { guestBar } = store.getState().reducer;
                    if (userId && guestBar != null) {
                      dispatch(addBar(guestBar));
                    }
                    return (<Places {...props} />);
                  }}
                />
                <Route
                  path="/return-from-success-login"
                  render={() => {
                    const { returnPath } = store.getState().reducer;
                    return (<Redirect to={returnPath} />);
                  }}
                />
                <Route component={NotFound} />
              </Switch>
              <Modals />
            </React.Fragment>
          </ConnectedRouter>
        </PersistGate>
      </Provider>

    );
  }
}

export default connect(({ reducer }) => ({ userId: reducer.user.userId }))(Root);

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};
