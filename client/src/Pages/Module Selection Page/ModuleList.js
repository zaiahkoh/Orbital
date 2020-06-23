import React from "react";



export class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
    this.handleMajorChange = this.handleMajorChange.bind(this);
    this.handleSpecialisationChange = this.handleSpecialisationChange.bind(this);
    this.handleResidenceChange= this.handleResidenceChange.bind(this);
    this.handleMatriculationChange= this.handleMatriculationChange.bind(this);
    this.handleTargetGradChange= this.handleTargetGradChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  //when users pick their faculty, it sends the choice to app.js
  handleFacultyChange(e) {
    let value = e.target.value;
    let index = (e.target.selectedIndex - 1)
    this.props.onFacultyChange(value, index);
  }
  
  handleMajorChange(e) {
    let value = e.target.value;
    let index = (e.target.selectedIndex - 1)
    this.props.onMajorChange(value, index);
  }

  handleSpecialisationChange(e) {
    let value = e.target.value;
    this.props.onSpecialisationChange(value);
  }

  handleResidenceChange(e) {
    let value = e.target.value;
    this.props.onResidenceChange(value);
  }
  
  handleMatriculationChange(e) {
    let value = e.target.value;
    this.props.onMatriculationChange(value);
  }

  handleTargetGradChange(e) {
    let value = e.target.value;
    this.props.onTargetGradChange(value);
  }
  // requestRules = async() => {
  //   try{
  //     const response = await fetch('http://localhost:5001/', { cache: 'no-cache'})
  //     if(response.ok) {
  //       const jsonResponse = await response.json();
  //       console.log(jsonResponse);
  //     }
  //   }
  //   catch(error){
  //     alert('nope');
  //     console.log(error);
  //   }
  // }

    

  handleSubmit(e) {
    e.preventDefault();
    
  }


  render() {
      return (
       <div>
      <form onSubmit={this.handleSubmit}>
       <label>Your Faculty:  </label>
       <select
          id="Faculty" 
          onChange={this.handleFacultyChange}>
            <option selected disabled>
              Choose Your Faculty
             </option>
           {this.props.facultyOptions}
        </select>   
        <br/>
        <br/>

        <label>Your Major  </label>
        <select
          id="Major"
          onChange={this.handleMajorChange}>
            (<option selected disabled>
              Choose Your Major
             </option>)
           { this.props.majorOptions }
        </select>
        <br/>
        <br/>

        <label>Your Specialisation  </label>
        <select
          id="Specialisation"
          onChange={this.handleSpecialisationChange}>
             (<option selected disabled>
              Choose Your Specialisation
             </option>)
           {this.props.specialisationOptions}
        </select>
        <br/>
        <br/>

        <label>Your Residential College  </label>
        <select
          id="Residence"
          onChange={this.handleResidenceChange}>
             (<option selected disabled>
              Choose Your Residence
             </option>)
           {this.props.residenceOptions}
        </select>
        <br/>
        <br/>

        <label>Year of Matriculation  </label>
        <select
          id="matriculationYear"
          onChange={this.handleMatriculationChange}>
             (<option selected disabled>
              Choose Your Year of Matriculation
             </option>)
           {this.props.matriculationYearOptions}
        </select>
        <br/>
        <br/>

        <label>Target Graduation Year</label>
        <select
          id="graduationYear"
          onChange={this.handleTargetGradChange}>
             (<option selected disabled>
              Choose Your Target Graduation Year
             </option>)
           {this.props.targetGradYearOptions}
        </select>
        <br/>
        <br/>

        {/* <label>Current CAP</label>
        <input 
          type='number' 
          id='currentCAP' 
          name='currentCAP'
          min='1.0'
          max='5.0'
          step='0.01'/>
        <br/>
        <br/> */}

      </form>
      </div>
      )}};


