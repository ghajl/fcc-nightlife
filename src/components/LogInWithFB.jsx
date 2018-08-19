import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { basename } from '../../config/app';

const styles = {
  wrapper: {
    padding: '1em',
    display: 'inline-block',
    maxWidth: '100%',
    textAlign: 'center',
  },
  component: {
    display: 'flex',
    height: '24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    display: 'inline-block',
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    padding: '0 5px 0 0',
    color: '#989898',
  },
  item: {
    display: 'inline-block',
    padding: '0 0 0 10px',
    position: 'relative',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  },
  icon: {
    width: '24px',
    height: '24px',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    fill: '#3B5998',
  },
  privacy: {
    paddingTop: 10,
    fontSize: '.8rem',
    textAlign: 'center',
    '& > a': {
      textDecoration: 'underline !important',
      color: 'blue',
    },
  },
};

const LogInWithFB = (props) => {
  const { classes, startFacebookLogin } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.component}>
        <div className={classes.text}>
          SIGN IN WITH
        </div>
        <div className={classes.item}>
          <a href={`${basename}/auth/facebook`} onClick={startFacebookLogin}>
            <svg className={classes.icon}>
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
            </svg>
          </a>
        </div>
      </div>
      <div className={classes.privacy}>
        <a href={`${basename}/privacypolicy`} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default injectSheet(styles)(LogInWithFB);

LogInWithFB.propTypes = {
  classes: PropTypes.shape({
    component: PropTypes.string.isRequired,
    container: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  startFacebookLogin: PropTypes.func.isRequired,
};
