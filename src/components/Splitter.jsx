import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  splitter: {
    height: '3px',
    minHeight: '3px',
    background: 'white',
  },
};

class Splitter extends PureComponent {
  render() {
    const {
      classes, style, className,
    } = this.props;
    return (
      <div className={`${classes.splitter} ${className}`} style={{ ...style }} />
    );
  }
}

export default withStyles(styles)(Splitter);

Splitter.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

Splitter.defaultProps = {
  className: '',
  classes: {},
  style: {},
};
