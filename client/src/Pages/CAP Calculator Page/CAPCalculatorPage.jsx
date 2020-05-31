import React from "react";

export class CAPCalculatorPage extends React.Component {
    render() {
        return(
            <div className="ml-4">
            <h1 className="display-3">CAP Calculator</h1>
            <h3>CAP at the beginning of the semester</h3>
            <label>Semester: </label>
            <select id="time">
                <option>Year 1 Semester 1</option>
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
            <label>CAP: </label>
            <input type="text" name="prevCAP" />
            <label>Credits Earned: </label>
            <input type="text" name="prevCreditsEarned" />
            <br/>
            <br/>
            <h3>Courses taken this semester</h3>
            <label>Module</label>
            <label>Grade</label>
            <br/>
            <input type="text" placeholder="Credits"/>
            <input type="text" placeholder="MCs" />
            </div>
        )
    }
}