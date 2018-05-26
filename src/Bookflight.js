import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';
import Topbar from './Topbar';


import { createHashHistory } from 'history';
export const history = createHashHistory();


class Bookflight extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token,
			jsresp:this.props.jsresp,
			flight_:this.props.flight_,
			search_:this.props.search_
		};
		this.getfl = this.getfl.bind(this);
		this.setToken=this.setToken.bind(this);
		this.renderForms=this.renderForms.bind(this);
		this.proceedBook=this.proceedBook.bind(this);
		this.formatDate=this.formatDate.bind(this);
		this.setLogout=this.setLogout.bind(this);
	}
	setLogout(){
		this.props.setlogOut();
	}
	setToken(e){
		this.props.setToken2(e);
	}
	renderForms()
	{
		var fields=[];
		var adultCount=parseInt(this.state.search_.adult);
		var childCount=parseInt(this.state.search_.child);
		var infantCount=parseInt(this.state.search_.infant);
		var totalCount=adultCount+childCount+infantCount;

		for(var i=1; i <= totalCount; i++){
			fields.push(
				<div className="w3-card-4 w3-border w3-border-red w3-topbar w3-bottombar w3-leftbar w3-rightbar w3-round-xlarge w3-margin-bottom" >
					<div className="w3-container w3-red">
					  <h2>{"Passenger No. "+i}</h2>
					</div>
					<div className="w3-container w3-row ">
					  <div className="w3-third">
						<p>
							<label>Title*</label>
							<select className="w3-select w3-border w3-border-blue" id={"title"+i.toString()} required >
							  <option value="Mr">Mr</option>
							  <option value="Ms">Ms</option>
							  <option value="Mrs">Mrs</option>
							  <option value="Dr">Dr</option>
							</select>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>First Name*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"first_name"+i.toString()} required/>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Last Name*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"last_name"+i.toString()} required/>
						</p>
					  </div>
					</div>
					<div className="w3-container w3-row ">
					  <div className="w3-third">
						<p>
						<label>Gender*</label>
						<select className="w3-select w3-border w3-border-blue" id={"gender"+i.toString()} required>
						  <option value="Male">Male</option>
						  <option value="Female">Female</option>
						</select>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Passport Number</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"passport_number"+i.toString()} />
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Passport Expiration Date</label>
						<input className="w3-input w3-border w3-border-blue" type="date" id={"passport_expiry"+i.toString()} />
						</p>
					  </div>
					</div>
					<div className="w3-container w3-row ">
					  <div className="w3-third">
						<p>
						<label>Age Class*</label>
						<select className="w3-select w3-border w3-border-blue" id={"age_class"+i.toString()}>
						  <option value="Adult">Adult</option>
						  <option value="Child">Child</option>
						  <option value="Infant">Infant</option>
						</select>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Nationality*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"nationality"+i.toString()} required />
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Meal Preference</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"meal_preference"+i.toString()} placeholder="None" />
						</p>
					  </div>
					</div> 
					<div className="w3-container w3-row ">
					  <div className="w3-third">
						<p>
						<label>Phone Number*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" placeholder="+880-1xxxxxxxxx"  id={"phone"+i.toString()} required/>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Passport Country</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"passport_country"+i.toString()} />
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Date of Birth*</label>
						<input className="w3-input w3-border w3-border-blue" type="date" id={"date_of_birth"+i.toString()} required />
						</p>
					  </div>
					</div>
					<div className="w3-container w3-row ">
					  <div className="w3-third">
						<p>
						<label>Street*</label>
						<input className="w3-input w3-border w3-border-blue" id={"street_address"+i.toString()} type="text" required/>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>City*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"city"+i.toString()} required/>
						</p>
					  </div>
					  <div className="w3-third">
						<p>
						<label>Country*</label>
						<input className="w3-input w3-border w3-border-blue" type="text" id={"country"+i.toString()} required />
						</p>
					  </div>
					</div>
				  </div>	
			);
		}
		return(
			<div className="w3-container w3-black">
				<h2 className="w3-center w3-padding">Passenger Registration Form</h2>
				<form className="w3-container" onSubmit={this.proceedBook.bind(this)}>
					{fields}
					<div className="w3-container w3-center w3-margin-bottom">
					  <button className="w3-button w3-red w3-round w3-padding-left w3-padding-right w3-hover-deep-orange" type="submit">Submit to Book!</button>
					</div>
				</form>
			  </div>
		);
	}
	formatDate(inp){
		if(inp==""){
			return inp;
		}
		var mon=inp.substr(5,2);
		var day=inp.substr(8,2);
		var year=inp.substr(0,4);
		var ret=year+'/'+mon+'/'+day;
		return ret;
	}
	proceedBook(e){
		e.preventDefault();
		var guests=[];
		var jsObj;
		var one_way_flag;
		if(this.state.search_.trip_type =="one-way"){
			one_way_flag=1;
		}
		else{
			one_way_flag=0;
		}
		var adultCount=parseInt(this.state.search_.adult);
		var childCount=parseInt(this.state.search_.child);
		var infantCount=parseInt(this.state.search_.infant);
		var totalCount=adultCount+childCount+infantCount;
		
		for(var i = 1; i <= totalCount; i++){
			
			jsObj={
				"title": document.getElementById("title"+i).value,
				"first_name":document.getElementById("first_name"+i).value,
				"last_name":document.getElementById("last_name"+i).value,
				"gender":document.getElementById("gender"+i).value,
				"passport_number": document.getElementById("passport_number"+i).value,
				"passport_expiry": this.formatDate(document.getElementById("passport_expiry"+i).value),
				"passport_country" : document.getElementById("passport_country"+i).value,
				"nationality":document.getElementById("nationality"+i).value,
				"meal_preference": document.getElementById("meal_preference"+i).value,
				"age_class":document.getElementById("age_class"+i).value,
				"street_address" : document.getElementById("street_address"+i).value,
				"city":document.getElementById("city"+i).value,
				"country":document.getElementById("country"+i).value,
				"phone":document.getElementById("phone"+i).value,
				"date_of_birth": document.getElementById("date_of_birth"+i).value
			};
			if(jsObj.passport_number == "" || jsObj.passport_country=="" || jsObj.passport_expiry == ""){
				jsObj.passport_number = null;
				jsObj.passport_country = null;
				jsObj.passport_expiry = null;
			}
			if(jsObj.meal_preference == "" || jsObj.meal_preference === undefined){
				jsObj.meal_preference="None";
			}
			guests.push(jsObj);
		}
		
		var tripType=this.state.search_.trip_type;
		var departing_flight_id="",return_flight_id=null,departure_date="",return_date=null;
		if(one_way_flag==1){
			departing_flight_id=this.state.flight_.id;
			departure_date=this.state.search_.departure_date;
		}
		else{
			departing_flight_id=this.state.flight_.departing_flight.id;
			departure_date=this.state.search_.departure_date;
			return_flight_id=this.state.flight_.returning_flight.id;
			return_date=this.state.search_.return_date;
		}
		var finalObj={
			"trip_type":tripType,
			"departing_flight_id": departing_flight_id,
			"return_flight_id": return_flight_id,
			"departure_date": departure_date,
			"return_date": return_date,
			"adult":parseInt(this.state.search_.adult),
			"child":parseInt(this.state.search_.child),
			"infant":parseInt(this.state.search_.infant),
			"class":this.state.search_.class,
			"from":this.state.search_.from,
			"to":this.state.search_.to,
			"guests":guests
		};
		console.log(finalObj);
		console.log(this.state.token);
		console.log(this.state.auth);
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/input/booking";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:finalObj,
			dataType:'json',
			crossDomain:'true',
			headers:{
				"Accept" : 'application/json',
				"Authorization" : 'Bearer '+this.state.token
			},
			success: function(result, status, XHR){
				console.log(result);
				window.location=('/myflights');
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
				this.setLogout();
				window.location = ('/login');
			}.bind(this)
		});
		
	}
	getfl(){
		var lft,rgt;
		if(this.state.search_.trip_type=="one-way"){
			lft=(
				<ul class="w3-ul w3-card-4 w3-half w3-black">
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Departing Flight : "}</span><br/>
						<span>{this.state.flight_.operated_by + ' ' + this.state.flight_.flight_code}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Depart Time: "}</span><br/>
						<span>{this.state.flight_.departure_time}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Aircraft: "}</span><br/>
						<span>{this.state.flight_.aircraft}</span>
					  </div>
					</li>
				</ul>
			);
			rgt=(
				<ul class="w3-ul w3-card-4 w3-half w3-red">
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Return Trip Status: "}</span><br/>
						<span>{"Return trip was not requested"}</span>
					  </div>
					</li>
				</ul>
			);
		}
		else{
			lft=(
				<ul class="w3-ul w3-card-4 w3-half w3-black">
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Departing Flight : "}</span><br/>
						<span>{this.state.flight_.departing_flight.operated_by + ' ' + this.state.flight_.departing_flight.flight_code}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Depart Time: "}</span><br/>
						<span>{this.state.flight_.departing_flight.departure_time}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Aircraft: "}</span><br/>
						<span>{this.state.flight_.departing_flight.aircraft}</span>
					  </div>
					</li>
				</ul>
			);
			rgt=(
				<ul class="w3-ul w3-card-4 w3-half w3-red">
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Departing Flight : "}</span><br/>
						<span>{this.state.flight_.returning_flight.operated_by + ' ' + this.state.flight_.returning_flight.flight_code}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Depart Time: "}</span><br/>
						<span>{this.state.flight_.returning_flight.departure_time}</span>
					  </div>
					</li>
					<li class="w3-bar">
					  <div class="w3-bar-item">
						<span class="w3-large">{"Aircraft: "}</span><br/>
						<span>{this.state.flight_.returning_flight.aircraft}</span>
					  </div>
					</li>
				</ul>
			);			
		}
		return(
			<div className="w3-container w3-row w3-padding">
			{lft}
			{rgt}
			</div>
		);
	}
	render(){
			return(
				<div className="w3-animate-left">
					<Topbar key={17} auth={1} setToken2={this.setToken.bind(this)}/>
					<div className="w3-bar w3-card w3-teal w3-center w3-padding-16 w3-xlarge barFont"> {"Flight Booking Form"} </div>
					<div className="w3-container w3-row w3-padding">
						<ul class="w3-ul w3-card-4 w3-half w3-red">
						    <li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Departing From"}</span><br/>
								<span>{this.state.search_.from_place}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Flight Type: "}</span><br/>
								<span>{this.state.search_.trip_type}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Total Adult(s): "}</span><br/>
								<span>{this.state.search_.adult}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Total Infant(s): "}</span><br/>
								<span>{this.state.search_.infant}</span>
							  </div>
							</li>
						</ul>
						<ul class="w3-ul w3-card-4 w3-half w3-black">
						    <li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Arriving At : "}</span><br/>
								<span>{this.state.search_.to_place}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Total Cost: "}</span><br/>
								<span>{this.state.flight_.total_fare}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Total Children: "}</span><br/>
								<span>{this.state.search_.child}</span>
							  </div>
							</li>
							<li class="w3-bar">
							  <div class="w3-bar-item">
								<span class="w3-large">{"Class: "}</span><br/>
								<span>{this.state.search_.class}</span>
							  </div>
							</li>
						</ul>
					</div>
					{this.getfl()}
					<hr/>
					{this.renderForms()}
				</div>
			);
	}
}

export default Bookflight;