import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  content: {
    padding: '1rem',
    fontSize: '30px',
    color: 'white',
  },
};

class CardContent extends PureComponent {
  render() {
    const {
      classes, style, className, children, ...props
    } = this.props;
    return (
      <div
        className={`${classes.content} ${className}`}
        style={{ ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(CardContent);

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

CardContent.defaultProps = {
  className: '',
  classes: {},
  style: {},
};
