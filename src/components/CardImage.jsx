import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  image: {
    objectFit: 'cover',
    display: 'block',
    width: '100%',
  },
};

const CardImage = ({
  classes, style, className, src, alt, ...props
}) => (
  <img
    className={`${classes.image} ${className}`}
    style={{ ...style }}
    src={src}
    alt={alt}
    {...props}
  />
);

export default injectSheet(styles)(CardImage);

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

CardImage.defaultProps = {
  className: '',
  classes: {},
  style: {},
  alt: 'Bar\'s image',
};
