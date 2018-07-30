import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Home from './Home';
import Signup from './Signup';
import Places from './Places';
import NotFound from '../components/NotFound';
import { fetchUserData, saveReturnTo, addToList } from '../../actions';
import { defaultLocation } from '../../util/locations';
import Modals from './Modals';

class Root extends Component {
  componentDidMount = () => {
    this.props.fetchUserData();
  }

  render() {
    const {
      store, history, persistor, classes,
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
                    <Redirect to={`/location?loc=${defaultLocation.address}`} />
                  )}
                />
                <Route
                  path="/location"
                  render={(props) => {
                    this.props.saveReturnTo(props.location);
                    return (<Home {...props}/>);
                  }}
                />
                <Route
                  path="/signup"
                  render={(props) => {
                    const { authenticated } = store.getState().reducer.user;
                    return authenticated ? (<Redirect to="/" />)
                      : (<Signup {...props} />);
                  }}
                />
                <Route
                  path="/places"
                  render={(props) => {
                    this.props.saveReturnTo(props.location);
                    const { guestBar, userID } = store.getState().reducer.user;
                    if (userID && guestBar != null) {
                      this.props.addToList(guestBar);
                    }
                    return (<Places {...props} />);
                  }}
                />
                <Route
                  path="/return-from-success-login"
                  render={() => {
                    const { returnPath } = store.getState().reducer.user;
                    return (<Redirect to={returnPath} />)
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

export default connect(({ reducer }) => ({ userID: reducer.user.userID }), { fetchUserData, saveReturnTo, addToList })(Root);
