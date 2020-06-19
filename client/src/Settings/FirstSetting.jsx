import React from 'react';
import { Options } from '../Pages/Module Selection Page/ModuleList';
import { Link } from 'react-router-dom';

class FirstSetting extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        faculty: null,
        major: null,
        specialisation: null,
        residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
        residence: 'N/A',
        matriculationYearOptions: ['AY 20/21 (Year 1)','AY 19/20 (Year 2) ', 'AY 18/19 (Year 3)', 'AY 17/18 (Year 4)','AY 16/17 (Year 5)', 'AY 15/16 (Year 6)'],
        matriculationYear: null,
        dummyfac: [{'Business': [{'Business Administration': ['A', 'B']},
                                {'Accountancy': ['C', 'D']}]},
                {'FASS': [{'C': ['N/A']},
                            {'D': ['N/A']}]},
                {
                    'Computing': [
                                    {'Computer Science': ['N/A']},
                                    {'Business Analytics': ['N/A']}
                    ]
                }],
        
    };

    this.changeFaculty = this.changeFaculty.bind(this);
    this.changeMajor=this.changeMajor.bind(this);
    this.changeSpecialisation= this.changeSpecialisation.bind(this);
    this.changeResidence= this.changeResidence.bind(this);
    this.generateOptions =this.generateOptions.bind(this);
}

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

  changeSpecialisation(value) {
    this.setState({
      specialisation: value,
    });
  }
  changeResidence(value) {
    this.setState({
      residence: value,
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
  } else if(choices === 'residence') {
    return this.state.residenceOptions.map((obj) => {
      return (
      <option value={obj}>
        {obj}
      </option>
      );
    });
  } else if(choices === 'matriculationYear') {
    return this.state.matriculationYearOptions.map((obj) => {
      return (
      <option value={obj}>
        {obj}
      </option>
      );
    });
  }
}
    render() {
        return (
            <div>
            <h5>Enter your particulars so that we can personalise your user experience!</h5>
            <label for="username">Username</label>
            <input type="text" />
            <Options onFacultyChange={this.changeFaculty}
          onMajorChange={this.changeMajor}
          onSpecialisationChange={this.changeSpecialisation}
          onResidenceChange={this.changeResidence}
          facultyOptions={this.generateOptions('faculty')}
          majorOptions={this.generateOptions('major')}
          specialisationOptions={this.generateOptions('specialisation')}
          residenceOptions={this.generateOptions('residence')}
          matriculationYearOptions={this.generateOptions('matriculationYear')}
          username="abc" //need to change
          major={this.state.major}
          specialisation={this.state.specialisation}
          residence={this.state.residence}
          />

              <Link
                to="/dashboard"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
                dashboard
              </Link>
            </div>
        );
    }
}



export default FirstSetting;