import Footer from "../components/Footer"
import { connect } from 'react-redux';
import { footerHeight, headerHeight } from '../../actions';

// let arr = new Array(1);
// let x = 2
// if(x == 2){
// 	x = 3;
// 	console.log(2)
// } else if (x == 3){
// 	console.log(3)
// }
// arr.push(1, 2, 3);
// alert(arr);

export default connect(() => ({}),	{ footerHeight, headerHeight })(Footer);