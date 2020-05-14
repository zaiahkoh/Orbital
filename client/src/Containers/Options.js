import React from "react";

//list of faculties
const faculties = ['Choose One','Arts and Social Sciences', 'Business', 
                  'Computing', 'Dentistry',
                  'Design & Environment', 'Engineering',
                  'Law', 'Medicine', 'Music','Science' ];

//to map faculties as options
const facultyOptions = faculties.map((faculties) => 
  {if(faculties === 'Choose One') {
    return (<option selected disabled>
              {faculties}
            </option>);
  } else{
    return (<option value={faculties} >
              {faculties}
            </option>);}
  });

//list of majors for FASS
const fassAsianStudies = ['Chinese Language', 'Chinese Studies', 
                          'Japanese Studies', 'MalayStudies', 
                          'South Asian Studies', 'Southeast Asian Studies'];

const fassHumanities = ['English Language', 'English Literature',
                        'History', 'Philosophy', 'Theater Studies'];

const fassSocialSciences = ['Communications and New Media', 'Economics',
                            'Geography', 'Political Science', 'Psychology',
                            'Social Work', 'Sociology'];

const fassMultidisciplinary = ['Global Studies', 
                              'Philosophy, Politics, and Economics'];

const fassCombined = ['AsianStudies'].concat(fassAsianStudies, 
                                            ['Humanities'],
                                            fassHumanities,
                                            ['Social Sciences'],
                                            fassSocialSciences,
                                            ['Multidisciplinary'],
                                            fassMultidisciplinary);
//to map FASS as options
const fassOptions = fassCombined.map((fass) => {
  if(fass === 'AsianStudies' 
    || fass === 'Humanities' 
    || fass === 'Social Sciences' 
    || fass === 'Multidisciplinary') {
      return (<option disabled>
            {fass}
            </option>);
  } else{
    return (<option value={faculties} >
            {fass}
            </option>);}
  });

//list of majors for business
const business = ['Accountancy', 'Business Administration'];

//to map Business as options
const businessOptions = business.map((business) => 
                          (<option value={business} >
                            {business}
                              </option>)
                          );

//list of majors for computing
const computing = ['Business Analytics', 'Computer Engineering', 
                  'Computer Science', 'Information Security',
                  'Information Systems'];

//to map computing as options
const computingOptions = computing.map((computing) => 
                          (<option value={computing} >
                          {computing}
                          </option>)
                          );

//list of majors for SDE
const designAndEnvironment = ['Architecture', 'Industrial Design',
                              'Landscape Architecture', 
                              'Project & Facilities Management', 'Real Estate'];
//to map SDE as options
const SDEOptions = designAndEnvironment.map((SDE) => 
                          (<option value={SDE} >
                          {SDE}
                          </option>)
                          );

//list of majors for engineering
const engineering = ['Biomedical Engineering', 'Chemical Engineering',
                     'Civil Engineering', 'Computer Engineering', 
                      'Electrical Engineering', 'Engineering Science Programme',
                      'Environmental Engineering', 'Industrial & Systems Engineering',
                      'Materials Science & Engineering', 'Mechanical Engineering'];

//to map engineering as options
const engineeringOptions = engineering.map((e) => 
                          (<option value={e} >
                          {e}
                          </option>)
                          );

//list of majors for medicine
const medicine = ['Medicine', 'Nursing'];

//to map medicine as options
const medicineOptions = medicine.map((e) => 
                          (<option value={e} >
                          {e}
                          </option>)
                          );

//list of majors for science
const science = ['Chemistry', 'Computational Biology', 
                'Data Science & Analytics', 'Environmental Studies',
                'Food Science and Technology', 'Life Sciences', 'Mathematics',
                'Pharmaceutical Science', 'Pharmacy', 'Physics', 'Statistics'];

//to map science as options
const scienceOptions = science.map((e) => 
                          (<option value={e} >
                          {e}
                          </option>)
                          );

//list of specialisation for business
const businessSpecialisation = ['N/A','Business Analytics', 
                                'Innovation and Entrepreneurship',

        ];
const businessSpecialisationOptions = businessSpecialisation.map((e) => 
    (<option value={e} >
      {e}
      </option>)
    );



//list of residential colleges
const residence = ['N/A','CAPT', 'RC4', 'RVRC','Tembusu', 'USP'];

//to map residence as options
const residenceOptions = residence.map((residence) => 
  (<option value={residence} >
    {residence}
    </option>)
  );

export class Options extends React.Component {
  constructor(props) {
    super(props);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
  }

  //when users pick their faculty, it sends the choice to app.js
  handleFacultyChange(e) {
    let value = e.target.value;  
    let faculty;
    let specialisation;
   
      if (value=== 'Arts and Social Sciences') {
        faculty = fassOptions;
      } 

      else if(value === 'Business') {
        faculty = businessOptions;
        specialisation = businessSpecialisationOptions;
      }

      else if(value === 'Computing') {
        faculty = computingOptions;
      }

      else if(value === 'Design & Environment') {
        faculty = SDEOptions;
      }

      else if(value === 'Engineering') {
        faculty = engineeringOptions;
      }

      else if(value === 'Medicine') {
        faculty = medicineOptions;
      }

      else if(value === 'Science') {
        faculty = scienceOptions;
      }

      else {
        faculty = <option>N/A</option>
      }
    this.props.onChange(faculty, specialisation);
  }

  render() {
      return (
       <div>
      <form action="fill in with the server destination " method="POST">
       <label>Your Faculty  </label>
       <select
          id="Faculty" onChange={this.handleFacultyChange}>
           {facultyOptions}
        </select>   
        <br/>
        <br/>

        <label>Your Major  </label>
        <select
          id="Major">
           {this.props.facultyOptions}
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
           {residenceOptions}
        </select>
        <br/>
        <br/>
        
        <input type="submit" name="submit" value="Create Module Plan"/>
      </form>
      </div>
      )}};