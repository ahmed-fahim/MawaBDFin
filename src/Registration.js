import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';
import { createHashHistory } from 'history';
export const history = createHashHistory();

class Registration extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token,
			jsresp:this.props.jsresp,
			err:0,
			err_msg:"",
			success:0
		};
		this.setToken=this.setToken.bind(this);
		this.formValidate=this.formValidate.bind(this);
		this.alertGenerate=this.alertGenerate.bind(this);
		this.crossIt=this.crossIt.bind(this);
		this.uncrossIt=this.uncrossIt.bind(this);
		this.processJSON=this.processJSON.bind(this);
		this.greenAlert=this.greenAlert.bind(this);
		this.crossG=this.crossG.bind(this);
		this.uncrossG=this.uncrossG.bind(this);
	}

	setToken(e){
		this.props.setToken2(e);
	}
	uncrossIt(){
		if(this.state.err==1){
			document.getElementById("alertDiv").style.display="";
		}
	}
	crossIt(){
		document.getElementById("alertDiv").style.display="none";
	}
	uncrossG(){
		if(this.state.success==1){
			document.getElementById("g_alert").style.display="";
		}
	}
	crossG(){
		document.getElementById("g_alert").style.display="none";
	}
	greenAlert(){
		var ret=(<div id="g_alert"></div>);
		if(this.state.success == 1){
			ret=(
				<div className="w3-panel w3-green w3-display-container" id="g_alert">
					<span onClick={this.crossG.bind(this)} className="w3-button w3-red w3-large w3-display-topright">&times;</span>
					<h3>Registration Successful!</h3>
					<p>{"Please check your provided email inbox to complete registration"}</p>
				</div>
			);
		}
		return ret;
	}
	alertGenerate(){
		var ret=(<div id="alertDiv"></div>);
		if(this.state.err == 1){
			ret=(
				<div className="w3-panel w3-red w3-display-container" id="alertDiv">
					<span onClick={this.crossIt.bind(this)} className="w3-button w3-red w3-large w3-display-topright">&times;</span>
					<h3>Registration Failed!</h3>
					<p className="w3-text-white w3-large">{this.state.err_msg}</p>
				</div>
			);
		}
		return ret;
	}
	processJSON(jsobj){
		//console.log(jsobj);
		if(jsobj.success == 'false'){
			var errorMSG;
			if(jsobj.error.hasOwnProperty('email')){
				errorMSG="Sorry, the email seems to be invalid";
			}
			else if(jsobj.error.hasOwnProperty('c_password')){
				errorMSG="Both passwords must match!!";
			}
			else{
				errorMSG="Sorry, Something Went Wrong or this email is already registered";
			}
			this.setState({
				err:1,
				err_msg:errorMSG,
				success:0
			});
			return;
		}
		else{
			this.setState({
				success:1,
				err:0,
				err_msg:""
			});
		}
	}
	formValidate(e){
		e.preventDefault();
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/register";
		var full_url=base+req;
		
		var jsObj={
			"first_name":			document.getElementById('fname_').value,
			"email":				document.getElementById('email_').value,
			"password":				document.getElementById('pw_').value,
			"c_password":			document.getElementById('pw2_').value,
			"identification":		document.getElementById('idVal_').value,
			"identification_type":	document.getElementById('idType_').value,
			"last_name":			document.getElementById('lname_').value,
			"title":				document.getElementById('title_').value,
			"phone":				document.getElementById('mobile_').value,
			"gender":				document.getElementById('gender_').value
		};
		console.log(jsObj);
		var flag=1;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				//console.log(result);
				this.processJSON(result);
			}.bind(this),
			error: function(xhr){
				this.setState({
					success:0,
					err:1,
					err_msg:"Sorry, Something Went Wrong"
				});
				flag=0;
			}.bind(this)
		});
					
		if(flag==0){
			return;
		}
	}
	render(){
		return(
			<div className="w3-animate-left">
				<Topbar key={5} auth={0} setToken2={this.setToken.bind(this)}/>
				{this.alertGenerate()}
				{this.uncrossIt()}
				{this.greenAlert()}
				{this.uncrossG()}
				<div className="w3-container w3-center w3-transparent">
				  <div className="w3-center">
					<div className="w3-padding-32">
					  <h2 className="barFont">Welcome At MawaBD<br/>Fill in the following form to Sign Up</h2>
					  <br/>
					  <br/>
						<form onSubmit={this.formValidate} className="w3-container w3-padding-32">
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Gender</label> <br/>
							  <select className="w3-select w3-card w3-white " id="gender_" required>
								<option value="" disabled selected>Your Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							  </select>
							</div>        
							<div className="w3-bar-item w3-margin-left">
							  <label className="w3-left barFont">Title</label> <br/>
							  <select className="w3-select w3-card w3-white w3-padding-right" id="title_" required>
								<option value="Mr">Mr</option>
								<option value="Ms">Ms</option>
								<option value="Mrs">Mrs</option>
								<option value="Dr">Dr</option>
							  </select>
							</div>
							<div className="w3-bar-item">
							  <label className="w3-left barFont">First Name</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your First Name" type="text" id="fname_" required/>
							</div>
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Last Name</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Last Name" type="text" id="lname_" required/>
							</div>
						  </div>
						  <br/>
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Email</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="email_" required/>
							</div>
							 <div className="w3-bar-item">
							  <label className="w3-left barFont">Password</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="pw_" required/>
							</div>
							 <div className="w3-bar-item">
							  <label className="w3-left barFont">Re-type Password</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Retype Your Password" type="password" id="pw2_" required/>
							</div>
						  </div>
						  <br/>
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Mobile Number</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="+880-1xxxxxxxxx" type="text" id="mobile_" required/>
							</div>
							 <div className="w3-bar-item">
							  <label className="w3-left barFont">Identification Type</label> <br/>
							  <select className="w3-select w3-card w3-white w3-padding-right" id="idType_" required>
								<option value="" disabled selected>Choose Identification Type</option>
								<option value="NID">National ID</option>
								<option value="Passport">Passport</option>
							  </select>
							</div>
							 <div className="w3-bar-item">
							  <label className="w3-left barFont">Identification Number</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Number according to chosen ID Type" type="text" id="idVal_" required/>
							</div>
						  </div>
						  <br/> 
						  <div className="w3-bar w3-margin-top">
							<button className="w3-button w3-bar-item w3-blue w3-hover-green w3-round barFont" type="submit">Sign Up</button>
						  </div>
						</form>
						  <br/>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
export default Registration;