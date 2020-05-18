import React from "react";

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: this.props.cat,
            open: false,
            title: this.props.cat,
        }
        this.toggle = this.toggle.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.moduleCat === prevState.cat){          
          return {
                  title: nextProps.title};
        }
        else return null;
      }

    toggle() {
        this.setState({open: !this.state.open})
    }
    render(){
        return(
        <div>
        <button type="button" 
                class="btn btn-dark" 
                onClick={() => this.toggle()}
                >
                    <h5>{this.state.title}</h5>
        </button>
      
            {this.state.open && (
                <table className="table table-dark table-hover">
                    <tbody onClick={()=> this.setState({open:false})}>
                        {this.props.module}
                    </tbody>
                </table>)} 
        </div>
        )
    }
}