import MapComponent from "../components/MapComponent"
import { connect } from 'react-redux';

const mapStateToProps = ({reducer}) =>({lat: reducer.user.lat, lng: reducer.user.lng });


export default connect(mapStateToProps)(MapComponent);