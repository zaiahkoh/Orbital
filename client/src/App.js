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
  useRouteMatch,
  useParams
} from "react-router-dom";
import { ModTreeNav } from "./navbar";
import  ModulePlannerPageTemp  from "./Pages/Module Planner Page/ModulePlannerPage";
import { CAPCalculatorPage } from "./Pages/CAP Calculator Page/CAPCalculatorPage";
import FirstSetting from './Pages/Login/FirstSetting';
import PrivateRoute from './Components/PrivateRoute';



let totalGEMMCs = 0;

class App extends React.Component {

  render() {
      
       return (
         <div>
           <ModTreeNav/>
           <Switch>
             <Route exact path="/login" component={LoginPage}/>
             <PrivateRoute path="/select-modules" component={ModuleSelectionPage}/>
             <PrivateRoute path="/module-planner" component={ModulePlannerPageTemp}/>
             <PrivateRoute path="/cap-calculator" component={CAPCalculatorPage}/> 
             <PrivateRoute path="/first-setting" component={FirstSetting}/> 
           </Switch>
         </div>
   );
    }
}



export default App;




