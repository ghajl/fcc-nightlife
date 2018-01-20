import Header from "../components/Header"
import { connect } from 'react-redux';
import { logOut, savePath } from '../../actions';
const mapStateToProps = ({reducer}) =>({username: reducer.user.username, isAuthenticated: reducer.user.authenticated});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps, { logOut, savePath })(Header);