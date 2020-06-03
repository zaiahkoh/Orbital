import React from 'react';
import Board from './Board';
import Rules from './Rules';
import './plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


class ModulePlannerPageTemp extends React.Component {
   constructor(props) {
       super(props);
       this.state = {   
                        isLoading: false,
                        modulesSelected: ['MA1101R'],
                        rules: {_id:"5ed0d9a9a9225a12882ec26d",
                                name:"Degree Requirement",
                                desc:"Complete at least 20MCs worth of General Education Modules, with at least 1 module in each of the GEH, GEQ, GER, GES and GET pillars",
                                tag:"r_ulr",
                                sub:[
                                        {_id:"5ed0dd49a9225a12882ec26e",
                                        name:"University Level Requirement",
                                        desc:"Complete a GEH-coded module",
                                        tag:"r_geh_pillar",
                                        sub: [
                                                {_id:"5ed0dd54a9225a12882ec26f",
                                                name:"GEQ Pillar",
                                                desc:"Complete a GEQ-coded module",
                                                tag:"r_geq_pillar"},
                                                
                                                {_id:"5ed0dd60a9225a12882ec270",
                                                name:"GER Pillar",
                                                desc:"Complete a GER-coded module",
                                                tag:"r_ger_pillar"},
                                                
                                                {_id:"5ed0dd6ca9225a12882ec271",
                                                name:"GES Pillar",
                                                desc:"Complete a GES-coded module",
                                                tag:"r_ges_pillar"},
                                                
                                                {_id:"5ed0dd76a9225a12882ec272",
                                                name:"GET Pillar",
                                                desc:"Complete a GET-coded module",
                                                tag:"r_get_pillar"}
                                            ]},
                                        
                                        {_id:"5ed0dd54a9225a12882ec26f",
                                        name:"GEQ Pillar",
                                        desc:"Complete a GEQ-coded module",
                                        tag:"r_geq_pillar"},
                                        
                                        {_id:"5ed0dd60a9225a12882ec270",
                                        name:"GER Pillar",
                                        desc:"Complete a GER-coded module",
                                        tag:"r_ger_pillar"},
                                        
                                        {_id:"5ed0dd6ca9225a12882ec271",
                                        name:"GES Pillar",
                                        desc:"Complete a GES-coded module",
                                        tag:"r_ges_pillar"},
                                        
                                        {_id:"5ed0dd76a9225a12882ec272",
                                        name:"GET Pillar",
                                        desc:"Complete a GET-coded module",
                                        tag:"r_get_pillar"}
                                    ]

                                },
        }

    }

    // componentDidMount() {
    //     // Call our fetch function below once the component mounts
    //   this.callBackendAPI()
    //     .then(res => this.setState({ data: res.express }))
    //     .catch(err => console.log(err));
    // }
    //   // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //   const response = await fetch('http://localhost:5000/rules/r_cs_degree');
    //   const body = await response.json();
    
    //   if (response.status !== 200) {
    //     throw Error(body.message) 
    //   }
    //   return body;
    // };
    
    
    
    render () {
        return (
            <DndProvider backend={Backend}>
            <div className="container">
                <Board 
                        id="board-1"
                        className="board"
                        year="Year 1"
                        semester="Semester 1"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 2"
                        semester="Semester 1"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 3"
                        semester="Semester 1"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 4"
                        semester="Semester 1"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>
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
                
            </div>
           </DndProvider>
        )
    }
}

export default ModulePlannerPageTemp;
