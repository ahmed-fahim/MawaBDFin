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
		this.autoCheck=this.autoCheck.bind(this);
		this.cancelFlight = this.cancelFlight.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal=this.hideModal.bind(this);
		this.processPayment=this.processPayment.bind(this);
	}
	
	showModal(indx){
		document.getElementById("mod"+indx).style.display="block";
		return;
	}
	hideModal(indx){
		document.getElementById("response"+indx).innerHTML="";
		document.getElementById("mod"+indx).style.display="none";
		return;		
	}
	autoCheck(inp){
		if(inp === undefined || inp == ""){
			return null;
		}
		else{
			return inp;
		}
	}
	cancelFlight(indx){
		console.log(indx+" Received for cancellation");
		console.log(this.state.flights[indx]);
		var curObj=this.state.flights[indx];
		var person_id=0;
		var jsObj={
			"booking_id" : curObj.guests[person_id].booking_id
		};
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/cancel/booking";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			data:jsObj,
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
					this.loadFlights();
				}
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
			}.bind(this)
		});			
		
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
					paybtn=(
						<p> 
							<button className="w3-button w3-round w3-green w3-hover-blue w3-padding" onClick={this.showModal.bind(this,i)}>{"Payment Portal"} </button>
							<button className=" w3-margin-left w3-button w3-round w3-red w3-hover-blue w3-padding" onClick={this.cancelFlight.bind(this,i)}>{"Cancel Flight"} </button>
						</p>
					);
				}
				var returnFlightStatus=(<span></span>);
				if(jsObj.trip_type=="round-trip"){
					returnFlightStatus=(
					  <h6 className="w3-opacity"><b>Returning Flight Status <span className="w3-tag w3-red w3-round">{jsObj.returning_flight.status}</span></b></h6>
					);
				}
				var indx=i;
				eachItem.push(
					<div className="w3-container w3-bottombar w3-border-indigo">
					  <h5 className="w3-opacity"><b>{"["+jsObj.origin.city+" to "+jsObj.destination.city+"] | "+jsObj.trip_type}</b></h5>
					  <h6 className="w3-opacity"><b>Departing Flight Status <span className="w3-tag w3-red w3-round">{jsObj.departing_flight.status}</span></b></h6>
					  {returnFlightStatus}
					  <h6 className="w3-text-teal"><i className="fa fa-credit-card fa-fw w3-margin-right"></i>{"Adjusted Amount: " + jsObj.adjusted_amount + " BDT"} - <span className="w3-tag w3-teal w3-round">{jsObj.status}</span></h6>
					  <h6 className="w3-text-teal"><i className="fa fa-calender fa-fw w3-margin-right"></i>{"Departure Date: " + jsObj.departure_date}</h6>
					  <h6 className="w3-text-teal"><i className="fa fa-calender fa-fw w3-margin-right"></i>{"Return Date:"+ ((jsObj.trip_type=="one-way") ? "Not Requested":jsObj.return_date)}</h6>
				      {paybtn}
					  <hr/>
					  <div id={"mod"+i.toString()} class="w3-modal">
						<div class="w3-modal-content w3-animate-right w3-card-4">
						  <header class="w3-container w3-sand w3-card"> 
							<span 
							class="w3-button w3-display-topright" onClick={this.hideModal.bind(this,i)}>&times;</span>
							<h2>Bkash Payment Portal</h2>
						  </header>
						  <div class="w3-container w3-red w3-center w3-card">
							<form class="w3-container w3-transparent" onSubmit={function(event){event.preventDefault(); this.processPayment(indx);}.bind(this)}>
								<p><input class="w3-input w3-border-bottom w3-border-blue" placeholder="The Number you paid to..." id={"paid_to"+i.toString()} required/></p>
								<p><input class="w3-input w3-border-bottom w3-border-blue" placeholder="Your Bkash Transaction ID" id={"trxid"+i.toString()} required/></p>
								<p><button class="w3-button w3-round w3-green" type="submit"> Submit Transaction to Pay </button></p>
							</form>
							<p class="w3-large" id={"response"+i}></p>
						  </div>
						  <footer class="w3-container w3-sand w3-card">
							<p class="w3-tiny">MawaBD Payment Portal</p>
						  </footer>
						</div>
					  </div>
					</div>					
				);
			}
			
		}
		return eachItem;	
	}
	processPayment(indx){
		//e.preventDefault();
		console.log(indx + " for payment");
		var flightObj=this.state.flights[indx];
		var jsObj={
			"paid_to":document.getElementById("paid_to"+indx.toString()).value,
			"trxid":document.getElementById("trxid"+indx.toString()).value,
			"booking_id":flightObj.id
		};
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/pay/booking";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			dataType:'json',
			data:jsObj,
			crossDomain:'true',
			headers:{
				"Accept" : 'application/json',
				"Authorization" : 'Bearer '+this.state.token
			},
			success: function(result, status, XHR){
				console.log(result);
				if(result.success == "true"){
					document.getElementById("response"+indx).innerHTML="Payment verification: Successful!!";
				}
				else{
					if(result.error.hasOwnProperty("paid_to")){document.getElementById("response"+indx).innerHTML=result.error.paid_to[0];}
					else{
						document.getElementById("response"+indx).innerHTML="bKash Gateway busy. Please try again after some time";
					}
				}
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
				document.getElementById("response"+indx).innerHTML="Sorry, Something Went Wrong. Please try again after some time";
			}.bind(this)
		});
		
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
				<select key={72} id="gender_" className="w3-select w3-transparent w3-text-black" >
					<option className="w3-text-black" value="Male">Male</option>
					<option className="w3-text-black" value="Female">Female</option>
				</select> 
			);
		}
		else{
			return(
				<select key={81} id="gender_" className="w3-select w3-transparent w3-text-black" >
					<option className="w3-text-black" value="Female">Female</option>
					<option className="w3-text-black" value="Male">Male</option>
				</select> 			
			);
		}
	}
	updateProfile(e){
		e.preventDefault();
		
		var jsObj={
			"title": this.state.jsresp.title,
			"first_name":this.state.jsresp.first_name,
			"last_name":this.state.jsresp.last_name,
			"gender":document.getElementById("gender_").value,
			"passport_number": this.autoCheck(document.getElementById("passport_number_").value),
			"passport_expiry": this.autoCheck(this.formatDate(document.getElementById("passport_expiry_").value)),
			"passport_country" : this.autoCheck(document.getElementById("passport_country_").value),
			"nationality":this.autoCheck(document.getElementById("nationality_").value),
			"street_address" : null,
			"city":this.autoCheck(document.getElementById("city_").value),
			"country":this.autoCheck(document.getElementById("country_").value),
			"phone":this.autoCheck(document.getElementById("phone_").value),
			"date_of_birth": this.autoCheck(document.getElementById("date_of_birth_").value),
			"alternate_phone":this.autoCheck(document.getElementById("altphone_").value),
			"email":this.state.jsresp.email,
			"identification":this.state.jsresp.identification,
			"identification_type":this.state.jsresp.identification_type,
			"password" : this.autoCheck(document.getElementById("pw_").value),
			"c_password": this.autoCheck(document.getElementById("pw2_").value)
		};
		
		if(jsObj.password == null || jsObj.c_password==null){
			jsObj.password=null;
			jsObj.c_password=null;
		}
		if(jsObj.phone == null){
			jsObj.phone = this.autoCheck(this.state.jsresp.phone);
		}
		if(jsObj.alternate_phone == null){
			jsObj.alternate_phone =this.autoCheck(this.state.jsp.alternate_phone);
		}
		if(jsObj.nationality == null){
			jsObj.nationality=this.autoCheck(this.state.jsp.nationality);
		}
		if(jsObj.passport_number == null){
			jsObj.passport_number=this.autoCheck(this.state.jsp.passport_number);
		}
		if(jsObj.passport_country == null){
			jsObj.passport_country=this.autoCheck(this.state.jsp.passport_country);
		}
		if(jsObj.passport_expiry == null){
			jsObj.passport_expiry=this.autoCheck(this.state.jsp.passport_expiry);
		}
		if(jsObj.passport_expiry == null){
			jsObj.passport_expiry=this.autoCheck(this.state.jsp.passport_expiry);
		}
		if(jsObj.city == null){
			jsObj.city=this.autoCheck(this.state.jsp.city);
		}
		if(jsObj.country == null){
			jsObj.country=this.autoCheck(this.state.jsp.country);
		}
		if(jsObj.date_of_birth == null){
			jsObj.date_of_birth=this.autoCheck(this.state.jsp.date_of_birth);
		}		
		console.log(jsObj);
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/profile/update";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			data:jsObj,
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
					this.loadProfile();
				}
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);
			}.bind(this)
		});	
		
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
		<div className="w3-animate-left">
			<Topbar key={63} auth={1} setToken2={this.setToken.bind(this)}/> 
			<div className="w3-content w3-margin-top" style={widthCSS}>
			  <div className="w3-row-padding">
				
				<div className="w3-third">
					<form onSubmit={this.updateProfile} className="w3-container">
					<div className="w3-red w3-text-white w3-card-4">
						<div className="w3-container">
						  <h2 className="w3-text-black w3-xlarge"> <b>{this.state.jsresp.title +" "+this.state.jsresp.first_name+" "+this.state.jsresp.last_name}</b></h2>
						  <p><b>{"Email:"}<input className="w3-transparent w3-input w3-text-black" value={this.state.jsresp.email} disabled/></b></p>
						  <p><b>{"Phone:"}<input id="phone_" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsresp.phone} type="text"/></b></p>
						  <p><b>{"Alternate Phone:"}<input id="altphone_" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsp.alternate_phone} type="text" /></b></p>
						  <br/>
						  <p><b>{"Set New Password:"}<input id="pw_" className="w3-transparent w3-input w3-text-black" type="password" placeholder="Your New Password" /></b></p>
						  <p><b>{"Confirm New Password:"}<input id="pw2_" className="w3-transparent w3-input w3-text-black" type="password" placeholder="Confirm Your New Password" /></b></p>
						  <br/>
						  <p><b>{"Credit Allowance"}<input className="w3-transparent w3-input w3-text-black" value={this.state.jsp.credit_allowance} placeholder="Your Current Credit Allowance is 0" disabled/></b></p>
						  <p><b>{"Credit Currency"}<input className="w3-transparent w3-input w3-text-black" value={this.state.jsp.credit_currency} placeholder="Your Current Credit Currency is 0" disabled/></b></p>
						  <br/>

						  <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Details</b></p>
						  <p>Date Of Birth <br/><span className="w3-small">{"(Currently [Y/M/D]: " +this.state.jsp.date_of_birth+")"}</span></p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input id="date_of_birth_" className="w3-transparent w3-input w3-text-black" type="date" /></b></p>
						  </div>		  
						  <p>Gender</p>
						  <div className="w3-padding-left w3-padding-right">
							<b>
								{this.renderGender()}
							</b>
						  </div>
						  <p>City</p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input id="city_" type="text" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsp.city} /></b></p>
						  </div> 
						  <p>Country</p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input id="country_" type="text" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsp.country} /></b></p>
						  </div> 
						  <p>Nationality</p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input id="nationality_" type="text" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsp.nationality} /></b></p>
						  </div>
						  <p>Passport Number</p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input id="passport_number_" type="text" className="w3-transparent w3-input w3-text-black" placeholder={this.state.jsp.passport_number} /></b></p>
						  </div>
						  <p>Passport Country</p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input  id="passport_country_" type="text"  className="w3-transparent w3-input w3-text-black"  placeholder={this.state.jsp.passport_country} /></b></p>
						  </div> 
						  <p>Passport Expiration Date<br/><span className="w3-small">{" (Currently [Y/M/D]: " +this.state.jsp.passport_expiry+")"}</span> </p>
						  <div className="w3-padding-left w3-padding-right">
							<p><b><input  id="passport_expiry_" className="w3-transparent w3-input w3-text-black" type="date" /></b></p>
						  </div>
						
						  <div className="w3-center w3-margin-bottom">
							<button className="w3-button w3-round-xxlarge w3-green w3-hover-green w3-padding">
								{"Save Profile"}
							</button>
						  </div>
						</div>
				  </div><br/>
				  </form>
				</div>


				
				<div className="w3-twothird">
				
				  <div className="w3-container w3-card w3-white w3-margin-bottom">
					<h2 className="w3-text-grey w3-padding-16"><i className="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge w3-text-teal"></i>My Flights</h2>
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