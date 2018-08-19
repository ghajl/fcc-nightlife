import { connect } from 'react-redux';
import CardWrapper from '../components/CardWrapper';
import {
  addBar, removeBar, showVisitorsList, highlightPlace,
} from '../actions/bar';
import { openLoginDialog } from '../actions/ui';
import { loginAndAdd } from '../actions/user';

const currentIsGoing = (barsOfUser, barId) => barsOfUser && barsOfUser.indexOf(barId) !== -1;

const mapStateToProps = ({ reducer }, { id }) => (
  {
    isUserGoing: currentIsGoing(reducer.user.bars, id),
    authenticated: reducer.user.authenticated,
    username: reducer.user.username,
  }
);

export default connect(mapStateToProps, {
  addBar, removeBar, loginAndAdd, openLoginDialog, showVisitorsList, highlightPlace,
})(CardWrapper);
