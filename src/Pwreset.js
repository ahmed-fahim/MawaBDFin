import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';
import { createHashHistory } from 'history';
export const history = createHashHistory();


class Pwreset extends Component{
	constructor(props){
		super(props);
		this.state={
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
					<h3>Password Reset Request</h3>
					<p className="w3-text-white w3-large">{this.state.err_msg}</p>
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
		var req="api/reset";
		var full_url=base+req;
		var jsObj={
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
				console.log(result);
				this.setState({
					err:1,
					err_msg:result.message
				});
			}.bind(this),
			error: function(xhr){
				console.log(xhr);
				this.setState({
					err:1,
					err_msg:"Something Went Wrong, please try again!!"
				});
			}.bind(this)
		});
	}
	setToken(e){
		this.props.setToken2(e);
	}
	render(){
		//console.log('render called');
		return(
			<div className="w3-animate-left">
				<Topbar key={49} auth={0} setToken2={this.setToken.bind(this)}/>
				{this.alertGenerate()}
				{this.uncrossIt()}
				<div className="w3-transparent w3-container w3-center">
				  <div className="w3-center">
					<div className="w3-padding-32">
					  <h2 className="barFont">Enter your Email Address <br/> to Reset Your Password</h2>
					  <br/>
					  <br/>
					  <form onSubmit={this.formValidate} className="w3-container w3-padding-32">
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Email</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="email_" required/>
							</div>
						  </div>
						  <br/>
						  <div className="w3-bar w3-margin-top">
							<button className="w3-button w3-bar-item w3-blue w3-hover-red w3-round barFont" type="submit">Reset Password</button>
						  </div>
						  <br/>
					  </form>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
export default Pwreset;