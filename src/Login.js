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
		this.formValidate=this.formValidate.bind(this);
	}
	formValidate(e){
		e.preventDefault();
		var jsObj={
			"password": document.getElementById('password_').value,
			"email": document.getElementById('email_').value
		};
		// var resJSON;
		// var url = "api/login";
		// var bearer_token='hsduksahuk3rhkjjkadkq32hnejkq23hejq2e';
		// var bearer = 'Bearer '+ bearer_token;
		// fetch(url, {
		// method: 'POST',
		// body:JSON.stringify(jsObj),
		// withCredentials: true,
		// credentials: "same-origin",
		// headers: {
			// 'Authorization': bearer,
			// 'Content-Type': 'application/json'
		// }
		// }).then(
			// (responseJson) => 
			// {
				// resJSON = responseJson;
				// console.log(resJSON);
			// }
		// )
		// .catch(
			// (error) => {
				// console.log('Faced Error '+error);
			// }
		// );
	}
	setToken(e){
		this.props.setToken2(e);
	}
	render(){
		return(
			<div>
				<Topbar key={1} auth={0} setToken2={this.setToken.bind(this)}/>
				<div class="w3-container w3-center">
				  <div class="horizontal-center">
					<div class="w3-twothird w3-card w3-padding-32">
					  <h2 class="barFont">Welcome At MawaBD<br/>Please Sign In</h2>
					  <br/>
					  <br/>
					  <form onSubmit={this.formValidate} >
						  <div class="w3-bar w3-padding-left w3-padding-right">
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Email</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="email_" required/>
							</div>
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Password</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="password_" required/>
							</div>
						  </div>
						  <br/>
						  <div class="w3-bar w3-margin-top">
							<button class="w3-button w3-bar-item w3-blue w3-hover-red w3-round barFont" type="submit">Sign In</button>
						  </div>
						  <br/>
						  <a href="">Forgot Password</a>
					  </form>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
export default Login;