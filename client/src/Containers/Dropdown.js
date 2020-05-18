import React from "react";

export class Dropdown extends React.Component {
    render(){
        return(
        <div>
        <button type="button" 
                class="btn btn-dark" 
                data-toggle="collapse" 
                data-target={'#' + this.props.id}>
                    <h5>{this.props.title}</h5>
        </button>
        <div id={this.props.id}
        class="collapse">
            <table className="table table-dark table-hover">
                    <tbody>
                        {this.props.module}
                    </tbody>
            </table>
        </div>
        </div>
        )
    }
}
