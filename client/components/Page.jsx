import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import Footer from './Footer';

const styles = {
  '@global': {
    html: {
      background: 'white',
      height: '100%',
      fontSize: '14px',
    },
    a: {
      textDecoration: 'none !important',
      outline: 'none',
    },
    body: {
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },

    'body > div:first-child': {
      height: '100%',
      flex: '1 0 auto',
    },
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
  },
  app: {
    display: 'flex',
    'flex-direction': 'column',
    height: '100%',
  },
  content: {
    flex: '1 1 auto',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    '@media (max-width: 640px)': {
      flexShrink: 0,
    },
  },
};

const Page = ({ classes, location, children }) => (
  <div className={classes.app}>
    <Header
      path={location}
    />
    <div className={classes.content}>
      {children}
    </div>
    <Footer />
  </div>
);

export default injectSheet(styles)(Page);

Page.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
};
