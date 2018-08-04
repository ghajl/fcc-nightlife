import { connect } from 'react-redux';
import PlaceComponent from '../components/PlaceComponent';
import {
  addToVisitorsList, removeFromVisitorsList, loginAndAdd, openLoginDialog,
} from '../../actions';

const currentIsGoing = (barsOfUser, barID) => barsOfUser.indexOf(barID) !== -1;

const isHighlighted = (placeID, highlightedID) => placeID === highlightedID;

const mapStateToProps = ({ reducer }, { data }) => (
  {
    placeID: data.id,
    photo: data.photoUrl,
    name: data.name,
    address: data.address,
    rating: data.rating,
    usersInBar: data.users,
    facebookUsersInBar: data.facebookUsers,
    isUserGoing: currentIsGoing(reducer.user.userBars, data.id),
    authenticated: reducer.user.authenticated,
    username: reducer.user.username,
    isHighlighted: isHighlighted(data.id, reducer.bar.highlighted),
  }
);

export default connect(mapStateToProps, {
  addToVisitorsList, removeFromVisitorsList, loginAndAdd, openLoginDialog,
})(PlaceComponent);
