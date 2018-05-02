import LogInWithFB from "../components/LogInWithFB"
import { connect } from 'react-redux';
import { startFacebookLogin } from '../../actions';

export default connect(() => ({}), { startFacebookLogin })(LogInWithFB);