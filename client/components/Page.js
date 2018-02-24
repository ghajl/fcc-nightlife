import React from 'react';
import Header from '../containers/Header';


export default (props) => {
	return (
	    <React.Fragment>
	    <Header 
        	path={props.location}
    	/>
		    {props.children}
	    </React.Fragment>
    )
}