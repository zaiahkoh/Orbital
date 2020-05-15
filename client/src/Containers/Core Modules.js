import React from "react";

export class Table extends React.Component {
    
    render() {
        return (
            <div>
                <h3>Core Modules</h3>
                <table>
                    <tbody>{this.props.module}</tbody>
                </table>

                <h3>Specialisation Modules</h3>
                <table>
                    <tbody>{this.props.specialisation}</tbody>
                </table>

                <h3>Unrestricted Electives</h3>
                <table>
                    <tbody>{this.props.module}</tbody>
                </table>

                <h3>Total Modular Credits</h3>
            </div>
        )

    }
}
