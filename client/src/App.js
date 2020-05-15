import React from "react";
import './App.css';
import { Options } from "./Components/Options";
import Dropdown from './Containers/GEM Dropdown';
import { Table } from './Containers/Core Modules'



const items = [
  {
    id: 1,
    value: 'GEH 1001: Globalisation and New Media',
  },
  {
    id: 2,
    value: 'GEH 1002: Economic Issues in Dev World',
  },
  {
    id: 3,
    value: 'GEH 1004: Chinese Heritage: History & Literature',
  },
];


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      facultyOptions: ['Choose Your Faculty','Arts and Social Sciences', 'Business', 
      'Computing', 'Dentistry',
      'Design & Environment', 'Engineering',
      'Law', 'Medicine', 'Music','Science' ],
      faculty: '',
      majorOptions: [],
      major: '',
      specialisationOptions: [],
      specialisation: '',
      residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
      residence: '',
      coreModules: [
        {code: "MA1521",
         name: "Calculus for Computing",
         MCs: 4,
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
        ],
         //NEED TO INPUT: array of objects with properties code, name, link to NUSMods description
      specialisationModules: [
        {code: "MA1531",
         name: "Calculus not Computing",
         MCs: 4,
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}
      ]
      }
    this.changeFaculty = this.changeFaculty.bind(this);
    this.generateOptions =this.generateOptions.bind(this);
    this.makeTable = this.makeTable.bind(this);
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
  changeFaculty(value, newMajorOptions, newSpecialisationOptions) {
    this.setState({
      faculty: value,
      majorOptions: newMajorOptions,
      specialisationOptions: newSpecialisationOptions
    });
  }

  //turn array of choices into options dropdown
  generateOptions(choices) {
    let func;
    if(choices === 'faculty'){
      func = this.state.facultyOptions
    } else if(choices === 'major') {
      func = this.state.majorOptions
      
    } else if(choices === 'specialisation') {
      func = this.state.specialisationOptions
    } else {
      func = this.state.residenceOptions
    }
    return func.map((faculties) => {
      if(faculties === 'Choose Your Faculty') {
        return (<option selected disabled>
               {faculties}
               </option>);
      } else{
          return (<option value={faculties} >
                  {faculties}
                 </option>);}
          
    });
  }

  //takes in array of objects for modules and return a table
  makeTable(item) {
    let propfunction;
      if (item === 'module'){
        propfunction = this.state.coreModules;
      }
      else {
        propfunction = this.state.specialisationModules;
      }

   return propfunction.map((module) => {
        const { code, name, MCs, link } = module
        return (
            <div>
                <tr key={code}>
                    <td>{code}</td>
                    <td>
                        <a href={link} target="_blank">
                            {name}
                        </a>
                    </td>
                    <td>{MCs}</td>
                </tr>
            </div>
        )
   })
}

  render() {
       return (
       <div className="App">
          <h1 className="App-title">Module Overview</h1>

          <Options onChange={this.changeFaculty}
            facultyOptions={this.generateOptions('faculty')} 
            majorOptions={this.generateOptions('major')}
            specialisationOptions={this.generateOptions('specialisation')}
            residenceOptions={this.generateOptions()}/>
          
          <h3>General Elective Modules</h3>
          <Dropdown title="GER 1000: Quantitative Reasoning" items={items} />
          <Dropdown title="GEH: Human Cultures" items={items} />
          <Dropdown title="GEQ: Asking Questions" items={items} />
          <Dropdown title="GES: Singapore Studies" items={items} />
          <Dropdown title="GET: Thinking and Expression" items={items} />

          <Table
            module={this.makeTable('module')}
            specialisation={this.makeTable('specialisation')} />
        
     </div>
   );
    }
}


export default Main;

