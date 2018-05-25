import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';



import { createHashHistory } from 'history';
export const history = createHashHistory();


class Myflight extends Component{

	constructor(props){
		super(props);
		this.state={
			token:this.props.token,
			auth:this.props.auth,
			jsresp:this.props.jsresp,
			prLoad:0,
			jsp:[],
			fLoad:0,
			flights:[]
		}
		this.setToken=this.setToken.bind(this);
		this.loadProfile=this.loadProfile.bind(this);
		this.loadFlights=this.loadFlights.bind(this);
		this.updateProfile=this.updateProfile.bind(this);
		this.setLogout=this.setLogout.bind(this);
		this.formatDate=this.formatDate.bind(this);
		this.formatDate2=this.formatDate2.bind(this);
		this.renderGender=this.renderGender.bind(this);
		this.renderFlightDetails=this.renderFlightDetails.bind(this);
	}
	renderFlightDetails(){
		var eachItem=[];
		if(this.state.flights.length===0){
			return(<div></div>);
		}
		
		var ln=this.state.flights.length;
		for(var i=0; i<ln;i++){
			var jsObj=this.state.flights[i];
			if(jsObj !== undefined){
				var paybtn=(<div></div>);
				if(jsObj.status == "pending"){
					paybtn=(<p> <button class="w3-button w3-round w3-green w3-padding">{"Payment Portal"} </button></p>);
				}
				
				eachItem.push(
					<div class="w3-container w3-bottombar w3-border-indigo">
					  <h5 class="w3-opacity"><b>{jsObj.departure_date+" | "+jsObj.trip_type}</b></h5>
					  <h6 class="w3-text-teal"><i class="fa fa-credit-card fa-fw w3-margin-right"></i>{"Adjusted Amount: " + jsObj.adjusted_amount + " BDT"} - <span class="w3-tag w3-teal w3-round">{jsObj.status}</span></h6>
					  <h6 class="w3-text-teal"><i class="fa fa-calender fa-fw w3-margin-right"></i>{"Departure Date: " + jsObj.departure_date}</h6>
					  <h6 class="w3-text-teal"><i class="fa fa-calender fa-fw w3-margin-right"></i>{"Return Date:"+ ((jsObj.trip_type=="one-way") ? "Not Requested":jsObj.return_date)}</h6>
				      {paybtn}
					  <hr/>
					</div>					
				);
			}
			
		}
		return eachItem;
		
	}
	setLogout(){
		this.props.setlogOut();
	}
	setToken(e){
		this.props.setToken2(e);
	}
	formatDate(inp){
		if(inp==""){
			return inp;
		}
		var day=inp.substr(8,2);
		var mon=inp.substr(5,2);
		var year=inp.substr(0,4);
		var ret=year+'/'+mon+'/'+day;
		return ret;
	}
	formatDate2(inp){
		if(inp==""){
			return inp;
		}
		var day=inp.substr(8,2);
		var mon=inp.substr(5,2);
		var year=inp.substr(0,4);
		var ret=year+'-'+mon+'-'+day;
		return ret;		
	}
	loadProfile(){
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/profile";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			dataType:'json',
			crossDomain:'true',
			headers:{
				"Accept" : 'application/json',
				"Authorization" : 'Bearer '+this.state.token
			},
			success: function(result, status, XHR){
				console.log(result);
				this.setState({
					prLoad:1,
					jsp:result.customer,
					jsresp:result.user
				});
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
				this.setLogout();
				window.location = ('/login');
			}.bind(this)
		});
	}
	loadFlights(){
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/search/booking/by/user";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			dataType:'json',
			crossDomain:'true',
			headers:{
				"Accept" : 'application/json',
				"Authorization" : 'Bearer '+this.state.token
			},
			success: function(result, status, XHR){
				console.log(result);
				if(result.success=="true"){
					this.setState({
						fLoad:1,
						flights:result.result
					});					
				}
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
				this.setLogout();
				window.location = ('/login');
			}.bind(this)
		});	
	}
	renderGender(){
		var curgender=this.state.jsresp.gender;
		if(curgender !== undefined && curgender != ""){curgender=curgender.toLowerCase();}
		// curgender=curgender.toString();
		// curgender=curgender.toLowerCase();
		if(curgender == "male"){
			return(
				<select id="gender_" class="w3-select w3-transparent w3-text-black" >
					<option class="w3-text-black" value="Male">Male</option>
					<option class="w3-text-black" value="Female">Female</option>
				</select> 
			);
		}
		else{
			return(
				<select id="gender_" class="w3-select w3-transparent w3-text-black" >
					<option class="w3-text-black" value="Female">Female</option>
					<option class="w3-text-black" value="Male">Male</option>
				</select> 			
			);
		}
	}
	updateProfile(e){
		e.preventDefault();
	}
	render(){
		if(this.state.prLoad==0){
			this.loadProfile();
		}
		if(this.state.fLoad == 0){
			this.loadFlights();
		}
		
		const widthCSS={
			maxWidth: "2400px"
		};
		return(
		<div>
			<Topbar key={63} auth={1} setToken2={this.setToken.bind(this)}/> 
			<div class="w3-content w3-margin-top" style={widthCSS}>
			  <div class="w3-row-padding">
				
				<div class="w3-third">
					<form onSubmit={this.updateProfile} class="w3-container">
					<div class="w3-indigo w3-text-white w3-card-4">
						<div class="w3-container">
						  <h2 class="w3-text-black w3-xlarge"> <b>{this.state.jsresp.title +" "+this.state.jsresp.first_name+" "+this.state.jsresp.last_name}</b></h2>
						  <p><b>{"Email:"}<input class="w3-transparent w3-input w3-text-black" value={this.state.jsresp.email} disabled/></b></p>
						  <p><b>{"Phone:"}<input id="phone_" class="w3-transparent w3-input w3-text-black" value={this.state.jsresp.phone} type="text" placeholder="Your Primary Contact No." required/></b></p>
						  <p><b>{"Alt. Phone:"}<input id="altphone_" class="w3-transparent w3-input w3-text-black" value={this.state.jsp.alternate_phone} type="text" placeholder="Your Alternate Contact No."/></b></p>
						  <p><b>{"Credit Allowance"}<input class="w3-transparent w3-input w3-text-black" value={this.state.jsp.credit_allowance} placeholder="Your Current Credit Allowance is 0" disabled/></b></p>
						  <p><b>{"Credit Currency"}<input class="w3-transparent w3-input w3-text-black" value={this.state.jsp.credit_currency} placeholder="Your Current Credit Currency is 0" disabled/></b></p>
						  <br/>

						  <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Details</b></p>
						  <p>Date Of Birth</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input id="date_of_birth_" class="w3-transparent w3-input w3-text-black" type="date" value={this.formatDate2.bind(this,this.state.jsp.date_of_birth)} /></b></p>
						  </div>		  
						  <p>Gender</p>
						  <div class="w3-padding-left w3-padding-right">
							<b>
								{this.renderGender()}
							</b>
						  </div>
						  <p>City</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input id="city_" type="text" class="w3-transparent w3-input w3-text-black" value={this.state.jsp.city} /></b></p>
						  </div> 
						  <p>Country</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input id="country_" type="text" class="w3-transparent w3-input w3-text-black" value={this.state.jsp.country} /></b></p>
						  </div> 
						  <p>Nationality</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input id="nationality_" type="text" class="w3-transparent w3-input w3-text-black" value={this.state.jsp.nationality} /></b></p>
						  </div>
						  <p>Passport Number</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input id="passport_number_" type="text" class="w3-transparent w3-input w3-text-black" value={this.state.jsp.passport_number} /></b></p>
						  </div>
						  <p>Passport Country</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input  id="passport_country_" type="text"  class="w3-transparent w3-input w3-text-black"  value={this.state.jsp.passport_coumtry} /></b></p>
						  </div> 
						  <p>Passport Expiration Date</p>
						  <div class="w3-padding-left w3-padding-right">
							<p><b><input  id="passport_expiry_" class="w3-transparent w3-input w3-text-black" type="date" value={this.formatDate2.bind(this, this.state.jsp.passport_expiry)} /></b></p>
						  </div>
						
						  <div class="w3-center w3-margin-bottom">
							<button class="w3-button w3-round-xxlarge w3-green w3-hover-green w3-padding">
								{"Save Profile"}
							</button>
						  </div>
						</div>
				  </div><br/>
				  </form>
				</div>


				
				<div class="w3-twothird">
				
				  <div class="w3-container w3-card w3-white w3-margin-bottom">
					<h2 class="w3-text-grey w3-padding-16"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>My Flights</h2>
					{this.renderFlightDetails()}
				  </div>

				</div>
				

			  </div>
			  
			</div>
		</div>
		);
	}
}
export default Myflight;