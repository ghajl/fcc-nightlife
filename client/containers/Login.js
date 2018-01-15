import Login from "../components/Login"
import { connect } from 'react-redux';
import { manualLogin } from '../../actions';
const mapStateToProps = ({reducer}) =>({isWaiting: reducer.user.isWaiting, message: reducer.user.message});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps, { manualLogin })(Login);