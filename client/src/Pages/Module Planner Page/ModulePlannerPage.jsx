import React from 'react';
import Board from './Board';
import Rules from './Rules';
import TrashBox from './TrashBox';
import YearDisplay from './YearDisplay';
import './plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


class ModulePlannerPageTemp extends React.Component {
   constructor(props) {
       super(props);
       this.state = {   selectedModules: null,
                        callBackendNow: false,
                        rules: []
        }
        this.updateSelectedModules = this.updateSelectedModules.bind(this);
        this.updateModuleLocation = this.updateModuleLocation.bind(this);
        this.updateCallBackendNow = this.updateCallBackendNow.bind(this);

    }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI('NUSMods')
            .then(res => this.setState({ module : res }))
            .catch(err => console.log(err));

        this.callBackendAPI('Rules')
            .then(res => this.setState({ rules : res }))
            .catch(err => console.log(err));

    }
    
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async (backend) => {
        let link = backend === 'NUSMods' ? 'https://api.nusmods.com/v2/2018-2019/moduleInfo.json' 
                        : 'http://172.31.21.121:3000/rules/r_cs_degree';
        const response = await fetch(link, {'accept': 'application/json',
                                             'content-type': 'application/json'});
        const body = await response.json();
    
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      console.log(body);
      return body;
    }

    updateSelectedModules(object) {
        let newSelectedModules = this.state.selectedModules ? this.state.selectedModules : [];
        let unique = true;
        let indexOfDuplicate;
        
        for(let i = 0; i < newSelectedModules.length; i++) {
            if(newSelectedModules[i].moduleCode === object.moduleCode) {
                unique = false;
                indexOfDuplicate = i;
            }
        }

         if (!newSelectedModules.includes(object) && unique) {
             if(unique) {
                newSelectedModules.push(object);
                
             } else {
                newSelectedModules.splice(indexOfDuplicate, 1);
                newSelectedModules.push(object);           
             }
             this.setState({selectedModules: newSelectedModules});
        }
         
         console.log(this.state.selectedModules);
     }
    
     updateModuleLocation(item, location) {
         let changedModule;
         if(!location) {
             changedModule = this.state.selectedModules.filter((object) => object.moduleCode !== item.id);
         } else {
            const moduleToChange = this.state.selectedModules.filter((object) => object.moduleCode === item.id);
            moduleToChange[0].location =  location;
            changedModule = this.state.selectedModules.filter((object) => object.moduleCode !== item.id).concat(moduleToChange[0])
         }
         this.setState({selectedModules: changedModule});
        console.log(changedModule);
    }
    
    updateCallBackendNow() {
        this.setState({callBackendNow: false});
    }

    handleEvalButtonClick() {
        const modules = this.state.selectedModules;
        if (!modules || modules === []) {
            alert('Please add modules before evaluating');
        } else {
            this.setState({callBackendNow: true})
        }
    }
    
    render () {
        return (
            <DndProvider backend={Backend}>

                <YearDisplay
                        year="Year 1"
                        updateSelectedModules={this.updateSelectedModules}
                        selectedModules={this.state.selectedModules}
                        updateModuleLocation={this.updateModuleLocation}
                        module={this.state.module} />

                <YearDisplay
                        year="Year 2"
                        updateSelectedModules={this.updateSelectedModules}
                        selectedModules={this.state.selectedModules}
                        updateModuleLocation={this.updateModuleLocation}
                        module={this.state.module} /> 

                <YearDisplay
                        year="Year 3"
                        updateSelectedModules={this.updateSelectedModules}
                        selectedModules={this.state.selectedModules}
                        updateModuleLocation={this.updateModuleLocation}
                        module={this.state.module} />

                <YearDisplay
                        year="Year 4"
                        updateSelectedModules={this.updateSelectedModules}
                        selectedModules={this.state.selectedModules}
                        updateModuleLocation={this.updateModuleLocation}
                        module={this.state.module} /> 
                
                <TrashBox
                        updateModuleLocation={this.updateModuleLocation}/>


                <br/>

                <Button onClick={() => this.handleEvalButtonClick()}>Evaluate</Button>
                <Button onClick={() => {}}>Save</Button>
                <br/>
                <br/>
                <Card>
                    <Rules
                        rules={this.state.rules}
                        callBackendNow={this.state.callBackendNow}
                        selectedModules={this.state.selectedModules}
                        updateCallBackendNow={this.updateCallBackendNow}/>
                </Card>
                <br/>
                

           </DndProvider>
        )
    }
}

export default ModulePlannerPageTemp;
