import { connect } from 'react-redux';
import MapComponent from '../components/MapComponent';

const mapStateToProps = ({ reducer }) => ({ lat: reducer.location.lat, lng: reducer.location.lng });

export default connect(mapStateToProps)(MapComponent);
