import React, { useState, useEffect } from "react";
import AutoCompleteText from './AutocompleteText';
import { Card, Button } from 'react-bootstrap';
import ModuleCard from './Card';
import { ItemTypes } from './itemType';
import { useDrop } from 'react-dnd';


function Board (props) {
    const [isBoardFilled, setIsBoardFilled] = useState(false);
    const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
    
    // const [selectedModules, setSelectedModules] = useState();
    const [display, setDisplay] = useState();
    const selectedModules = props.selectedModules;
    
    useEffect(() => { 
            updateIsBoardFilled();
            if(selectedModules) {
                // generateCards();
            }
           
    }, [props.selectedModules])
        
    const generateCards = () => selectedModules
        .filter((object, i) => object.location === props.id)
        .map((object, i) => 
                (<ModuleCard
                    id={object.moduleCode}
                    location={props.id}
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

    function updateIsBoardFilled() {
        if(selectedModules && selectedModules.filter((object, i) => object.location === props.id).length > 0) {
            setIsBoardFilled(true);
            // console.log('isboard updated to true')
            // console.log('inside' + isBoardFilled)
            
        } else {
            setIsBoardFilled(false);
            // console.log('isboard updated to false')
        }
        // console.log('out ' + isBoardFilled)
    }
 

        
        return (
            
            <div>
                <h3>{props.semester}</h3>
            <div   
                ref={drop}
                id={props.id}
                style={{width: '20rem'}}
            >

            <div className="" style={{width: '165px', 
                        height: (!isBoardFilled) && '59px', 
                        outline: isBoardFilled ? 'none' : '1px dotted'}}>
                            {isBoardFilled ? generateCards() : 'Drop module here'}
            </div>
            {isTextBoxOpen && <AutoCompleteText 
                                            location={props.id}
                                            updateSelectedModules={props.updateSelectedModules}
                                            module={props.module}/>}
                <Button className="button" onClick={handleButtonClick}>Add Module</Button>
                
                </div>
            </div>
        )
   
}

export default Board;

