import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';
import { createHashHistory } from 'history';
export const history = createHashHistory();


class Login extends Component{
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
		return(
			<div>
				<Topbar key={3} auth={0} setToken2={this.setToken.bind(this)}/>
				<div class="w3-container w3-center w3-black">
				  <div class="horizontal-center">
					<div class="w3-twothird w3-card w3-red w3-padding-32">
					  <h2 class="barFont">Welcome At MawaBD<br/>Please Sign In</h2>
					  <br/>
					  <br/>
					  <div class="w3-bar w3-padding-left w3-padding-right">
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Email</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="emailField" required/>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Password</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="passwordField" required/>
						</div>
					  </div>
					  <br/>
					  <div class="w3-bar w3-margin-top">
						<button class="w3-button w3-bar-item w3-cyan w3-round barFont">Sign In</button>
					  </div>
					  <br/>
					  <a href="">Forgot Password</a>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
export default Login;