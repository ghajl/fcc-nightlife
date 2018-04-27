import SearchForm from "../components/SearchForm"
import { connect } from 'react-redux';
import { setLocation, setPlacesLocation } from '../../actions';

export default connect(() => ({}), { setLocation, setPlacesLocation })(SearchForm);