import React from 'react';
import "./AutocompleteText.css";

class AutoCompleteText extends React.Component {
    constructor (props) {
        super(props);
        this.state = { module: null,
                       suggestions: [],
                       text: '',

                     };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.renderSuggestions = this.renderSuggestions.bind(this);
        this.suggestionsSelected = this.suggestionsSelected.bind(this);
        this.callBackendAPI = this.callBackendAPI.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ module: res }))
        .catch(err => console.log(err));
      

    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('https://api.nusmods.com/v2/2019-2020/moduleInfo.json', {'accept': 'application/json'});
      const body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      console.log(body);
      return body;
    };


    handleTextChange (e) {
        const value = e.target.value;
        let suggestions = [];
        const { module } = this.state;
        
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');

            for(let i = 0; i < module.length; i++) {
                const moduleCode = module[i].moduleCode
                if(regex.test(moduleCode)) {
                    suggestions.push(module[i]);
                }
            }

        }
        this.setState(() => ({ suggestions, text: value }));
    }

    handleListClick(object) {
        object.location = this.props.location;
        this.props.updateSelectedModules(object);
        this.setState(() => ({suggestions: []})) 
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((object) => <li onClick={() => this.handleListClick(object)}>{`${object.moduleCode}: ${object.title}`}</li>)}
            </ul>
        );

    }

    suggestionsSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    render () {
        const { text } = this.state;
        return (
            <div>
                <div className="AutoCompleteText">
                <input 
                       value={text}
                       onChange={this.handleTextChange}
                       type="text"
                       placeholder="Enter module code" />
                {this.renderSuggestions()}
                
                </div>

                <h1>{this.state.moduleCode}</h1>    
                </div>
        )
    }
}

export default AutoCompleteText;