import PlaceComponent from "../components/PlaceComponent"
import { connect } from 'react-redux';
import { showPlaces, addPlace } from '../../actions';
const mapStateToProps = ({reducer}) =>({authenticated: reducer.user.authenticated, username: reducer.user.username });


export default connect(mapStateToProps, { showPlaces, addPlace })(PlaceComponent);