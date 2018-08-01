import { connect } from 'react-redux';
import LogInWithFB from '../components/LogInWithFB';
import { startFacebookLogin } from '../../actions';

export default connect(() => ({}), { startFacebookLogin })(LogInWithFB);
