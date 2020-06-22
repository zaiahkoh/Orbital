import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';


class CAPCalculatorPage extends React.Component {

    componentDidMount () {
        
    }

    render() {
        return(
            <div className="ml-4">
            <h1 className="display-3">CAP Calculator</h1>
            <h3>CAP at the beginning of the semester: {this.props.user.name} </h3>
            <h5 onClick={() => {this.setState({open: true})}}>Or click here to manually input CAP</h5>
            {/* {this.state.open && (<input type="text"/>)} */}
            <label>Semester: </label>
            <select id="time">
                <option id='year 1 semester 1'>Year 1 Semester 1</option>
                <option>Year 1 Semester 2</option>
                <option>Year 2 Semester 1</option>
                <option>Year 2 Semester 2</option>
                <option>Year 3 Semester 1</option>
                <option>Year 3 Semester 2</option>
                <option>Year 4 Semester 1</option>
                <option>Year 4 Semester 2</option>
                <option>Year 5 Semester 1</option>
                <option>Year 5 Semester 2</option>
                <option>Year 6 Semester 1</option>
                <option>Year 6 Semester 2</option>
            </select>
            <br/>
           
            <h3>Courses taken this semester</h3>
           
            </div>
        )
    }
}

CAPCalculatorPage.propType = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(CAPCalculatorPage);



 {/* <label>CAP: </label>
            <input type="text" name="prevCAP" />
            <label>Credits Earned: </label>
            <input type="text" name="prevCreditsEarned" />
            <br/>
            <br/> */}



 {/* <label>Module</label>
            <label>Grade</label>
            <br/>
            <input type="text" placeholder="Credits"/>
            <input type="text" placeholder="MCs" /> */}