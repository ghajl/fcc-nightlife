import { connect } from 'react-redux';
import HomeMap from '../components/HomeMap';

const mapStateToProps = ({ reducer }) => ({ lat: reducer.location.lat, lng: reducer.location.lng });

export default connect(mapStateToProps)(HomeMap);
