import React , { useState } from 'react';
import { Card } from 'react-bootstrap';
import Board from './Board';

function YearDisplay(props) {
    //const []

    return (
        <div>
        <h2>{props.year}</h2>
        <Card style={{width: '360px'}}>
            <Card.Body>
                <div className="row">
                    <div className="col">
                        <Board 
                                id="board-1"
                                className="board"
                                year="Year 1"
                                semester="Semester 1">
                            
                        </Board>
                    </div>

                    <div className="col">
                        <Board 
                                id="board-1"
                                className="board"
                                year="Year 2"
                                semester="Semester 2">
                            
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