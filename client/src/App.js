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
      facultyOptions: '',
      major: '',
      specialisationOptions: '',
      residence: 'N/A',
      coreModules: [
        {code: "MA1521",
         name: "Calculus for Computing",
         link: "https://nusmods.com/modules/MA1521/calculus-for-computing"}]
         //NEED TO INPUT: array of objects with properties code, name, link to NUSMods description
      }
    this.changeFaculty = this.changeFaculty.bind(this);
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
  changeFaculty(newFaculty, newSpecialisation) {
    this.setState({
      facultyOptions: newFaculty,
      specialisationOptions: newSpecialisation
    });
  }

  render() {
       return (
       <div className="App">
          <h1 className="App-title">Module Overview</h1>

          <Options onChange={this.changeFaculty} 
            facultyOptions={this.state.facultyOptions}
            specialisationOptions={this.state.specialisationOptions}/>

          <Dropdown title="GER 1000: Quantitative Reasoning" items={items} />
          <Dropdown title="GEH: Human Cultures" items={items} />
          <Dropdown title="GEQ: Asking Questions" items={items} />
          <Dropdown title="GES: Singapore Studies" items={items} />
          <Dropdown title="GET: Thinking and Expression" items={items} />

          <Table
            module={this.state.coreModules} />
        
     </div>
   );
    }
}


export default Main;

