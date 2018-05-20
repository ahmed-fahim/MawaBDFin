import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import './index.css';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';

import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery/src/jquery';

import { createHashHistory } from 'history';
export const history = createHashHistory();
// loadDoc(){
    // isloading=1;
    // itemList=[];
    // searchCounter=searchCounter+1;
    // var query=document.getElementById('searchId').value;
    // var trunclimit=-1;
    // for(var i=0;i<query.length;i++){
      // if(query[i] == ';'){
        // trunclimit=i;
        // break;
      // }
    // }
    // if(trunclimit != -1){
      // query=query.substring(0,trunclimit);
    // }
    // const FIN_URL="http://es.backpackbang.com:9200/products/amazon/_search?q=" + query;
    // //console.log(FIN_URL);
    // $.ajax({
          // url: FIN_URL,
          // type: "get", //send it through get method
          // success: function(response) {
              // changeInProducts=1;
              // if(response.hits.total == 0){
                // itemList=[];
                // isloading=0;
              // }
              // else{
                // var hitsArray=response.hits.hits;
                // itemList=[];
                // //console.log(hitsArray[0]._id+' '+ hitsArray[0]._source.title+' '+hitsArray[0]._source.salePrice.toString()+' '+hitsArray[0]._source.images[0]);
                // for(var ii=0;ii<hitsArray.length;ii++){
                  // var newItem= new Item(hitsArray[ii]._id, hitsArray[ii]._source.title, hitsArray[ii]._source.salePrice,hitsArray[ii]._source.images[0]);
                  // itemList.push(newItem);
                  // console.log(itemList[ii].name);
                // }
                // isloading=0;
              // }
          // }.bind(this),
          // error: function(xhr) {
            // isloading=0;
            // alert("Something went wrong");
          // }
        // });
  // }
////////////////INDEX.JS Only

var token="";
var jsresponse=[];
var authorized=0;



function rockOn(){
	console.log("we rock");
}


// Transition Functions
function setToken(e){
	jsresponse=e;
	token=jsresponse.access_token;
	authorized=1;
}

function logOutHandler(){
	token="";
	authorized=0;
	jsresponse=[];
}

// Rendering Functions
function renderHome(){
	var elems=(
		<Home key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} setlogOut={logOutHandler.bind(this)}/>
	);
	return elems;
}
function renderLogin(){
	if(authorized == 1){
		return renderHome();
	}
	var elems=(
		<Login key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} />
	);
	return elems;
}
function renderRegistration(){
	if(authorized == 1){
		return renderHome();
	}
	var elems=(
		<Registration key={authorized+1} auth={authorized} jsresp={jsresponse} token={token} setToken2={setToken.bind(this)} />
	);
	return elems;	
}
function renderMyFlights(){
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
			<Route exact path={'/'} render={renderHome.bind(this)}/>
			<Route exact path={'/login'} render={renderLogin.bind(this)} />
			<Route exact path={'/registration'} render={renderRegistration.bind(this)} />
			<Route exact path={'/myflights'} render={renderMyFlights.bind(this)} />
			<Route exact path={'/logout'} render={renderLogout.bind(this)} />
		</Switch>
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
