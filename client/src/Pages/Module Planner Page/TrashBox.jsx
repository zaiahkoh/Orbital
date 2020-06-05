import React from 'react';
import { Card } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemType';


function TrashBox (props) {

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.CARD,
        // drop: (item, monitor) => console.log(item),
        drop: (item, monitor) => props.updateModuleLocation(item, null),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return (
        <Card 
            ref={drop}
            style={{width: '300px',
                    height: '400px'}}>
            <Card.Title>Trash</Card.Title>
            <Card.Subtitle>Drop Modules here to delete</Card.Subtitle>
        </Card>
    )
}

export default TrashBox;