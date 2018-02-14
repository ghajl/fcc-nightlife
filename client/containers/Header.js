import Header from "../components/Header"
import { connect } from 'react-redux';
import { logOut, toSignUp, openLoginDialog } from '../../actions';
const mapStateToProps = ({reducer}) =>({username: reducer.user.username, isAuthenticated: reducer.user.authenticated});

export default connect(mapStateToProps, { logOut, toSignUp, openLoginDialog })(Header);