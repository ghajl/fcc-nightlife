import Footer from "../components/Footer"
import { connect } from 'react-redux';
import { footerHeight, headerHeight } from '../../actions';


export default connect(() => ({}),	{ footerHeight, headerHeight })(Footer);