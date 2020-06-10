import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { ModuleSelectionPage } from "./Pages/Module Selection Page/ModuleSelectionPage"
import { Login, Register, LoginPage } from './Pages/Login/LoginPage'
//import "./App.scss";
import {
  Switch,
  Route,
} from "react-router-dom";
import { ModTreeNav } from "./navbar";
import  ModulePlannerPageTemp  from "./Pages/Module Planner Page/ModulePlannerPage";
import { CAPCalculatorPage } from "./Pages/CAP Calculator Page/CAPCalculatorPage";
import FirstSetting from './Pages/Login/FirstSetting';
import PrivateRoute from './Components/PrivateRoute';
import { Provider } from "react-redux";
import store from './store';



let totalGEMMCs = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }

    this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }

  updateLoginStatus(status) {
    this.setState({isLoggedIn: status});
  }

  render() {
      
       return (
         <Provider store={store}>
           <ModTreeNav />
           
           <Switch>
            <Route 
                exact path="/" 
                component={() => 
                  <LoginPage 
                    isLoggedIn={this.state.isLoggedIn} 
                    updateLoginStatus={this.updateLoginStatus}
                    location/>}/>
             <Route 
                exact path="/login" 
                component={() => 
                  <LoginPage 
                    isLoggedIn={this.state.isLoggedIn} 
                    updateLoginStatus={this.updateLoginStatus}
                    location/>}/>

             <PrivateRoute 
                path="/select-modules" 
                component={ModuleSelectionPage} 
                isLoggedIn={this.state.isLoggedIn}/>

             <PrivateRoute 
                path="/module-planner" 
                component={ModulePlannerPageTemp} 
                isLoggedIn={this.state.isLoggedIn}/>

             <PrivateRoute 
                path="/cap-calculator" 
                component={CAPCalculatorPage} 
                isLoggedIn={this.state.isLoggedIn}/> 

             <PrivateRoute 
                path="/first-setting" 
                component={FirstSetting} 
                isLoggedIn={this.state.isLoggedIn}/> 

              <Route component={() => <div className="display-2"><strong>404 NOT FOUND</strong></div>}/>
           </Switch>
         </Provider>
   );
    }
}



export default App;




