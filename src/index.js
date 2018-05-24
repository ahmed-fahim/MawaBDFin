import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import Bookflight from './Bookflight';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery/src/jquery';

import { createHashHistory } from 'history';
export const history = createHashHistory();

////////////////INDEX.JS Only

var token="";
var jsresponse=[];
var authorized=0;
var flightChoice=0;
var flightDetails;
var searchEntries;


function rockOn(){
	console.log("we rock");
}


// Transition Functions
function setToken(e){
	jsresponse=e;
	token=jsresponse.access_token;
	authorized=1;
	console.log(token);
	console.log('here');
	var responseString=JSON.stringify(e);
	setCookie("access_token", token);
	setCookie("profile_data", responseString);
}

function setEntries(flight_, search_){
	flightDetails=flight_;
	searchEntries=search_;
	flightChoice=1;
	setCookie('flight_', JSON.stringify(flightDetails));
	setCookie('search_', JSON.stringify(search_));
	console.log('Received Choice');
}

function checkEntries(){
	if(checkCookie("flight_") == true){
		flightDetails = JSON.parse(getCookie("flight_"));
		searchEntries = JSON.parse(getCookie("search_"));
		flightChoice=1;
		setCookie('flight_', JSON.stringify(flightDetails));
		setCookie('search_', JSON.stringify(searchEntries));
	}
}

function precheckToken(){
	if(checkCookie("access_token") == true){
		jsresponse=JSON.parse(getCookie("profile_data"));
		token=getCookie("access_token");
		var responseString=JSON.stringify(jsresponse);
		setCookie("access_token", token);
		setCookie("profile_data", responseString);
		authorized=1;
	}
	else{
		return;
	}
}
function setCookie(cname,cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (4*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}	

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie(key_index) {
	var val=getCookie(key_index);
	if (val != "") {
		return true;
	} 
	else {
		return false;
	}
}
function deleteCookie(key_index){
	document.cookie = key_index+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function logOutHandler(){
	var base="https://www.mawabd.com/flightHotelBooking/public/";
	var req="api/logout";
	var full_url=base+req;
	$.ajax({
			url: full_url,
			type: 'POST',
			accepts: 'application/json',
			dataType:'json',
			crossDomain:'true',
			headers:{
				"Accept" : 'application/json',
				"Authorization" : 'Bearer '+token
			},
			success: function(result, status, XHR){
				//console.log(result);
			}.bind(this),
			error: function(xhr){
				//console.log("error");
			}
	});
	token="";
	authorized=0;
	jsresponse=[];
	deleteCookie("access_token");
	deleteCookie("profile_data");
}

// Rendering Functions
function renderHome(){
	precheckToken();
	var elems=(
		<Home key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} setlogOut={logOutHandler.bind(this)} setEntry={setEntries.bind(this)}/>
	);
	return elems;
}
function renderLogin(){
	precheckToken();
	if(authorized == 1){
		return renderHome();
	}
	var elems=(
		<Login key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} />
	);
	return elems;
}
function renderRegistration(){
	precheckToken();
	if(authorized == 1){
		return renderHome();
	}
	var elems=(
		<Registration key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} />
	);
	return elems;	
}
function renderFlightBook(){
	checkEntries();
	if(flightChoice==0){
		return renderHome();
	}
	else{
		return(
		<Bookflight key={131} auth={authorized} token={token} setlogOut={logOutHandler.bind(this)} search_={searchEntries} flight_={flightDetails} setToken2={setToken.bind(this)}/>
		);
	}
	
}
function renderMyFlights(){
	precheckToken();
	if(authorized == 0){
		return renderLogin();
	}
	var elems=(
		<Home key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} setlogOut={logOutHandler.bind(this)}/>
	);
	return elems;
}
function renderLogout(){
	logOutHandler();
	return renderHome();
}



ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path={'/'} 			render={renderHome.bind(this)} />
			<Route exact path={'/login'} 		render={renderLogin.bind(this)} />
			<Route exact path={'/registration'} render={renderRegistration.bind(this)} />
			<Route exact path={'/myflights'} 	render={renderMyFlights.bind(this)} />
			<Route exact path={'/logout'} 		render={renderLogout.bind(this)} />
			<Route exact path={'/bookflight'} 	render={renderFlightBook.bind(this)} />
		</Switch>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
