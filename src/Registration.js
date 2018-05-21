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
			err_msg:""
		};
		this.setToken=this.setToken.bind(this);
		this.formValidate=this.formValidate.bind(this);
		this.alertGenerate=this.alertGenerate.bind(this);
		this.crossIt=this.crossIt.bind(this);
	}
	formValidate(e){
		e.preventDefault();
	}
	setToken(e){
		this.props.setToken2(e);
	}
	crossIt(){
		document.getElementById("alertDiv").style.display="none";
	}
	alertGenerate(){
		var ret=(<div></div>);
		if(this.state.err == 1){
			ret=(
				<div className="w3-panel w3-red w3-display-container" id="alertDiv">
					<span onClick={this.crossIt.bind(this)} className="w3-button w3-red w3-large w3-display-topright">&times;</span>
					<h3>Registration Failed!</h3>
					<p>{this.state.err_msg}</p>
				</div>
			);
		}
		return ret;
	}
	render(){
		return(
			<div>
				<Topbar key={5} auth={0} setToken2={this.setToken.bind(this)}/>
				{this.alertGenerate()}
				<div class="w3-container w3-center w3-black">
				  <div class="horizontal-center">
					<div class="w3-twothird w3-card w3-padding-32">
					  <h2 class="barFont">Welcome At MawaBD<br/>Fill in the following form to Sign Up</h2>
					  <br/>
					  <br/>
						<form onSubmit={this.formValidate}>
						  <div class="w3-bar w3-padding-left w3-padding-right">
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Gender</label> <br/>
							  <select class="w3-select w3-card w3-white " id="gender_" required>
								<option value="" disabled selected>Your Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							  </select>
							</div>        
							<div class="w3-bar-item w3-margin-left">
							  <label class="w3-left barFont">Title</label> <br/>
							  <select class="w3-select w3-card w3-white w3-padding-right" id="title_" required>
								<option value="Mr">Mr</option>
								<option value="Ms">Ms</option>
								<option value="Mrs">Mrs</option>
								<option value="Dr">Dr</option>
							  </select>
							</div>
							<div class="w3-bar-item">
							  <label class="w3-left barFont">First Name</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your First Name" type="text" id="fname_" required/>
							</div>
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Last Name</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your Last Name" type="text" id="lname_" required/>
							</div>
						  </div>
						  <br/>
						  <div class="w3-bar w3-padding-left w3-padding-right">
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Email</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="email_" required/>
							</div>
							 <div class="w3-bar-item">
							  <label class="w3-left barFont">Password</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="pw_" required/>
							</div>
							 <div class="w3-bar-item">
							  <label class="w3-left barFont">Re-type Password</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Retype Your Password" type="password" id="pw2_" required/>
							</div>
						  </div>
						  <br/>
						  <div class="w3-bar w3-padding-left w3-padding-right">
							<div class="w3-bar-item">
							  <label class="w3-left barFont">Mobile Number</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="+880-1xxxxxxxxx" type="text" id="mobile_" required/>
							</div>
							 <div class="w3-bar-item">
							  <label class="w3-left barFont">Identification Type</label> <br/>
							  <select class="w3-select w3-card w3-white w3-padding-right" id="idType_" required>
								<option value="" disabled selected>Choose Identification Type</option>
								<option value="NID">National ID</option>
								<option value="Passport">Passport</option>
							  </select>
							</div>
							 <div class="w3-bar-item">
							  <label class="w3-left barFont">Identification Number</label> <br/>
							  <input class="w3-input w3-card w3-white" placeholder="Number according to chosen ID Type" type="text" id="idVal_" required/>
							</div>
						  </div>
						  <br/> 
						  <div class="w3-bar w3-margin-top">
							<button class="w3-button w3-bar-item w3-blue w3-hover-green w3-round barFont" type="submit">Sign Up</button>
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