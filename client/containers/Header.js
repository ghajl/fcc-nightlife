import Header from "../components/Header"
import { connect } from 'react-redux';
import { logOut, toLogIn, toSignUp, openLoginDialog } from '../../actions';
const mapStateToProps = ({reducer}) =>({username: reducer.user.username, isAuthenticated: reducer.user.authenticated});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps, { logOut, toLogIn, toSignUp, openLoginDialog })(Header);