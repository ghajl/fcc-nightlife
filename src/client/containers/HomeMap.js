import HomeMap from "../components/HomeMap"
import { connect } from 'react-redux';

const mapStateToProps = (reducer) =>({lat: reducer.user.lat, lng: reducer.user.lng});


export default connect(mapStateToProps)(HomeMap);