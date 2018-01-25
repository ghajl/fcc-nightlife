import PlaceComponent from "../components/PlaceComponent"
import { connect } from 'react-redux';
import { showPlaces, addPlace, removePlace, loginAndAdd, openLoginDialog } from '../../actions';


const currentIsGoing = (barsOfUser, barID) => {
	return ~barsOfUser.indexOf(barID);
}

const mapStateToProps = ({reducer}, {data}) => {
	console.log(data)
	return {
		placeID: data.id,
		photo: data.photoUrl,
		name: data.name,
		address: data.address,
		rating: data.rating,
		usersInBar: data.users,
		isUserGoing: currentIsGoing(reducer.user.userBars, data.id),
		authenticated: reducer.user.authenticated,
		username: reducer.user.username
	}
}




export default connect(mapStateToProps, { showPlaces, addPlace, removePlace, loginAndAdd, openLoginDialog })(PlaceComponent);