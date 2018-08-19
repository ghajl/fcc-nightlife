import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#193150',
    position: 'relative',
    fontFamily: 'Poiret One, cursive',
  },
};

class Card extends PureComponent {
  render() {
    const {
      classes, style, className, children, src, ...props
    } = this.props;
    const imgStyle = src
      ? {
        backgroundImage: `url(${src})`,
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '15rem',
      }
      : {};
    return (
      <div
        className={`${classes.card} ${className}`}
        style={{ ...imgStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Card);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
  src: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
  src: '',
  classes: {},
  style: {},
};
