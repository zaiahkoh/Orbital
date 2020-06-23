import React from 'react';
import { Options } from '../Pages/Module Selection Page/ModuleList';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateSettings, initialSettings, setCurrentSemester, 
          setMatriculationYearOptions, setTargetGradYearOptions } from "../actions/settingsActions";




class AcadSettings extends React.Component {
constructor(props) {
    super(props);

    this.state = {
        faculty: null,
        major: null,
        specialisation: null,
        residenceOptions: ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'],
        residence: 'N/A',
        matriculationYear: null,
        targetGraduationYear: null,
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
    this.changeMatriculationYear= this.changeMatriculationYear.bind(this);
    this.changeTargetGradYear= this.changeTargetGradYear.bind(this);
    this.generateOptions =this.generateOptions.bind(this);
}

componentWillMount () {
  const time = new Date();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const isSem2 = (month <= 7);
  let currentSemester;
  let currentAY;

  if(isSem2) {
    currentAY = `${year - 1}/${year}`
    currentSemester = "Semester 2"
  } else {
      currentAY = `${year}/${year + 1}`
      currentSemester = "Semester 1"
  }
    
  if(!this.props.settings.currentAY) {
    this.props.setCurrentSemester(currentAY, currentSemester);
  }

  if(!this.props.settings.userInfo) {
    this.props.initialSettings();
  }

  if(!this.props.settings.matriculationYearOptions) {
    this.props.setMatriculationYearOptions(currentAY, currentSemester)
  }
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

  changeMatriculationYear(value) {
    this.setState({
      matriculationYear: value,
    });
  }

  changeTargetGradYear(value) {
    this.setState({
      targetGraduationYear: value,
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
  } else {
      let options;

      if(choices === 'matriculationYear') {
        options = this.props.settings.matriculationOptions
      } else {
        options = this.props.settings.targetGradOptions
      }

    return options.map((option) => {
      return (
      <option value={option}>
        {option}
      </option>
      );
    });
  }
}

handleSubmit = () => {
  const userData = {
    faculty: this.state.faculty,
    major: this.state.major,
    specialisation: this.state.specialisation,
    residential: this.state.residence,
    matriculationYear: this.state.matriculationYear,
    targetGraduationYear: this.state.targetGraduationYear,
    name: this.props.settings.userInfo.name,
    modPlan: this.props.modplan
  }

  this.props.updateSettings(userData);
}

    render() {
        return (
            <div>
              <h5>Enter your particulars so that we can personalise your user experience!</h5>

              <Options 
                onFacultyChange={this.changeFaculty}
                onMajorChange={this.changeMajor}
                onSpecialisationChange={this.changeSpecialisation}
                onResidenceChange={this.changeResidence}
                onMatriculationChange={this.changeMatriculationYear}
                onTargetGradChange={this.changeTargetGradYear}
                facultyOptions={this.generateOptions('faculty')}
                majorOptions={this.generateOptions('major')}
                specialisationOptions={this.generateOptions('specialisation')}
                residenceOptions={this.generateOptions('residence')}
                matriculationYearOptions={this.generateOptions('matriculationYear')}
                targetGradYearOptions={this.generateOptions('targetGradYear')}
              />

              <Button class='button' onClick={this.handleSubmit}>Save Academic Settings</Button>
            </div>
        );
    }
}

AcadSettings.propTypes = {
  setUserSettings: PropTypes.func.isRequired,
  initialSettings: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  setMatriculationYearOptions: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modplan: state.modplan.selectedModules,
  settings: state.settings
});

export default connect(mapStateToProps, 
  { initialSettings, updateSettings, setCurrentSemester, setMatriculationYearOptions, setTargetGradYearOptions }) (AcadSettings);
