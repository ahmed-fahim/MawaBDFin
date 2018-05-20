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
			params:0
		}
		this.setParams=this.setParams.bind(this);
		this.setBook = this.setBook.bind(this);
		this.render_SearchResult=this.render_SearchResult.bind(this);
		this.toggleOne=this.toggleOne.bind(this);
		this.renderDates=this.renderDates.bind(this);
		this.render_Search=this.render_Search.bind(this);
		this.validateForm=this.validateForm.bind(this);
		this.formatDate=this.formatDate.bind(this);
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
		
		var jsObj={
			"from": document.getElementById('from_').value,
			"to": document.getElementById('to_').value,
			"trip_type":tripType,
			"departure_date":departDate,
			"return_date":returnDate,
			"adult":document.getElementById('adult_').value,
			"child":document.getElementById('child_').value,
			"infant":document.getElementById('infant_').value,
			"class":document.getElementById('class_').value
		};
		console.log(jsObj.child+' child wants to go from '+jsObj.from);
		this.setParams(jsObj);
	}
	setBook(){

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
		var ret=(<div></div>);
		var wd_20={
            width:"20%"
		};
		var wd_1972={
            width:"19.72%"
		};
		if(this.state.params==1){
			ret=(
				<div className="w3-container">
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
					<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green">
						<div className="w3-col w3-center w3-padding" style={wd_20}>
						  <p>
							China Eastern Airlines - 2036 <br/>
							Aircraft: 73H <br/>
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p>
							Dhaka (DAC)14:35
							Thursday, 17 May 18
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> Singapore (SIN)14:25
							Friday, 18 May 18</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> 21hrs 50mins Multi Stop</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
						  <p className="w3-text-red w3-large"> BDT 139327.87</p>
						  <p><button className="w3-button w3-ripple w3-red w3-round">Buy</button></p>
						</div>
					</div>
					<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green">
						<div className="w3-col w3-center w3-padding" style={wd_20}>
						  <p>
							China Eastern Airlines - 2036 <br/>
							Aircraft: 73H <br/>
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p>
							Dhaka (DAC)14:35
							Thursday, 17 May 18
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> Singapore (SIN)14:25
							Friday, 18 May 18</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> 21hrs 50mins Multi Stop</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
						  <p className="w3-text-red w3-large"> BDT 139327.87</p>
						  <p><button className="w3-button w3-ripple w3-red w3-round">Buy</button></p>
						</div>
					</div>
					<div className="w3-row w3-card w3-black w3-border-bottom w3-border-green">
						<div className="w3-col w3-center w3-padding" style={wd_20}>
						  <p>
							China Eastern Airlines - 2036 <br/>
							Aircraft: 73H <br/>
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p>
							Dhaka (DAC)14:35
							Thursday, 17 May 18
						  </p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> Singapore (SIN)14:25
							Friday, 18 May 18</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-padding" style={wd_20}>
						  <p> 21hrs 50mins Multi Stop</p>
						</div>
						<div className="w3-col w3-center sm-margin-left w3-pading" style={wd_1972}>
						  <p className="w3-text-red w3-large"> BDT 139327.87</p>
						  <p><button className="w3-button w3-ripple w3-red w3-round">Buy</button></p>
						</div>
					</div>
				</div>
			);
		}
		return ret;
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
		var backup=(<img className="w3-image" src="\images\img1.jpg" alt="London" />);
		var elems=(
			<header className="w3-container w3-display-container  w3-hide-small" style={mxWidthStyle}>
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
							  <input className="w3-input w3-border" type="text" placeholder="Departing from" id="from_" required/>
							</div>
							<div className="w3-half">
							  <label>To</label>
							  <input className="w3-input w3-border" type="text" placeholder="Arriving at" id="to_" required/>
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
						<p><button className="w3-button w3-dark-grey" type="submit">Search and find dates</button></p>
					</form>
				</div>
			  </div>
			</header>
		);
		return elems;
	}
	render(){
		return(
			<div >
				<div>
					{this.render_Search()}
				</div>
				<div>
					{this.render_SearchResult()}
				</div>
			</div>
		)
		
	}
}

export default FlightSearch;