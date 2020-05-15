import React from "react";

//list of faculties
const faculties = ['Choose Your Faculty','Arts and Social Sciences', 'Business', 
                  'Computing', 'Dentistry',
                  'Design & Environment', 'Engineering',
                  'Law', 'Medicine', 'Music','Science' ];


//list of majors for FASS
const fassAsianStudies = ['Chinese Language', 'Chinese Studies', 
                          'Japanese Studies', 'Malay Studies', 
                          'South Asian Studies', 'Southeast Asian Studies'];

const fassHumanities = ['English Language', 'English Literature',
                        'History', 'Philosophy', 'Theater Studies'];

const fassSocialSciences = ['Communications and New Media', 'Economics',
                            'Geography', 'Political Science', 'Psychology',
                            'Social Work', 'Sociology'];

const fassMultidisciplinary = ['Global Studies', 
                              'Philosophy, Politics, and Economics'];

const fassCombined = fassAsianStudies.concat(fassHumanities,
                                            fassSocialSciences,
                                            fassMultidisciplinary);

//list of majors for business
const business = ['Accountancy', 'Business Administration'];

//list of majors for computing
const computing = ['Business Analytics', 'Computer Engineering', 
                  'Computer Science', 'Information Security',
                  'Information Systems'];

//list of majors for SDE
const designAndEnvironment = ['Architecture', 'Industrial Design',
                              'Landscape Architecture', 
                              'Project & Facilities Management', 'Real Estate'];

//list of majors for engineering
const engineering = ['Biomedical Engineering', 'Chemical Engineering',
                     'Civil Engineering', 'Computer Engineering', 
                      'Electrical Engineering', 'Engineering Science Programme',
                      'Environmental Engineering', 'Industrial & Systems Engineering',
                      'Materials Science & Engineering', 'Mechanical Engineering'];

//list of majors for medicine
const medicine = ['Medicine', 'Nursing'];

//list of majors for science
const science = ['Chemistry', 'Computational Biology', 
                'Data Science & Analytics', 'Environmental Studies',
                'Food Science and Technology', 'Life Sciences', 'Mathematics',
                'Pharmaceutical Science', 'Pharmacy', 'Physics', 'Statistics'];

//list of specialisation for business
const businessSpecialisation = ['N/A','Business Analytics', 
                                'Innovation and Entrepreneurship'
                              ];

//list of residential colleges
const residence = ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'];

export class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);

  }

  //when users pick their faculty, it sends the choice to app.js
  handleFacultyChange(e, category) {
    let value = e.target.value;  
    let majorOptions;
    let specialisation;
    
      if (value === 'Arts and Social Sciences') {
        majorOptions = fassCombined;
        specialisation = businessSpecialisation;
      } 

      else if(value === 'Business') {
        majorOptions = business;
        specialisation = businessSpecialisation;
      }

      else if(value === 'Computing') {
        majorOptions = computing;
        specialisation = businessSpecialisation;
      }

      else if(value === 'Design & Environment') {
        majorOptions = designAndEnvironment;
        specialisation = businessSpecialisation;
      }

      else if(value === 'Engineering') {
        majorOptions = engineering;
        specialisation = businessSpecialisation;
      }

      else if(value === 'Medicine') {
        majorOptions = medicine;
        specialisation = businessSpecialisation;
      }

      else if(value === 'Science') {
        majorOptions = science;
        specialisation = businessSpecialisation;
      }

      else {
        majorOptions = <option>N/A</option>
      }
    this.props.onChange(value, majorOptions, specialisation);
  }
  
  
  

  render() {
      return (
       <div>
      <form action="http://localhost:5001/" method="POST">
       <label>Your Faculty  </label>
       <select
          id="Faculty" 
          onChange={this.handleFacultyChange}>
           {this.props.facultyOptions}
        </select>   
        <br/>
        <br/>

        <label>Your Major  </label>
        <select
          id="Major"
          onChange={this.handleFacultyChange}>
           {this.props.majorOptions}
        </select>
        <br/>
        <br/>

        <label>Your Specialisation  </label>
        <select
          id="Specialisation">
           {this.props.specialisationOptions}
        </select>
        <br/>
        <br/>

        <label>Your Residential College  </label>
        <select
          id="Residence">
           {this.props.residenceOptions}
        </select>
        <br/>
        <br/>

        <input type="submit" name="submit" value="Create Module Plan"/>
      </form>
      </div>
      )}};