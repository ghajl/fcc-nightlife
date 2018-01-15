import Home from "../components/Home"
import { connect } from 'react-redux';
const mapStateToProps = ({reducer}) =>({username: reducer.user.username, message: reducer.user.message});


// {
//   return {
//     user
//   };
// }


export default connect(mapStateToProps)(Home);