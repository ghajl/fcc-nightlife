import Header from "../components/Header"
import { connect } from 'react-redux';
import { 
  logOut, 
  toSignUp, 
  openLoginDialog, 
  openLoginMenu, 
  closeLoginMenu 
} from '../../actions';

const mapStateToProps = ({reducer}) =>(
  {
    username: reducer.user.username, 
    facebookProfile: reducer.user.facebookProfile, 
    isAuthenticated: reducer.user.authenticated, 
    loginMenuOpen: reducer.user.loginMenuOpen
  }
);

export default connect(mapStateToProps, { logOut, toSignUp, openLoginDialog, openLoginMenu, closeLoginMenu })(Header);