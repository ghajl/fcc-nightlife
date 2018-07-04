import SearchForm from "../components/SearchForm"
import { connect } from 'react-redux';
import { showPlaces, setLocation, setPlacesLocation } from '../../actions';

export default connect(() => ({}), { showPlaces, setLocation, setPlacesLocation })(SearchForm);