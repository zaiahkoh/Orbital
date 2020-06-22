import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { ModuleSelectionPage } from "./Pages/Module Selection Page/ModuleSelectionPage"
import { LoginPage } from './Pages/Login/LoginPage'
import "./login.css";
import {
  Switch,
  Route,
} from "react-router-dom";

import { PrivateNav } from './Components/Navbar/PrivateNav';
import { PublicNav } from './Components/Navbar/PublicNav';
import  ModulePlannerPageTemp  from "./Pages/Module Planner Page/ModulePlannerPage";
import  CAPCalculatorPage  from "./Pages/CAP Calculator Page/CAPCalculatorPage";
import AcadSettings from './Settings/AcadSettings';

import PrivateRoute from './Components/PrivateRoute';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import PrivateRouteTemp from "./Components/PrivateRoute";
import Dashboard from "./Components/dashboard/Dashboard";

import ServerError from './Pages/Error Page/ServerError';

import store from './store';
import { connect } from 'react-redux';


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

let totalGEMMCs = 0;

class App extends React.Component {
  
  render() {
       return (
        <div>
          {this.props.isAuthenticated ? <PrivateNav class="navbar" /> : <PublicNav class="navbar" />}
          
          

          <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
            <PrivateRouteTemp 
              exact path="/dashboard" 
              component={Dashboard} />

            <PrivateRouteTemp 
                exact path="/select-modules" 
                component={ModuleSelectionPage} />

            <PrivateRouteTemp 
                exact path="/module-planner" 
                component={ModulePlannerPageTemp} />

            <PrivateRouteTemp 
                exact path="/cap-calculator" 
                component={CAPCalculatorPage} /> 

            <PrivateRouteTemp 
                exact path="/settings/academics" 
                component={AcadSettings} /> 

            <Route exact path="/500-error" component={ServerError}/>
            <Route component={() => <div className="display-2"><strong>404 NOT FOUND</strong></div>}/>
            
          </Switch>

           </div>

   );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(App);




