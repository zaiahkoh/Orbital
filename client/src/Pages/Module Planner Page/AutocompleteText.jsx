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
                    suggestions.push(`${moduleCode}: ${module[i].title}`);
                }
            }

        }
        this.setState(() => ({ suggestions, text: value }));
    }

    handleListClick(item) {
        this.props.updateModuleCards(item);
        this.setState(() => ({suggestions: []})) 
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.handleListClick(item)}>{item}</li>)}
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
                       type="text" />
                {this.renderSuggestions()}
                
                </div>

                <h1>{this.state.moduleCode}</h1>    
                </div>
        )
    }
}

export default AutoCompleteText;