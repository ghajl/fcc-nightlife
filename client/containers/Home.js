import Home from "../components/Home"
import { connect } from 'react-redux';
import { findPlace, showPlaces } from '../../actions';
const mapStateToProps = ({reducer}) =>({message: reducer.user.message});


export default connect(mapStateToProps, { findPlace, showPlaces })(Home);