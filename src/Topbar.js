import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';

import { createHashHistory } from 'history';
export const history = createHashHistory();

class Topbar extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth
		};
		this.setToken=this.setToken.bind(this);
		this.render_bar = this.render_bar.bind(this);
	}
	setToken(e){
		this.props.setToken2(e);
	}
	render_bar(){
		var rightSide;
		if(this.state.auth==0){
			rightSide=(
				<div className="w3-right w3-hide-small w3-margin-top">
					<Link className="w3-button w3-ripple w3-bar-item barFont w3-xlarge" to={'/login'} >{'Sign In'} </Link> 
					<Link className="w3-button w3-ripple w3-bar-item barFont w3-margin-right w3-xlarge" to={'/registration'} >{'Sign Up'} </Link> 
				</div>
			);
		}
		else if(this.state.auth==1){
			rightSide=(
				<div className="w3-right w3-hide-small w3-margin-top">
					<Link className="w3-button w3-ripple w3-bar-item barFont w3-xlarge" to={'/myflights'} >{'My Flights'} </Link> 
					<Link className="w3-button w3-ripple w3-bar-item barFont w3-margin-right w3-xlarge" to={'/logout'} >{'Sign Out'} </Link> 
				</div>
			);
		}
		var outer=(
			<div className="w3-bar w3-black w3-border-bottom w3-xlarge">
				<Link className="w3-bar-item w3-button w3-text-red w3-hover-red logoFont w3-xxlarge" to={'/'} > <i className="fa fa-map-marker w3-margin-right"></i>{'MawaBD'}</Link>
				{rightSide}
			</div>
		);
		return outer;
	}
	render(){
		return(
			<div>
			{this.render_bar()}
			</div>
		);
	}
}

export default Topbar;