import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: '1rem',
    '&>*': {
      margin: '0 1rem',
    },
  },
};

class CardActions extends PureComponent {
  render() {
    const {
      classes, style, className, children, ...props
    } = this.props;
    return (
      <div
        className={`${classes.actions} ${className}`}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(CardActions);

CardActions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

CardActions.defaultProps = {
  className: '',
  classes: {},
  style: {},
};
