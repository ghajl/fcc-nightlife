import { connect } from 'react-redux';
import MapComponent from '../components/MapComponent';

const mapStateToProps = ({ reducer }) => ({ lat: reducer.user.lat, lng: reducer.user.lng });

export default connect(mapStateToProps)(MapComponent);
