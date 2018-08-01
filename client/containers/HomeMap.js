import { connect } from 'react-redux';
import HomeMap from '../components/HomeMap';

const mapStateToProps = ({ reducer }) => ({ lat: reducer.user.lat, lng: reducer.user.lng });

export default connect(mapStateToProps)(HomeMap);
