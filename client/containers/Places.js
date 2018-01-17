import Places from "../components/Places"
import { connect } from 'react-redux';
import { showPlaces, setHeight } from '../../actions';
const mapStateToProps = ({reducer}) =>({bars: reducer.user.bars, height: reducer.user.height});


export default connect(mapStateToProps, { showPlaces, setHeight })(Places);