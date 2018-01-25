import Places from "../components/Places"
import { connect } from 'react-redux';
import { showPlaces, setHeight } from '../../actions';
const mapStateToProps = ({reducer}) =>({bars: reducer.user.bars });


export default connect(mapStateToProps, { showPlaces, setHeight })(Places);