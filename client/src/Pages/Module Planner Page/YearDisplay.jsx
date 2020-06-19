import React , { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Board from './Board';

function YearDisplay(props) {


    return (
        <div className="year-display">
        <h2>{props.year}</h2>
        <Card style={{width: '360px'}}>
            <Card.Body>
                <div className="row">
                    <div className="col">
                        <Board 
                                updateSelectedModules={props.updateSelectedModules}
                                selectedModules={props.selectedModules}
                                updateModuleLocation={props.updateModuleLocation}
                                id={props.year + " " + "Semester 1"}
                                className="board"
                                semester="Semester 1"
                                module={props.module}>
                            
                        </Board>
                    </div>

                    <div className="col">
                        <Board 
                                updateSelectedModules={props.updateSelectedModules}
                                selectedModules={props.selectedModules}
                                updateModuleLocation={props.updateModuleLocation}
                                id={props.year + " " + "Semester 2"}
                                className="board"
                                semester="Semester 2"
                                module={props.module}>
                            
                        </Board>
                    </div>
                </div>
                <h5>Total MCs</h5>
            </Card.Body>
        </Card>
        </div>
    )
}

export default YearDisplay;