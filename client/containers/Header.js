import Header from "../components/Header"
import { connect } from 'react-redux';
import { logOut } from '../../actions';
const mapStateToProps = ({reducer}) =>({isAuthenticated: reducer.user.authenticated});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps, { logOut })(Header);