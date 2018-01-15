import React from 'react'
import Header from '../containers/Header'
const Home = (props) => {
	console.log(props);
	return (
  <div>
  	<Header />
  	<div style={{marginTop:80}}>Hello {props.username}!</div>
  </div>
)
}
export default Home