import Places from "../components/Places"
import { connect } from 'react-redux';
import { showPlaces } from '../../actions';
const mapStateToProps = ({reducer}) =>({message: reducer.user.message});


export default connect(mapStateToProps, { showPlaces })(Places);