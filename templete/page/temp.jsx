/**
 *
 *
 *
 * 
 */


import React,{Component,PropTypes}from 'react';
import {render} from  'react-dom';
import '$name.less';

class App extends Component{
	constructor(props){
		super(props);
		this.state={
		}
	}
	componentDidMount() {
	}
	render() {
		return (
			<div>
			</div>
		)
	}
}

render(
	<App />,
	document.getElementById('page_$name')
)