import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from "react";
import { Options } from "./Components/Options";
import { Dropdown } from './Containers/Dropdown';
import { Table } from './Components/Module Table'

let total = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      faculty: null,
      dummyfac: [{'Business': [{'Business Administration': ['A', 'B']},
                                {'Accountancy': ['C', 'D']}]},
                {'FASS': [{'C': ['N/A']},
                          {'D': ['N/A']}]}],
      major: null,
      specialisation: null,
      residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
      residence: 'N/A',
      GEMs: [
        {"GEH: Human Culture": [{code: 'GEH1001', 
                                name: 'Globalisation and New Media', 
                                MCs: 4, 
                                link: 'NUS MODS link'},
                                {code: 'GEH1002', 
                                name: 'lallalalal', 
                                MCs:4, 
                                link: 'asdfa'},
                                {code: 'GEH23420', 
                                name: 'lafjkljwe', 
                                MCs: 4, 
                                link: 'aser'}]}, //end of first object member
        
        {"GES: Singapore Studies": [{code: 'GES324230', 
                                    name: 'adkfjkjfklasj', 
                                    MCs: 4, 
                                    link: 'asdfew'}]} //end of object 2
        ],
      coreModules: [
        {code: "MA1521",
         name: "Calculus for Computing",
         MCs: 4,
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
        ],
         //NEED TO INPUT: array of objects with properties code, name, link to NUSMods description
      specialisationModules: [
        {code: "MA1531",
         name: "Calculus not Computing",
         MCs: 4,
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
         {code: "MA1531",
         name: "Calculus not Computing",
         MCs: 4,
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
      ],
      
      unrestrictedModules: [{code: "MA1521",
      name: "Calculus for Computing",
      MCs: 4,
      link: "https://nusmods.com/modules/MA1521/calculus-for-computing"},
     ],

     summary: [{cat: "General Elective Module",
                MCs: 20},
               {cat: "Core Module",
                MCs: 100},
               {cat: "Specialisation Module",
                MCs: 30},
               {cat: "Unrestricted Module",
                MCs: 20},
              ],
    isModuleClicked: false
    }
    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeMajor=this.changeMajor.bind(this);
    this.generateOptions =this.generateOptions.bind(this);
    this.makeTable = this.makeTable.bind(this);
    this.generateDropDown = this.generateDropDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
  const response = await fetch('/express_backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
  };

  //receive the choice of faculty from options.js and change state of faculty
  changeFaculty(value, index) {
    this.setState({
      faculty: value,
      facIndex: index,
      major: null
    });
  }

  changeMajor(value, index) {
    this.setState({
      major: value,
      majorIndex: index
    });
  }


  //turn array of choices into options dropdown
  generateOptions(choices) {
    let facIndex = this.state.facIndex;
  if(choices === 'faculty'){
    return this.state.dummyfac.map((obj) => {
      return (
      <option value={Object.keys(obj)}>
        {Object.keys(obj)}
      </option>
      );
    });
  } else if(choices === 'major') {
      if(this.state.faculty) {
    return this.state.dummyfac
           [facIndex]
           [this.state.faculty].map((obj) => {
                  return (
                    <option value={Object.keys(obj)}>
                      {Object.keys(obj)}
                    </option>
                  )
              }
    )}
  } else if(choices === 'specialisation') {
      if(this.state.major && this.state.faculty) {
      return this.state.dummyfac
             [facIndex]
             [this.state.faculty][this.state.majorIndex][this.state.major].map((item) => {
                  return (
                    <option>
                      {item}
                    </option>
                  )
                }    
      )}
  } else {
    return this.state.residenceOptions.map((obj) => {
      return (
      <option value={obj}>
        {obj}
      </option>
      );
    });
  }
}

  //takes in array of objects for modules and return a table
  makeTable(item, moduleCat, index) {
    if(item === 'summary') {
      return this.state.summary.map((module) => {
      const { cat, MCs } = module;
      total += MCs;
      return(
        <div>
          <tr key={cat}>
            <td>{cat}</td>
            <td>{MCs}</td>
          </tr>
        </div>
      )
      }
    )}

    else{
    let propfunction;
      if (item === 'module'){
        propfunction = this.state.coreModules;
      }
      else if(item === 'specialisation') {
        propfunction = this.state.specialisationModules;
      } 
      else if(item === 'unrestricted') {
        propfunction = this.state.unrestrictedModules;
      } 
      else {
        propfunction = this.state.GEMs[index][moduleCat]
      }

   return propfunction.map((module) => {
        const { code, name, MCs, link } = module
        if(item === 'GEM') {
          return (
            <div>
                <tr key={code}
                    onClick={() => this.handleClick(code, name)}>
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{MCs + 'MCs'}</td>
                </tr>
            </div>
        )
        } else{
        return (
            <div>
                <tr key={code}>
                <a href={link} 
                           target="_blank" 
                           className="text-white text-decoration-none">
                    <td>{code}</td>
                    <td>{name}</td>
                    <td>{MCs + 'MCs'}</td>
                    </a>
                </tr>
            </div>
        )}
   })
  }
}

  generateDropDown() {
    if(this.state.residence === 'N/A') {
      return (<div>
      <h3>General Elective Modules</h3>
      {this.state.GEMs.map((module, i) => {
        const GEMCat = Object.keys(module)[0]
        return (
        <div>
        <Dropdown title={this.state.isModuleClicked ? this.state.GEMTitle : GEMCat}
          id={"GEM_" + i}
          target={"GEM_" + i}
        module={this.makeTable('GEM', GEMCat, i)} />
        </div>
        )
      })}
        </div>)
    }
    
    else if(this.state.residence === 'CAPT') {

    }
  }

  handleClick(code, name) {
    const title = code + ': ' + name;
    this.setState({isModuleClicked: true,
      GEMTitle: title});
  }

  
  render() {
       return (
       <div class="full-container bg-dark text-white">
         <div className="row">
          <h1 className="display-3">
            Module Overview
          </h1>
        </div>

       <div className="row text-left"> 
          <Options onFacultyChange={this.changeFaculty}
                   onMajorChange={this.changeMajor}
                   faculty={this.state.faculty}
                   facultyOptions={this.generateOptions('faculty')}
                   majorOptions={this.generateOptions('major')}
                   specialisationOptions={this.generateOptions('specialisation')}
                   residenceOptions={this.generateOptions()}/>
        </div>

        <div className="row"> 





          <div className="col-lg col-md-4 col-sm-6">
              {this.generateDropDown()}
          </div>


















          <div className="col-lg col-md-4 col-sm-6">
              <Table
                title="Core Modules"
                module={this.makeTable('module')} />
          </div>

          <div className="col-lg col-md-4 col-sm-6">
            <Table 
              title="Specialisation Modules"
              module={this.makeTable('specialisation')} />
          </div>

          <div className="col-lg col-md-6 col-sm-6">
            <Table
                title="Unrestricted Electives"
                 module={this.makeTable('module')} />
          </div>

          <div className="col-lg col-md-6">
            <Table
              title="Total Modular Credits"
              module={this.makeTable('summary')}
              total={total}/>
          </div>

        </div>
        </div>

   );
    }
}


export default Main;

