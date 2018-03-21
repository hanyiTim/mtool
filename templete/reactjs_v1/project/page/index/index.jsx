import React,{Component,PropType} from 'react';
import ReactDOM from 'react-dom';

import base from "../../css/base.css";
import style from './index.less';


class App extends Component{
	constructor(props) {
		super(props);
		this.state={
        }
	}
    componentDidMount(){
        var self = this;
    }
    
	render(){
        var self = this;
		return (
            <div>
            </div>
		)
	}
}


ReactDOM.render(<App />,document.getElementById('app'))