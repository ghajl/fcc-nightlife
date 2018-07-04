import Root from './containers/Root';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Places from './containers/Places';
import { Redirect } from 'react-router';
import React from 'react';
import {defaultLocation} from '../../util/locations';
import { connect } from 'react-redux';

export default (store) => {

  const redirectAuth = (props, Component) => {
    console.log(store.getState().user)
    const {authenticated} = store.getState().user;
    return authenticated 
            ? (<Redirect to={'/'}/>) 
            : (<Component  {...props}/>)
  }

  const routes = [
    { component: Root,
      routes: [
        { path: '/',
          exact: true,
          component: () => <Redirect to={`/location?loc=${defaultLocation.address}`} />,
          fetch: 'Root'
        },
        { path: '/location',
          component: (props) => {
            // this.props.saveReturnTo(props.location);
           console.log('h')
            return (<Home {...props}/>)
          },
          fetch: 'location'
        },
        { path: '/places',
          component: Places,
          fetch: 'Places'
        },
        {
          path: '/signup',
          component: (props) => redirectAuth(props, Signup),
          fetch: 'signup'

          
        }
      ]
    }
  ];  
  return routes;
}


