import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import { Card, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';





function Board (props) {
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    //const [moduleCodeTitle, setModuleCodeTitle] = useState([]);
    // const [displayCard, setDisplayCard] = useState();
    const generateCards = () => selectedModules
        .filter((object, i) => object.location === props.id)
        .map((object, i) => 
                (<ModuleCard
                    id={object.moduleCode}
                    location={props.id}
                    className="card"
                    title={`${object.moduleCode}: ${object.title}`}
                    MCs={object.moduleCredit}/>));

    const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.CARD,
            drop: (item, monitor) => props.updateModuleLocation(item, props.id),
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
    })

    function handleButtonClick() {
        setIsTextBoxOpen(!isTextBoxOpen);
     }

 

        const selectedModules = props.selectedModules;

        return (
            
            <div>
                <h3>{props.semester}</h3>
            <div   
                ref={drop}
                id={props.id}
                style={{width: '20rem'}}
            >

            <div style={{width: '165px', 
                        height: (!selectedModules) && '59px', 
                        outline: selectedModules ? 'none' : '1px dotted'}}>
                            {selectedModules ? generateCards() : 'Drop module here'}
            </div>
            {isTextBoxOpen && <AutoCompleteText 
                                            location={props.id}
                                            updateSelectedModules={props.updateSelectedModules}/>}
                <Button onClick={handleButtonClick}>Add Module</Button>
                
                </div>
            </div>
        )
   
}

export default Board;