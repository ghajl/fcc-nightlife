import { connect } from 'react-redux';
import Header from '../components/Header';
import { logOut, closeBasket } from '../actions/user';
import {
  toSignUp,
  openLoginDialog,
  openLoginMenu,
  closeLoginMenu,
} from '../actions/ui';
import { removeBar } from '../actions/bar';

const mapStateToProps = ({ reducer }) => (
  {
    username: reducer.user.username,
    userBarsCount: (reducer.user.bars && reducer.user.bars.length) || 0,
    facebookProfile: reducer.user.facebookProfile,
    isAuthenticated: reducer.user.authenticated,
    loginMenuOpen: reducer.loginMenuOpen,
    basketOpen: reducer.basketDialogOpen,
    basketList: reducer.user.basket,
  }
);

export default connect(mapStateToProps, {
  logOut, toSignUp, openLoginDialog, openLoginMenu, closeLoginMenu, closeBasket, removeBar,
})(Header);
