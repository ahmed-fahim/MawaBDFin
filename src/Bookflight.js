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
	}
	setToken(e){
		this.props.setToken2(e);
	}
	
	getfl(){
		var lft,rgt;
		if(this.state.search_.trip_type=="one-way"){
			lft=(
				<div className="w3-card w3-white w3-half w3-left">
					<p><b className="w3-large w3-margin-left">{"Departing Flight : "}</b> {this.state.flight_.operated_by + ' ' + this.state.flight_.flight_code}</p>
					<p><b className="w3-large w3-margin-left">{"Depart Time: "}</b>{this.state.flight_.departure_time}</p>
					<p><b className="w3-large w3-margin-left">{"Aircraft: "}</b>{this.state.flight_.aircraft}</p>
				</div>
			);
			rgt=(
				<div className="w3-card w3-blue w3-half w3-left w3-padding-bottom">
					<h2>Return trip not requested</h2>
				</div>
			);
		}
		else{
			lft=(
				<div className="w3-card w3-white w3-half w3-left">
					<p><b className="w3-large w3-margin-left">{"Departing Flight : "}</b> {this.state.flight_.departing_flight.operated_by + ' ' + this.state.flight_.departing_flight.flight_code}</p>
					<p><b className="w3-large w3-margin-left">{"Depart Time: "}</b>{this.state.flight_.departing_flight.departure_time}</p>
					<p><b className="w3-large w3-margin-left">{"Aircraft: "}</b>{this.state.flight_.departing_flight.aircraft}</p>
				</div>
			);
			rgt=(
				<div className="w3-card w3-blue w3-half w3-left">
					<p><b className="w3-large w3-margin-left">{"Departing Flight : "}</b> {this.state.flight_.returning_flight.operated_by + ' ' + this.state.flight_.returning_flight.flight_code}</p>
					<p><b className="w3-large w3-margin-left">{"Depart Time: "}</b>{this.state.flight_.returning_flight.departure_time}</p>
					<p><b className="w3-large w3-margin-left">{"Aircraft: "}</b>{this.state.flight_.returning_flight.aircraft}</p>
				</div>
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
				<div>
					<Topbar key={17} auth={1} setToken2={this.setToken.bind(this)}/>
					<div className="w3-bar w3-card w3-green w3-center w3-padding-16 w3-xlarge barFont"> {"Flight Booking Form"} </div>
					<div className="w3-container w3-row w3-padding">
						<div className="w3-card w3-blue w3-half w3-left">
							<p><b className="w3-large w3-margin-left">{"Departing From : "}</b> {this.state.search_.from_place}</p>
							<p><b className="w3-large w3-margin-left">{"Flight Type: "}</b>{this.state.search_.trip_type}</p>
							<p><b className="w3-large w3-margin-left">{"Total Adult(s): "}</b>{this.state.search_.adult}</p>
							<p><b className="w3-large w3-margin-left">{"Total Infant(s): "}</b>{this.state.search_.infant}</p>
						</div>
						<div className="w3-card  w3-white w3-half w3-right">
							<p><b className="w3-large w3-margin-left">{"Arriving At : "}</b>{this.state.search_.to_place}</p>
							<p><b className="w3-large w3-margin-left">{"Total Cost: "}</b>{this.state.flight_.total_fare}</p>
							<p><b className="w3-large w3-margin-left">{"Total Children: "}</b>{this.state.search_.child}</p>
							<p><b className="w3-large w3-margin-left">{"Class: "}</b>{this.state.search_.class}</p>
						</div>
					</div>
					{this.getfl()}
				</div>
			);
	}
}

export default Bookflight;