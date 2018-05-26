import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import $ from 'jquery/src/jquery';

import { createHashHistory } from 'history';
export const history = createHashHistory();

class FlightSearch extends Component{
	constructor(props){
		super(props);
		this.state={
			auth: this.props.auth,
			token: this.props.token,
			one_way:0,
			params:0,
			flights:[],
			depart_list:[],
			arrive_list:[],
			depart_list_load:0,
			arrive_list_load:0,
			lastSearch:"",
			chosenFlight:0
		}
		this.setParams=this.setParams.bind(this);
		this.setBook = this.setBook.bind(this);
		this.render_SearchResult=this.render_SearchResult.bind(this);
		this.toggleOne=this.toggleOne.bind(this);
		this.renderDates=this.renderDates.bind(this);
		this.render_Search=this.render_Search.bind(this);
		this.validateForm=this.validateForm.bind(this);
		this.formatDate=this.formatDate.bind(this);
		this.formatDate2=this.formatDate2.bind(this);
		this.handle_scroll = this.handle_scroll.bind(this);
		this.genSug=this.genSug.bind(this);
		this.departing_airports=this.departing_airports.bind(this);
		this.arriving_airports=this.arriving_airports.bind(this);
		this.setEntries= this.setEntries.bind(this);
		this.getCity=this.getCity.bind(this);
	}
	getCity(inp){
		var retStr="";
		var indx=0;
		while(true){
			if((inp[indx] >='a' && inp[indx]<='z') || (inp[indx] >='A' && inp[indx]<='Z')){
				break;
			}
			else{
				indx++;
			}
		}
		while(true){
			if(inp[indx]==' '){break;}
			retStr=retStr+inp[indx++];
		}
		return retStr;
	}
	setEntries(flight_, search_){
		this.props.setEntry(flight_,search_);
	}
	handle_scroll(){
		var elemnt=document.getElementById('resultList');
		if(elemnt===undefined){
			console.log('undefined');
		}
		elemnt.scrollIntoView();
		return;
	}
	setParams(p){
		//do something with this searchVal query using API
		console.log(p.child+' child wants to go from '+p.from);
		this.setState({params:1});
	}
	formatDate(inp){
		var mon=inp.substr(5,2);
		var day=inp.substr(8,2);
		var year=inp.substr(0,4);
		var ret=year+'/'+mon+'/'+day;
		return ret;
	}
	formatDate2(inp){
		
	}
	validateForm(e){
		e.preventDefault();
		var departDate=this.formatDate(document.getElementById('depart_').value);
		var returnDate='';
		if(this.state.one_way==0){
			returnDate=this.formatDate(document.getElementById('return_').value);
		}
		var tripType;
		if(this.state.one==0){
			tripType="round-trip";
		}
		else{
			tripType="one-way";
		}
		
		var strval=document.getElementById('from_').value;
		var indx=0;
		while(strval[indx] >= '0' && strval[indx] <= '9'){
			indx++;
		}
		var fromInt=0;
		if(indx > 0){fromInt=parseInt(strval.substr(0,indx));}
		
		strval=document.getElementById('to_').value;
		indx=0;
		while(strval[indx] >= '0' && strval[indx] <= '9'){
			indx++;
		}
		var toInt=0;
		if(indx > 0){toInt=parseInt(strval.substr(0,indx));}
		
		var jsObj={
			"from": fromInt,
			"to": toInt,
			"trip_type":tripType,
			"departure_date":departDate,
			"return_date":returnDate,
			"adult":document.getElementById('adult_').value,
			"child":document.getElementById('child_').value,
			"infant":document.getElementById('infant_').value,
			"class":document.getElementById('class_').value
		};
		var searchInfo={
			"from_place": document.getElementById('from_').value,
			"to_place":document.getElementById('to_').value,
			"from": fromInt,
			"to": toInt,
			"trip_type":tripType,
			"departure_date":departDate,
			"return_date":returnDate,
			"adult":document.getElementById('adult_').value,
			"child":document.getElementById('child_').value,
			"infant":document.getElementById('infant_').value,
			"class":document.getElementById('class_').value			
		};
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/search/flight";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				console.log("success");
				console.log(result);
				if(searchInfo.trip_type == "round-trip"){
					this.setState({
						flights: result.round_trip_flight,
						lastSearch: searchInfo,
						params:1
					});
				}
				else{
					this.setState({
						flights: result.departing_flight,
						lastSearch: searchInfo,
						params:1
					});
				}
			}.bind(this),
			error: function(xhr){
				console.log("error");
			}.bind(this)
		});		
	}
	setBook(indx){
		console.log(this.state.lastSearch);
		console.log(this.state.flights[indx]);
		if(this.state.auth === 0){
			window.location=('/login');
		}
		else{
			this.setEntries(this.state.flights[indx],this.state.lastSearch);
			window.location=('/bookflight');
		}
	}
	setCurrent(e){
		this.props.setCurr(e);
	}

	toggleOne(e){
		this.setState({one_way:e});
		return;
	}
	renderDates(){
		
	}
	render_SearchResult(){
		console.log('here we go again');
		var ret=(<div></div>);
		var wd_20={
            width:"20%"
		};
		var wd_1972={
            width:"19.72%"
		};
		
		var tableHeader=(
					<div className="w3-row ">
						<div className="w3-col w3-center w3-red" style={wd_20}>
						  <p> Airlines</p>
						</div>
						<div className="w3-col w3-center w3-red sm-margin-left" style={wd_20}>
						  <p> Departure</p>
						</div>
						<div className="w3-col w3-center w3-red sm-margin-left" style={wd_20}>
						  <p> Arrival</p>
						</div>
						<div className="w3-col w3-center w3-red sm-margin-left" style={wd_20}>
						  <p> Duration</p>
						</div>
						<div className="w3-col w3-center w3-red  sm-margin-left" style={wd_1972}>
						  <p> Price</p>
						</div>
					</div>
		);

		var eachOpt=[];
		if(this.state.params==1){
			console.log(this.state.lastSearch);
			var ln=this.state.flights.length;
			var arr=[];
			for(var i=0;i<ln;i++){
				arr.push(this.state.flights[i]);
			}
			
			for (var i = 0; i < ln; i++){
				if(this.state.lastSearch.trip_type == "round-trip"){
					eachOpt.push(
						<div className="w3-row w3-card w3-black">
							<div className="w3-col w3-center w3-padding" style={wd_20}>
							  <p>
								<img className="w3-image" src="\images\emirates.JPG" height="50px" width="50px" />
							  </p>
							  <p>
								{arr[i].departing_flight.operated_by + ' ' + arr[i].departing_flight.flight_code} <br/>
								{'Aircraft: ' + arr[i].departing_flight.aircraft} <br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.from_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].departing_flight.departure_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.to_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].departing_flight.arrival_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p> {arr[i].departing_flight.duration.days + ' day(s) ' + arr[i].departing_flight.duration.h + ' hours'}</p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
							  <p className="w3-text-red w3-large"> {"BDT "+ arr[i].total_fare}</p>
							  <p><button className="w3-button w3-hover-green w3-red w3-round" onClick={this.setBook.bind(this,i)}>
									Book
							  </button></p>
							</div>
						</div>
					);
					eachOpt.push(
						<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green">
							<div className="w3-col w3-center w3-padding" style={wd_20}>
							  <p>
								<img className="w3-image" src="\images\emirates.JPG" height="50px" width="50px" />
							  </p>
							  <p>
								{arr[i].returning_flight.operated_by + ' ' + arr[i].returning_flight.flight_code} <br/>
								{'Aircraft: ' + arr[i].returning_flight.aircraft} <br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.to_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].returning_flight.departure_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.from_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].returning_flight.arrival_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p> {arr[i].returning_flight.duration.days + ' day(s) ' + arr[i].returning_flight.duration.h + ' hours'}</p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
							  <p> {'.'} </p>
							</div>
						</div>
					);
				}
				else{
					eachOpt.push(
						<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green">
							<div className="w3-col w3-center w3-padding" style={wd_20}>
							  <p>
								<img className="w3-image" src="\images\emirates.JPG" height="50px" width="50px" />
							  </p>
							  <p>
								{arr[i].operated_by + ' ' + arr[i].flight_code} <br/>
								{'Aircraft: ' + arr[i].aircraft} <br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.from_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].departure_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p>{this.getCity(this.state.lastSearch.to_place)}</p>
							  <p>
								{'Date and Time:'}<br/>
								{arr[i].arrival_time}<br/>
							  </p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
							  <p> {arr[i].duration.days+ ' day(s) ' + arr[i].duration.h + ' hours'}</p>
							</div>
							<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
							  <p className="w3-text-red w3-large"> {"BDT "+ arr[i].total_fare}</p>
							  <p><button className="w3-button w3-hover-green w3-red w3-round" onClick={this.setBook.bind(this,i)}>
									Book
							  </button></p>
							</div>
						</div>	
					);
				}
			}
			if(eachOpt.length == 0){
				eachOpt.push(
					<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green w3-center">
						<h2>{"Sorry, We could not find a flight as per your requirement"}</h2>
					</div>	
				);
			}
			ret=(
				<div className="w3-container w3-animate-top">
					{tableHeader}
					{eachOpt}
				</div>
			);
		}
		return ret;
	}
	genSug(e){
		console.log(e.target.value);		
	}
	arriving_airports(){
		var jsObj={
			"search" : ""
		};
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/search/airport";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				//console.log(result);
				var eachItem=[];
				var len=result.length;
				for (var i=0; i < len; i++){
					eachItem.push(<option value={result[i].id+". " + result[i].city + " " + result[i].name + " "+result[i].country} />);
				}
				var outerLayer=(
					<datalist key={1} id="a_airports">
					{eachItem}
					</datalist>
				);
				this.setState({
					arrive_list:outerLayer,
					arrive_list_load:1
				});
				
			}.bind(this),
			error: function(xhr){
				console.log("error");
			}.bind(this)
		});
	}
	departing_airports(){
		//console.log("I was called");
		var jsObj={
			"search" : ""
		};
		var base="https://www.mawabd.com/flightHotelBooking/public/";
		var req="api/search/airport";
		var full_url=base+req;
		$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			data:jsObj,
			dataType:'json',
			crossDomain:'true',
			success: function(result, status, XHR){
				//console.log(result);
				var eachItem=[];
				var len=result.length;
				for (var i=0; i < len; i++)
				{
					eachItem.push(<option value={result[i].id+". " + result[i].city + " " + result[i].name + " "+result[i].country} />);
					//console.log(result[i].id+". " + result[i].city + " " + result[i].name + " "+result[i].country);
				}
				var outerLayer=(
					<datalist key={2} id="d_airports">
					{eachItem}
					</datalist>
				);
				this.setState({
					depart_list:outerLayer,
					depart_list_load:1
				});
				
			}.bind(this),
			error: function(xhr){
				console.log("error");
				console.log(xhr);

			}.bind(this)
		});		
	}
	render_Search(){
		var mxWidthStyle={
			maxWidth: 2400
		};
		var inputElems;
		if(this.state.one_way==0){
			inputElems=(
				<div>
					<label>Return</label>
					<input className="w3-input w3-border" type="date" id='return_' required/>
				</div>
			);
		}
		else{
			inputElems=(
				<div>
				</div>
			);
		}
		var elems=(
			<header className="w3-content w3-display-container  w3-hide-small" style={mxWidthStyle}>
			<img className="w3-image" src="\images\img1.jpg" alt="London" />
			  <div className="w3-display-topmiddle wdth65">
				<div className="w3-bar w3-black">
				  <button className="w3-bar-item w3-button tablink w3-red" ><i className="fa fa-plane w3-margin-right"></i>Flight</button>
				</div>

				<div id="Flight" className="w3-container w3-white w3-padding-16">
				  <h3>Travel the world with us</h3>
				  <div className="w3-bar w3-center">
					<button className={"w3-bar-item w3-button "+(this.state.one_way==0?"w3-green":"w3-red")+" w3-hover-green w3-round w3-padding"} onClick={this.toggleOne.bind(this,0)}>Round Trip </button>
					<button className={"w3-bar-item w3-button "+(this.state.one_way==1?"w3-green":"w3-red")+" w3-hover-green w3-round w3-padding w3-margin-left"} onClick={this.toggleOne.bind(this,1)}>One Way </button>
				  </div>
				  <br/>
					<form onSubmit={this.validateForm} >
						<div className="w3-row-padding marge016">
							<div className="w3-half">
							  <label>From</label>
							  <input className="w3-input w3-border" list="d_airports" placeholder="Departing from" autoComplete="off" id="from_" required/>
							  {this.state.depart_list}
							</div>
							<div className="w3-half">
							  <label>To</label>
							  <input className="w3-input w3-border" list="a_airports" placeholder="Arriving at" autoComplete="off" id="to_" required/>
							  {this.state.arrive_list}
							</div>
						</div>
						<br/>
						<div className="w3-row-padding marge016">
							<div className="w3-half">
							  <label>Departure</label>
							  <input className="w3-input w3-border" type="date" id='depart_' required/>
							</div>
							<div className="w3-half">
							{inputElems}
							</div>
						</div>
						<br/>
						<div className="w3-row-padding marge016">
							<div className="w3-half">
							  <label>Adult(12+)</label> <br/>
							  <select className="w3-select w3-border" id="adult_" required>
								<option value="" disabled selected>Choose number of Adults</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
							  </select>
							</div>
							<div className="w3-half">
							  <label>Children (2-11)</label> <br/>
							  <select className="w3-select w3-border" id="child_" required>
								<option value={0}>Choose number of Children</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
							  </select>
							</div>
						</div>
						<br/>
						<div className="w3-row-padding marge016">
							<div className="w3-half">
							  <label>Infant (0-2)</label> <br/>
							  <select className="w3-select w3-border" id="infant_" required>
								<option value={0}>Choose number of Infants</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
								<option value={6}>6</option>
								<option value={7}>7</option>
								<option value={8}>8</option>
								<option value={9}>9</option>
							  </select>
							</div>
							<div className="w3-half">
							  <label>Class</label> <br/>
							  <select className="w3-select w3-border" id="class_" required>
								<option value="Economy">Economy</option>
								<option value="Premium Economy">Premium Economy</option>
								<option value="Business">Business</option>
								<option value="First">First</option>
							  </select>
							</div>
						</div>
						<br/>
						<p><button className="w3-button w3-dark-grey" type="submit">Search Flights</button></p>
					</form>
				</div>
			  </div>
			</header>
		);
		return elems;
	}
	componentDidMount(){
		if(this.state.params==1){
			this.handle_scroll();
		}
		return;
	}
	componentDidUpdate(){
		if(this.state.params==1){
			this.handle_scroll();
		}
		return;
	}
	render(){
		if(this.state.arrive_list_load === 0){
			this.arriving_airports();
		}
		if(this.state.depart_list_load === 0){
			this.departing_airports();
		}
		return(
		<div >
			<div>
				{this.render_Search()}
			</div>
			<div id='resultList'>
				{this.render_SearchResult()}
			</div>
		</div>
		);

		
	}
}

export default FlightSearch;