import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import windowSize from 'react-window-size';
import $ from 'jquery/src/jquery';

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

var uk=0;


class Topbar extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth
		};
		this.setCurrent=this.setCurrent.bind(this);
		this.render_bar = this.render_bar.bind(this);
	}
	setCurrent(e){
		this.props.setCurr(e);
	}
	render_bar(){
		var rightSide;
		if(this.state.auth==0){
			rightSide=(
				<div className="w3-right w3-hide-small w3-margin-top">
					<button className="w3-button w3-ripple w3-bar-item barFont" onClick={this.setCurrent.bind(this,1)} >{'Sign In'} </button> 
					<button className="w3-button w3-ripple w3-bar-item barFont w3-margin-right" onClick={this.setCurrent.bind(this,2)} >{'Sign Up'} </button> 
				</div>
			);
		}
		else if(this.state.auth==1){
			rightSide=(
				<div className="w3-right w3-hide-small w3-margin-top">
					<button className="w3-button w3-ripple w3-bar-item barFont" onClick={this.setCurrent.bind(this,3)} >{'My Flights'} </button> 
					<button className="w3-button w3-ripple w3-bar-item barFont w3-margin-right" onClick={this.setCurrent.bind(this,4)} >{'Sign Out'} </button> 
				</div>
			);
		}
		var outer=(
			<div class="w3-bar w3-black w3-border-bottom w3-xlarge">
				<a onClick={this.setCurrent.bind(this,0)} class="w3-bar-item w3-button w3-text-red w3-hover-red logoFont w3-xxlarge"><b><i class="fa fa-map-marker w3-margin-right"></i>{'MawaBD'}</b></a>
				{rightSide}
			</div>
		);
		return outer;
	}
	render(){
		return(
			<div>
			{this.render_bar()}
			</div>
		);
	}
}
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
		this.setCurrent=this.setCurrent.bind(this);
		this.toggleOne=this.toggleOne.bind(this);
		this.renderDates=this.renderDates.bind(this);
		this.render_Search=this.render_Search.bind(this);
	}
	setParams(){
		//do something with this searchVal query using API
		
		this.setState({params:1});
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
	render_Search(){
		var mxWidthStyle={
			maxWidth: 2400
		};
		var inputClass;
		if(this.state.one_way==0){
			inputClass=(
				<div>
					<label>Return</label>
					<input class="w3-input w3-border" type="date"  required/>
				</div>
			);
		}
		else{
			inputClass=(
				<div>
				</div>
			);
		}
		var elems=(
			
			<header class="w3-display-container w3-content w3-hide-small" style={mxWidthStyle}>
			  <img class="w3-image" src="\images\img1.jpg" alt="London"/>
			  <div class="w3-display-topmiddle wdth65">
				<div class="w3-bar w3-black">
				  <button class="w3-bar-item w3-button tablink w3-red" ><i class="fa fa-plane w3-margin-right"></i>Flight</button>
				</div>

				<div id="Flight" class="w3-container w3-white w3-padding-16">
				  <h3>Travel the world with us</h3>
				  <div class="w3-bar w3-center">
					<button class={"w3-bar-item w3-button "+(this.state.one_way==0?"w3-green":"w3-red")+" w3-hover-green w3-round w3-padding"} onClick={this.toggleOne.bind(this,0)}>Round Trip </button>
					<button class={"w3-bar-item w3-button "+(this.state.one_way==1?"w3-green":"w3-red")+" w3-hover-green w3-round w3-padding w3-margin-left"} onClick={this.toggleOne.bind(this,1)}>One Way </button>
				  </div>
				  <br/>
				  <div class="w3-row-padding marge016">
					<div class="w3-half">
					  <label>From</label>
					  <input class="w3-input w3-border" type="text" placeholder="Departing from" required/>
					</div>
					<div class="w3-half">
					  <label>To</label>
					  <input class="w3-input w3-border" type="text" placeholder="Arriving at" required/>
					</div>
				  </div>
				  <br/>
				  <div class="w3-row-padding marge016">
					<div class="w3-half">
					  <label>Departure</label>
					  <input class="w3-input w3-border" type="date" required/>
					</div>
					<div class="w3-half">
					{inputClass}
					</div>
				  </div>
				  <br/>
				  <div class="w3-row-padding marge016">
					<div class="w3-half">
					  <label>Adult(12+)</label> <br/>
					  <select class="w3-select w3-border" id="adultCount" required>
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
					<div class="w3-half">
					  <label>Children (2-11)</label> <br/>
					  <select class="w3-select w3-border" id="adultCount" required>
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
				  <div class="w3-row-padding marge016">
					<div class="w3-half">
					  <label>Infant (0-2)</label> <br/>
					  <select class="w3-select w3-border" id="adultCount" required>
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
					<div class="w3-half">
					  <label>Class</label> <br/>
					  <select class="w3-select w3-border" id="classVal" required>
						<option value="Economy">Economy</option>
						<option value="Premium Economy">Premium Economy</option>
						<option value="Business">Business</option>
						<option value="First">First</option>
					  </select>
					</div>
				  </div>
				  <br/>
				  <p><button class="w3-button w3-dark-grey">Search and find dates</button></p>
				</div>
			  </div>
			</header>
		);
		return elems;
	}
	render(){
		return(
			<div>
			{this.render_Search()}
			</div>
		)
		
	}
}
class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token
		};
		this.setCurrent=this.setCurrent.bind(this);
	}
	setCurrent(e){
		this.props.setCurr(e);
	}
	render(){
		if(this.state.auth === 0){
			return(
				<div>
					<Topbar key={1} auth={0} setCurr={this.setCurrent.bind(this)}/>
					<FlightSearch auth={0} setCurr={this.setCurrent.bind(this)}/>
				</div>
			);
		}
		else if(this.state.auth === 1){
			return(
				<div>
					<Topbar key={2} auth={1} setCurr={this.setCurrent.bind(this)}/>
					<FlightSearch auth={0} token={this.state.token} setCurr={this.setCurrent.bind(this)}/>
				</div>
			);
		}
	}
}
class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token
		};
		this.setCurrent=this.setCurrent.bind(this);
	}	
	setCurrent(e){
		this.props.setCurr(e);
	}
	render(){
		return(
			<div>
				<Topbar key={1} auth={0} setCurr={this.setCurrent.bind(this)}/>
				<div class="w3-container w3-center w3-black">
				  <div class="horizontal-center">
					<div class="w3-twothird w3-card w3-red w3-padding-32">
					  <h2 class="barFont">Welcome At MawaBD<br/>Please Sign In</h2>
					  <br/>
					  <br/>
					  <div class="w3-bar w3-padding-left w3-padding-right">
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Email</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="emailField" required/>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Password</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="passwordField" required/>
						</div>
					  </div>
					  <br/>
					  <div class="w3-bar w3-margin-top">
						<button class="w3-button w3-bar-item w3-cyan w3-round barFont">Sign In</button>
					  </div>
					  <br/>
					  <a href="">Forgot Password</a>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
class Registration extends Component{
	constructor(props){
		super(props);
		this.state={
			auth:this.props.auth,
			token:this.props.token
		};
		this.setCurrent=this.setCurrent.bind(this);
	}	
	setCurrent(e){
		this.props.setCurr(e);
	}
	render(){
		return(
			<div>
				<Topbar key={1} auth={0} setCurr={this.setCurrent.bind(this)}/>
				<div class="w3-container w3-center w3-black">
				  <div class="horizontal-center">
					<div class="w3-twothird w3-card w3-red w3-padding-32">
					  <h2 class="barFont">Welcome At MawaBD<br/>Fill in the following form to Sign Up</h2>
					  <br/>
					  <br/>
					  <div class="w3-bar w3-padding-left w3-padding-right">
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Gender</label> <br/>
						  <select class="w3-select w3-card w3-white " id="genderField" required>
							<option value="" disabled selected>Your Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						  </select>
						</div>        
						<div class="w3-bar-item w3-margin-left">
						  <label class="w3-left barFont">Title</label> <br/>
						  <select class="w3-select w3-card w3-white w3-padding-right" id="titleField" required>
							<option value="Mr">Mr</option>
							<option value="Ms">Ms</option>
							<option value="Mrs">Mrs</option>
							<option value="Dr">Dr</option>
						  </select>
						</div>
						<div class="w3-bar-item">
						  <label class="w3-left barFont">First Name</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your First Name" type="text" id="nameField1" required/>
						</div>
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Last Name</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Last Name" type="text" id="nameField2" required/>
						</div>
					  </div>
					  <br/>
					  <div class="w3-bar w3-padding-left w3-padding-right">
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Email</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Email" type="text" id="emailField" required/>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Password</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Your Password" type="password" id="passwordField" required/>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Re-type Password</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Retype Your Password" type="password" id="passwordField2" required/>
						</div>
					  </div>
					  <br/>
					  <div class="w3-bar w3-padding-left w3-padding-right">
						<div class="w3-bar-item">
						  <label class="w3-left barFont">Mobile Number</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="+880-1xxxxxxxxx" type="text" id="mobileField" required/>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Identification Type</label> <br/>
						  <select class="w3-select w3-card w3-white w3-padding-right" id="idTypeField" required>
							<option value="" disabled selected>Choose Identification Type</option>
							<option value="NID">National ID</option>
							<option value="Passport">Passport</option>
						  </select>
						</div>
						 <div class="w3-bar-item">
						  <label class="w3-left barFont">Identification Number</label> <br/>
						  <input class="w3-input w3-card w3-white" placeholder="Number according to chosen ID Type" type="text" id="idValField" required/>
						</div>
					  </div>
					  <br/> 
					  <div class="w3-bar w3-margin-top">
						<button class="w3-button w3-bar-item w3-cyan w3-round barFont">Sign Up</button>
					  </div>
					  <br/>
					</div>
				  </div>
				  <br/><br/>
				</div>
			</div>
		);
	}
}
class App extends Component{
	constructor(props){
		super(props);
		this.state={
			token:"",
			curr:0,
			auth:0,
		};
		this.setCurrent=this.setCurrent.bind(this);
		this.setAuth=this.setAuth.bind(this);
		this.home_render=this.home_render.bind(this);
		this.login_render=this.login_render.bind(this);
		this.reg_render=this.reg_render.bind(this);
		this.myflights_render=this.myflights_render.bind(this);
		this.logout_handler=this.logout_handler.bind(this);
	}
	logout_handler(){
		//run API to logout
		
		this.setState({
			token:"",
			curr:0,
			auth:0
		});
		return;
	}
	setCurrent(e){
		if(e>=0 && e<=3){
			this.setState({curr:e});
		}
		else if(e==4){
			this.logout_handler();
		}
		return;
	}
	setAuth(tok){
		this.setState({
			auth:1,
			token:tok,
			curr:0
		});
		return;
	}
	home_render(){
		if(this.state.auth===0){
			var elems;
			elems=(
				<Home key={1} auth={this.state.auth} setCurr={this.setCurrent.bind(this)}/>
			);
			return elems;
		}
	}
	login_render(){
		return(
			<Login key={1} auth={this.state.auth} setCurr={this.setCurrent.bind(this)}/>
		);
	}
	reg_render(){
		return(
			<Registration key={1} auth={this.state.auth} setCurr={this.setCurrent.bind(this)}/>
		);
	}
	myflights_render(){
		
	}
	render(){
		switch(this.state.curr){
			case 0:
				return(
					<Router>
						<div>
							<Redirect to={'/'} />
							<Route exact path={'/'} render={this.home_render.bind(this)} />
						</div>
					</Router>	
					
				);
				break;
			case 1:
				return(
					<Router>
						<div>
							<Redirect to={'/login'} />
							<Route exact path={'/login'} render={this.login_render.bind(this)} />
						</div>
					</Router>
				);
				break;
			case 2:
				return(
					<Router>
						<div>
							<Redirect to={'/registration'} />
							<Route exact path={'/registration'} render={this.reg_render.bind(this)} />
						</div>
					</Router>
				);
				break;
			case 3:
				return(
					<h1> NOT DONE YET </h1>
				);
				break;
			default:
				return(
					<div>
						<p> App Crashed, Please Reload </p>
					</div>
				);
				break;
		}
		
	}
	
}