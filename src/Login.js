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
			jsresp:this.props.jsresp,
			err:0,
			err_msg:""
		};
		this.setToken=this.setToken.bind(this);
		this.formValidate=this.formValidate.bind(this);
		this.alertGenerate=this.alertGenerate.bind(this);
		this.crossIt=this.crossIt.bind(this);
		this.uncrossIt=this.uncrossIt.bind(this);
		this.processJSON=this.processJSON.bind(this);
	}
	uncrossIt(){
		if(this.state.err==1){
			document.getElementById("alertDiv").style.display="";
		}
	}
	crossIt(){
		document.getElementById("alertDiv").style.display="none";
	}
	alertGenerate(){
		var ret=(<div id="alertDiv"></div>);
		if(this.state.err == 1){
			ret=(
				<div className="w3-panel w3-red w3-display-container" id="alertDiv">
					<span onClick={this.crossIt.bind(this)} className="w3-button w3-red w3-large w3-display-topright">&times;</span>
					<h3>Login Failed!</h3>
					<p>{this.state.err_msg}</p>
				</div>
			);
			
		}
		return ret;
	}
	processJSON(jsobj){
		console.log(jsobj);
		if(jsobj.success == 'false'){
			this.setState({
				err:1,
				err_msg:"Wrong Email or Password!!"
			});
			return;
		}
		else{
			this.setToken(jsobj);
			window.location=('/');
		}
	}
	formValidate(e){
		e.preventDefault();
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/login";
		var full_url=base+req;
		var jsObj={
			"password": document.getElementById('password_').value,
			"email": document.getElementById('email_').value
		};
		var flag=1;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				this.processJSON(result);
			}.bind(this),
			error: function(xhr){
				this.setState({
					err:1,
					err_msg:"Wrong Email or Password!!"
				});
				flag=0;
			}
		});
					
		if(flag==0){
			return;
		}
	}
	setToken(e){
		this.props.setToken2(e);
	}
	render(){
		console.log('render called');
		return(
			<div>
				<Topbar key={1} auth={0} setToken2={this.setToken.bind(this)}/>
				{this.alertGenerate()}
				{this.uncrossIt()}
				<div className="w3-container w3-center">
				  <div className="horizontal-center">
					<div className="w3-twothird w3-card w3-padding-32">
					  <h2 className="barFont">Welcome At MawaBD<br/>Please Sign In</h2>
					  <br/>
					  <br/>
					  <form onSubmit={this.formValidate} >
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Email</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="email_" required/>
							</div>
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Password</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="password_" required/>
							</div>
						  </div>
						  <br/>
						  <div className="w3-bar w3-margin-top">
							<button className="w3-button w3-bar-item w3-blue w3-hover-red w3-round barFont" type="submit">Sign In</button>
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