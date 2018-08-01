import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { signUp } from '../../actions';

export default connect(() => ({}), { signUp })(Signup);
