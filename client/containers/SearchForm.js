import SearchForm from "../components/SearchForm"
import { connect } from 'react-redux';
import { findPlace, showPlaces } from '../../actions';
const mapStateToProps = ({reducer}) =>({location: reducer.user.location});


export default connect(mapStateToProps, { findPlace, showPlaces })(SearchForm);