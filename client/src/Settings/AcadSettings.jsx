import React, {useState, useEffect, useReducer} from 'react';
import { Options } from '../Pages/Module Selection Page/ModuleList';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions } from "../actions/settingsActions";
import { deleteUser } from "../actions/authActions";
import isEmpty from "is-empty";
import { generateOptions } from '../utils/commonFunctions';



const AcadSettings = (props) => {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}), 
    {
      faculty: props.userInfo.faculty,
      facIndex: 2, //TEMPORARY
      major: props.userInfo.major,
      majorIndex: 0, //TEMPORARY
      specialisation: props.userInfo.specialisation,
      residence: props.userInfo.residential,
      matriculationYear: props.userInfo.matriculationYear,
      targetGradYear: props.userInfo.targetGradYear
    }
  )

  const residenceOptions = ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'];
  const dummyfac = [{'Business': [{'Business Administration': ['A', 'B']},
                    {'Accountancy': ['C', 'D']}]},
                  {'FASS': [{'C': ['N/A']},
                  {'D': ['N/A']}]},
                  {
                  'Computing': [
                        {'Computer Science': ['N/A']},
                        {'Business Analytics': ['N/A']}
                  ] 
  }];

  useEffect(() => {
    if(!isEmpty(props.settings.userInfo)) {

      if (isEmpty(props.settings.matriculationOptions)) {
        props.setMatriculationYearOptions(props.settings.currentAY, props.settings.currentSemester);
        props.setTargetGradYearOptions(props.settings.currentAY, props.settings.currentSemester);
      } 

      setUserInput({
        faculty: props.userInfo.faculty,
        facIndex: 2, //TEMPORARY
        major: props.userInfo.major,
        majorIndex: 0, //TEMPORARY
        specialisation: props.userInfo.specialisation,
        residence: props.userInfo.residential,
        matriculationYear: props.userInfo.matriculationYear,
        targetGradYear: props.userInfo.targetGradYear
      });
    }
  }, [props.settings.userInfo]);

  const handleChange = (e) => {
    const {name, value, selectedIndex} = e.target;

    if(name === "faculty") {
      setUserInput({[name]: value,
                      facIndex: (selectedIndex - 1),
                      major: null});

    } else if(name === "major") {
      setUserInput({[name]: value,
                      majorIndex: (selectedIndex - 1)});

    } else {
      setUserInput({[name]: value});
    } 

  };

 //turn array of choices into options dropdown
  const generateOptions = (choices) => {
    let facIndex = userInput.facIndex;
  if(choices === 'faculty'){
    return dummyfac.map((obj) => {
      return (
      <option value={Object.keys(obj)}>
        {Object.keys(obj)}
      </option>
      );
    });
  } else if(choices === 'major') {
      if(userInput.faculty) {
      return dummyfac
            [facIndex]
            [userInput.faculty].map((obj) => {
                    return (
                      <option value={Object.keys(obj)}>
                        {Object.keys(obj)}
                      </option>
                    )
                }
      )}
    } else if(choices === 'specialisation') {
        if(userInput.major && userInput.faculty) {
        return dummyfac
              [facIndex]
              [userInput.faculty][userInput.majorIndex][userInput.major].map((item) => {
                    return (
                      <option>
                        {item}
                      </option>
                    )
                  }    
        )}
    } else if(choices === 'residence') {
      return residenceOptions.map((obj) => {
        return (
        <option value={obj}>
          {obj}
        </option>
        );
      });
    } else {
        if(choices === 'matriculationYear') {
          return props.settings.matriculationOptions.map((option) => {
            return (
            <option value={option.substr(3,9)}>
              {option}
            </option>
            );
          });
        } else {
            return props.settings.targetGradOptions.map((option) => {
              return (
              <option value={option.substr(6,9)}>
                {option}
              </option>
              );
            });
          }
      }
}

const handleSubmit = () => {
  const userData = {
    faculty: userInput.faculty,
    facIndex: userInput.facIndex,
    major: userInput.major,
    major: userInput.majorIndex,
    specialisation: userInput.specialisation,
    residential: userInput.residence,
    matriculationYear: userInput.matriculationYear,
    targetGradYear: userInput.targetGradYear,
    name: props.settings.userInfo.name,
    modPlan: props.modplan
  }

  props.updateSettings(userData);
}

  return (
      <div className="container">
        <h5>Enter your particulars so that we can personalise your user experience!</h5>

        <form>
          <label>Your Faculty: {userInput.faculty}</label>
          <select
              name="faculty" 
              onChange={handleChange}
              value={userInput.faculty}>
                <option selected disabled>
                  Choose Your Faculty
                </option>
              {generateOptions("faculty")}
            </select>   
            <br/>
            <br/>

            <label>Your Major: {userInput.major}</label>
            <select
              name="major"
              onChange={handleChange}
              value={userInput.major}>
                (<option selected disabled>
                  Choose Your Major
                </option>)
              {generateOptions("major") }
            </select>
            <br/>
            <br/>

            <label>Your Specialisation: {userInput.specialisation}  </label>
            <select
              name="specialisation"
              onChange={handleChange}
              value={userInput.specialisation}>
                (<option selected disabled>
                  Choose Your Specialisation
                </option>)
              {generateOptions("specialisation")}
            </select>
            <br/>
            <br/>

            <label>Your Residential College: {userInput.residence}</label>
            <select
              name="residence"
              onChange={handleChange}
              value={userInput.residence}>
                (<option selected disabled>
                  Choose Your Residence
                </option>)
              {generateOptions("residence")}
            </select>
            <br/>
            <br/>

            <label>Year of Matriculation: {userInput.matriculationYear}</label>
            <select
              name="matriculationYear"
              onChange={handleChange}
              value={userInput.matriculationYear}>
                (<option selected disabled>
                  Choose Your Year of Matriculation
                </option>)
              {generateOptions("matriculationYear")}
            </select>
            <br/>
            <br/>

            <label>Target Graduation Year: {userInput.targetGradYear}</label>
            <select
              name="targetGradYear"
              onChange={handleChange}
              value={userInput.targetGradYear}>
                (<option selected disabled>
                  Choose Your Target Graduation Year
                </option>)
              {generateOptions("targetGradYear")}
            </select>
            <br/>
            <br/>
          </form>
        {/* <Options 
          faculty={this.state.faculty}
          major={this.state.major}
          specialisation={this.state.specialisation}
          residential={this.state.residence}
          matriculationYear={this.state.matriculationYear}
          targetGradYear={this.state.targetGradYear}
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
        /> */}

        <Button className='button' id='save' onClick={() => handleSubmit()}>Save Settings</Button>
        <Button className='button' id='delete' onClick={() => props.deleteUser()}>Delete Account</Button>
      </div>
  );
}


AcadSettings.propTypes = {
  updateSettings: PropTypes.func.isRequired,
  setMatriculationYearOptions: PropTypes.func.isRequired,
  setTargetGradYearOptions: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  modplan: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modplan: state.modplan.selectedModules,
  settings: state.settings,
  userInfo: state.settings.userInfo
});

export default connect(mapStateToProps, 
  { updateSettings, setMatriculationYearOptions, setTargetGradYearOptions, deleteUser }) (AcadSettings);
