import React from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

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
  }
}

const Page = (props) => {
  return (
    <div className={props.classes.app}>
      <Header 
        path={props.location}
      />
      <div className={props.classes.content}>
        {props.children}
      </div>    
      <Footer />
    </div>
  )
}

export default injectSheet(styles)(Page);