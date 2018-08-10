import { connect } from 'react-redux';
import PlaceComponent from '../components/PlaceComponent';
import {
  addToVisitorsList, removeFromVisitorsList,
} from '../actions/bar';
import { openLoginDialog } from '../actions/ui';
import { loginAndAdd } from '../actions/user';

const currentIsGoing = (barsOfUser, barID) => {
  console.log(barsOfUser)
  console.log(barID)
  return barsOfUser.indexOf(barID) !== -1;
}

const isHighlighted = (barID, highlightedID) => barID === highlightedID;

const mapStateToProps = ({ reducer }, { data }) => (
  {
    barID: data.id,
    photo: data.photoUrl,
    name: data.name,
    address: data.address,
    rating: data.rating,
    visitorsCount: data.visitorsCount,
    facebookUsersInBar: data.facebookUsers,
    isUserGoing: currentIsGoing(reducer.user.bars, data.id),
    authenticated: reducer.user.authenticated,
    username: reducer.user.username,
    isHighlighted: isHighlighted(data.id, reducer.bar.highlighted),
  }
);

export default connect(mapStateToProps, {
  addToVisitorsList, removeFromVisitorsList, loginAndAdd, openLoginDialog,
})(PlaceComponent);
