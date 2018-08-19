import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  container: {
    position: 'relative',
    minWidth: 100,
    minHeight: 100,
    background: '#333',
  },
  image: {
    objectFit: 'contain',
    display: 'block',
    maxWidth: '100%',
    border: '1px solid #ddd',
    borderRadius: '3px',
    padding: '3px',
    boxShadow: '10px 10px 3px #000',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

class CardImage extends PureComponent {
  state = {
    loading: true,
  }

  onLoad = () => {
    this.setState({ loading: false });
  }

  render() {
    const {
      classes, style, className, src, alt, ...props
    } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.container}>
        <img
          className={`${classes.image} ${className}`}
          style={{ ...style }}
          src={src}
          alt={alt}
          onLoad={this.onLoad}
          {...props}
        />
        {loading && <CircularProgress size={30} className={classes.loading} />}
      </div>
    );
  }
}

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
