import Signup from "../components/Signup"
import { connect } from 'react-redux';
import { signUp } from '../../actions';

export default connect(() => ({}), { signUp })(Signup);