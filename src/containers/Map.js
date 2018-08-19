import { connect } from 'react-redux';
import Map from '../components/Map';

const mapStateToProps = ({ reducer }) => ({ lat: reducer.location.lat, lng: reducer.location.lng });

export default connect(mapStateToProps)(Map);
