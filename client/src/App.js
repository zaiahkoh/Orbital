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
import  ModulePlannerPageTemp  from "./Pages/Module Planner Page/ModulePlannerPageTemp";
import { CAPCalculatorPage } from "./Pages/CAP Calculator Page/CAPCalculatorPage";
import AutoCompleteText from './Pages/Module Planner Page/AutocompleteText';


let totalGEMMCs = 0;

class App extends React.Component {

  render() {
      
       return (
         <div>
           <ModTreeNav/>
           <Switch>
             <Route exact path="/" component={LoginPage}/>
             <Route path="/select-modules" component={ModuleSelectionPage}/>
             <Route path="/module-planner" component={ModulePlannerPageTemp}/>
             <Route path="/cap-calculator" component={CAPCalculatorPage}/> 
           </Switch>
         </div>
   );
    }
}



export default App;




