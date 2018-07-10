import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

const styles = {
  app: {
    display: 'flex',
    'flex-direction': 'column',
    height: '100%',
  },
  content: {
    flex: '1 0 auto',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
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
  classes: PropTypes.shape({
    app: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired,
};
