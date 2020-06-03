import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';
//import generateCards from './generateCards'




function Board (props) {
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    const [moduleCodeTitle, setModuleCodeTitle] = useState([]);
    const [displayCard, setDisplayCard] = useState();
    const generateCards = () => moduleCodeTitle.map((item, i) => 
            (<ModuleCard
                id={"card_" + i}
                className="card"
                title={item}/>));
    
    const [{ isOver }, drop] = useDrop({
            accept: ItemTypes.CARD,
            drop: (item, monitor) => (item.id),
            collect: monitor => ({
                isOver: !!monitor.isOver(),
            }),
    })

    function handleButtonClick() {
        setIsTextBoxOpen(!isTextBoxOpen);
     }

    function updateModuleCards(item) {
        let newModuleCodeTitle = moduleCodeTitle;
        if (!newModuleCodeTitle.includes(item)) {
            newModuleCodeTitle.push(item);
            setModuleCodeTitle(newModuleCodeTitle);
            setDisplayCard(generateCards);
        }

    }

        return (
            <div   
                ref={drop}
                id={props.id}
            >
                <h3>{props.year + ' ' + props.semester}</h3>
                {generateCards()}
                {isTextBoxOpen && <AutoCompleteText updateModuleCards={updateModuleCards}/>}
                
                <Button onClick={handleButtonClick}>Add Module</Button>
            </div>
        )
   
}

export default Board;