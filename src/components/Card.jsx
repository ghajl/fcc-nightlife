import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    position: 'relative',
    cursor: 'pointer',
    // overflow: 'hidden',
  },
});

class Card extends Component {
  cardRef = React.createRef();

  componentDidMount = () => {
    const { createCardRef, id } = this.props;
    createCardRef(id, this.cardRef.current);
  }

  render() {
    const {
      classes, style, className, children, ...props
    } = this.props;
    return (
      <div
        ref={this.cardRef}
        className={`${classes.card} ${className}`}
        style={{ ...style }}
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
  createCardRef: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Card.defaultProps = {
  className: '',
  classes: {},
  style: {},
};
