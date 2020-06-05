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
                        isLoading: false,
                        rules: []
                        // // rules: {_id:"5ed0d9a9a9225a12882ec26d",
                        // //         name:"Degree Requirement",
                        // //         desc:"Complete at least 20MCs worth of General Education Modules, with at least 1 module in each of the GEH, GEQ, GER, GES and GET pillars",
                        // //         tag:"r_ulr",
                        // //         sub:[
                        // //                 {_id:"5ed0dd49a9225a12882ec26e",
                        // //                 name:"University Level Requirement",
                        // //                 desc:"Complete a GEH-coded module",
                        // //                 tag:"r_geh_pillar",
                        // //                 sub: [
                        // //                         {_id:"5ed0dd54a9225a12882ec26f",
                        // //                         name:"GEQ Pillar",
                        // //                         desc:"Complete a GEQ-coded module",
                        // //                         tag:"r_geq_pillar"},
                                                
                        // //                         {_id:"5ed0dd60a9225a12882ec270",
                        // //                         name:"GER Pillar",
                        // //                         desc:"Complete a GER-coded module",
                        // //                         tag:"r_ger_pillar"},
                                                
                        // //                         {_id:"5ed0dd6ca9225a12882ec271",
                        // //                         name:"GES Pillar",
                        // //                         desc:"Complete a GES-coded module",
                        // //                         tag:"r_ges_pillar"},
                                                
                        // //                         {_id:"5ed0dd76a9225a12882ec272",
                        // //                         name:"GET Pillar",
                        // //                         desc:"Complete a GET-coded module",
                        // //                         tag:"r_get_pillar"}
                        // //                     ]},
                                        
                        // //                 {_id:"5ed0dd54a9225a12882ec26f",
                        // //                 name:"GEQ Pillar",
                        // //                 desc:"Complete a GEQ-coded module",
                        // //                 tag:"r_geq_pillar"},
                                        
                        // //                 {_id:"5ed0dd60a9225a12882ec270",
                        // //                 name:"GER Pillar",
                        // //                 desc:"Complete a GER-coded module",
                        // //                 tag:"r_ger_pillar"},
                                        
                        // //                 {_id:"5ed0dd6ca9225a12882ec271",
                        // //                 name:"GES Pillar",
                        // //                 desc:"Complete a GES-coded module",
                        // //                 tag:"r_ges_pillar"},
                                        
                        // //                 {_id:"5ed0dd76a9225a12882ec272",
                        // //                 name:"GET Pillar",
                        // //                 desc:"Complete a GET-coded module",
                        // //                 tag:"r_get_pillar"}
                        // //             ]

                        //         },
        }
        this.updateSelectedModules = this.updateSelectedModules.bind(this);
        this.updateModuleLocation = this.updateModuleLocation.bind(this);

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
        let link = backend === 'NUSMods' ? 'https://api.nusmods.com/v2/2019-2020/moduleInfo.json' 
                        : 'http://172.31.21.121:3000/';
        const response = await fetch(link, {'accept': 'application/json'});
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
        
        for(let i = 0; i < newSelectedModules.length; i++) {
            if(newSelectedModules[i].moduleCode === object.moduleCode) {
                unique = false;
            }
        }

         if (!newSelectedModules.includes(object) && unique) {
            newSelectedModules.push(object);
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

                <Button onClick={() => {this.setState({callBackendNow: true})}}>Evaluate</Button>
                <br/>
                <br/>

                <Card>
                    <Rules
                        rules={this.state.rules}
                        callBackendNow={this.state.callBackendNow}
                        modulesSelected={this.state.modulesSelected}/>
                </Card>
                <br/>
                

           </DndProvider>
        )
    }
}

export default ModulePlannerPageTemp;
