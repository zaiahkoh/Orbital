import React from "react";






export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.makeTable = this.makeTable.bind(this);
    }

    makeTable() {
       return this.props.module.map((module) => {
            const { code, name, link } = module
            return (
                <div>
                    <tr key={code}>
                        <td>{code}</td>
                        <td>
                            <a href={link} target="_blank">
                                {name}
                            </a>
                        </td>
                    </tr>
                </div>
            )
       })
    }
    
    
    render() {
        return (
            <div>
                <h3>Core Modules</h3>
                <table>
                    <tbody>{this.makeTable()}</tbody>
                </table>
            </div>
        )

    }
}
