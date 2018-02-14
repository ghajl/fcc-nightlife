import PlaceComponent from "../components/PlaceComponent"
import { connect } from 'react-redux';
import { showPlaces, addToList, removeFromList, loginAndAdd, openLoginDialog } from '../../actions';


const currentIsGoing = (barsOfUser, barID) => {
	return ~barsOfUser.indexOf(barID);
}

const isHighlighted = (placeID, highlightedID) => {
	return placeID == highlightedID;
}

const mapStateToProps = ({reducer}, {data}) => {
	return {
		placeID: data.id,
		photo: data.photoUrl,
		name: data.name,
		address: data.address,
		rating: data.rating,
		usersInBar: data.users,
		isUserGoing: currentIsGoing(reducer.user.userBars, data.id),
		authenticated: reducer.user.authenticated,
		username: reducer.user.username,
		isHighlighted: isHighlighted(data.id, reducer.user.highlighted)
	}
}




export default connect(mapStateToProps, { showPlaces, addToList, removeFromList, loginAndAdd, openLoginDialog })(PlaceComponent);