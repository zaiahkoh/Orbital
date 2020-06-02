import React from 'react';
import Board from './Board';
import Rules from './Rules';
import './plannertemp.css';
import { Button } from 'react-bootstrap';


class ModulePlannerPageTemp extends React.Component {
   constructor(props) {
       super(props);

   }
    
    render () {
        return (
            <div className="container">
                <Board 
                        id="board-1"
                        className="board"
                        year="Year 1"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 2"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 3"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>

                <Board 
                        id="board-1"
                        className="board"
                        year="Year 4"
                        generateModuleCards={this.generateModuleCards}>
                    
                </Board>
                <br/>
                <Button>Evaluate</Button>
                <br/>
                <Rules/>
                
                
            </div>
        )
    }
}

export default ModulePlannerPageTemp;
