import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const drawStar = (canvas, radius, color, fillPercent) => {
  const ctx = canvas.getContext('2d');
  const outerRadius = radius;
  const innerRadius = radius / 2.3;
  const cx = radius;
  const cy = radius;
  const spikes = 5;
  let rot = Math.PI / 2 * 3;
  let x = radius;
  let y = radius;
  const step = Math.PI / 5;
  const lineWidth = radius / 3.5;
  const indent = lineWidth * 1.5;
  const innerArea = radius * 2 - (indent * 2);
  const fillRight = indent + innerArea * fillPercent;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, fillRight, 60);

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.fill();
};

const styles = {
  star: {
    display: 'inline-block',
    width: props => `${props.width}px`,
    height: props => `${props.width}px`,
  },
};

class Star extends React.Component {
  starRef = React.createRef();

  componentDidMount = () => {
    const { width, color, percent } = this.props;
    const radius = width / 2;
    this.starRef.current.width = width;
    this.starRef.current.height = width;
    drawStar(this.starRef.current, radius, color, percent);
  }

  render() {
    const {
      classes, className, style, ...props
    } = this.props;
    return (
      <canvas
        className={`${classes.star} ${className}`}
        ref={this.starRef}
        style={{ ...style }}
        {...props}
      >
        Star
      </canvas>
    );
  }
}

export default injectSheet(styles)(Star);

Star.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({}),
  width: PropTypes.string,
  color: PropTypes.string,
  percent: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

Star.defaultProps = {
  className: '',
  classes: {},
  style: {},
  width: '10',
  color: '#000',
  percent: 1,
};
