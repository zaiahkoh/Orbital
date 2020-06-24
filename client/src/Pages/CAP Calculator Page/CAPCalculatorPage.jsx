import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setSemesterOptions } from '../../actions/capActions';
import { updateSettings, initialSettings } from "../../actions/settingsActions";
import { generateOptions } from "../../utils/optionGenerator";
import isEmpty from 'is-empty';


const CAPCalculatorPage = (props) => {

    useEffect(() => {
        return () => {
            if(isEmpty(props.settings.userInfo)) {
                props.initialSettings();
            }

            if(isEmpty(props.semesterOptions) && !isEmpty(props.settings.userInfo)){
                const start = props.settings.userInfo.matriculationYear.substr(0, 4);
                const end = props.settings.userInfo.targetGradYear.substr(5, 4);
                const diff = end - start;
                props.setSemesterOptions(diff);
            }
        };
    }, [props.settings.userInfo])
    


    return(
        <div className="ml-4">
        <h1 className="display-3">CAP Calculator</h1>
        <h3>CAP at the beginning of the semester: {props.user.name} </h3>
        {/* <h5 onClick={() => {this.setState({open: true})}}>Or click here to manually input CAP</h5> */}
        {/* {this.state.open && (<input type="text"/>)} */}
        <label>Semester: </label>
        <select id="time">
            {generateOptions(props.cap.semesterOptions)}
        </select>
        <br/>
        
        <h3>Courses taken this semester</h3>
        
        </div>
    );
}


CAPCalculatorPage.propType = {
    setSemesterOptions: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    initialSettings: PropTypes.func.isRequired,
    generateOptions: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    settings: state.settings,
    cap: state.cap
});

export default connect(mapStateToProps,
                        { setSemesterOptions, updateSettings, initialSettings })
                        (CAPCalculatorPage);



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