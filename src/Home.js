import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';
import FlightSearch from './FlightSearch';


import { createHashHistory } from 'history';
export const history = createHashHistory();


class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token,
			jsresp:this.props.jsresp
		};
		this.setToken=this.setToken.bind(this);
	}
	setToken(e){
		this.props.setToken2(e);
	}
	render(){
		if(this.state.auth === 0){
			return(
				<div>
					<Topbar key={1} auth={0} setToken2={this.setToken.bind(this)}/>
					<FlightSearch key ={1} auth={0} token="" jsresp={this.state.jsresp}/>
				</div>
			);
		}
		else if(this.state.auth === 1){
			return(
				<div>
					<Topbar key={2} auth={1} setToken2={this.setToken.bind(this)}/>
					<FlightSearch key={2} auth={1} token={this.state.token} jsresp={this.state.jsresp} />
				</div>
			);
		}
	}
}

export default Home;