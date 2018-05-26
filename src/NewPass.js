import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';
import { createHashHistory } from 'history';
export const history = createHashHistory();


class NewPass extends Component{
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
		this.extractToken=this.extractToken.bind(this);
		this.isAlphaNumeric=this.isAlphaNumeric.bind(this);
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
					<h3>New Password Set Status</h3>
					<p className="w3-text-white w3-large">{this.state.err_msg}</p>
				</div>
			);
			
		}
		return ret;
	}
	isAlphaNumeric(inp){
		if((inp >='a' && inp <='z') || (inp >= 'A' && inp <= 'Z') || (inp >= '0' && inp <='9') ){
			return true;
		}
		else{
			return false;
		}
	}
	extractToken(){
		var st=window.location.href;
		var startIndex=st.lastIndexOf("change_password?token=");
		if(startIndex != -1){
			startIndex = startIndex + 22;
			var returnString="";
			while(startIndex < st.length && this.isAlphaNumeric(st[startIndex]) == true){
				returnString = returnString+st[startIndex];
				startIndex++;
			}
			return returnString;
			
		}
	}
	formValidate(e){
		e.preventDefault();
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var tokenString = this.extractToken();
		var req="api/change/password";
		var full_url=base+req;
		var jsObj={
			"password": document.getElementById('pw_').value,
			"c_password" : document.getElementById('pw2_').value,
			"token":tokenString
		};
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				console.log(result);
				if(result.success=="true"){
					this.setState({
						err:1,
						err_msg:"Password Successfully Changed"
					});					
				}
				else{
					this.setState({
						err:1,
						err_msg:"Something Went Wrong, please try again!!"
					});					
				}

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
		return(
			<div>
				<Topbar key={51} auth={0} setToken2={this.setToken.bind(this)}/>
				{this.alertGenerate()}
				{this.uncrossIt()}
				<div className="w3-indigo w3-container w3-center">
				  <div className="w3-center">
					<div className="w3-padding-32">
					  <h2 className="barFont">{"Setup your new password"} </h2>
					  <br/>
					  <br/>
					  <form onSubmit={this.formValidate} className="w3-container w3-padding-32">
						  <div className="w3-bar w3-padding-left w3-padding-right">
							<div className="w3-bar-item">
							  <label className="w3-left barFont">New Password</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Your New Password" type="password" id="pw" required/>
							</div>
							<div className="w3-bar-item">
							  <label className="w3-left barFont">Confirm New Password</label> <br/>
							  <input className="w3-input w3-card w3-white" placeholder="Please type the same password again" type="password" id="pw2_" required/>
							</div>
						  </div>
						  <br/>
						  <div className="w3-bar w3-margin-top">
							<button className="w3-button w3-bar-item w3-blue w3-hover-red w3-round barFont" type="submit">Set New Password</button>
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
export default NewPass;