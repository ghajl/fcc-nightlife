import Signup from "../components/Signup"
import { connect } from 'react-redux';
import { signUp } from '../../actions';
const mapStateToProps = ({reducer}) =>({isWaiting: reducer.user.isWaiting, message: reducer.user.message});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps, { signUp })(Signup);