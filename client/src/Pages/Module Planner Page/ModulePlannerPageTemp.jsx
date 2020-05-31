import React from 'react';
import Board from './Board';
import './plannertemp.css';

class ModulePlannerPageTemp extends React.Component {
   
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
                
            </div>
        )
    }
}

export default ModulePlannerPageTemp;
