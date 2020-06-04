import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import { Card, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';





function Board (props) {
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    const [moduleCodeTitle, setModuleCodeTitle] = useState([]);
    const [displayCard, setDisplayCard] = useState();
    const generateCards = () => moduleCodeTitle.map((object, i) => 
            (<ModuleCard
                id={object.moduleCode}
                location={props.year + ' ' + props.semester}
                className="card"
                title={`${object.moduleCode}: ${object.title}`}
                MCs={object.moduleCredit}/>));
    
    const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.CARD,
            drop: (item, monitor) => console.log(item),
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
    })

    function handleButtonClick() {
        setIsTextBoxOpen(!isTextBoxOpen);
     }

    function updateModuleCards(object) {
       object.location = props.year + ' ' + props.semester;
        let newModuleCodeTitle = moduleCodeTitle;
        if (!newModuleCodeTitle.includes(object)) {
            newModuleCodeTitle.push(object);
            setModuleCodeTitle(newModuleCodeTitle);
            setDisplayCard(generateCards);
        }

    }

        return (
            <div>
                <h3>{props.semester}</h3>
            <div   
                ref={drop}
                id={props.id}
                style={{width: '20rem'}}
            >

            <div style={{width: '165px', height: !displayCard && '59px', outline: displayCard ? 'none' : '1px dotted'}}>{displayCard ? displayCard : 'Drop module here'}</div>
            {isTextBoxOpen && <AutoCompleteText updateModuleCards={updateModuleCards}/>}
                <Button onClick={handleButtonClick}>Add Module</Button>
                
                </div>
            </div>
        )
   
}

export default Board;