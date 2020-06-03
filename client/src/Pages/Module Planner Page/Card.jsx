import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { ItemTypes } from './itemType';
import { useDrag } from 'react-dnd';

function ModuleCard (props) {
    const [{ isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.CARD,
            
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
   

    return (
        <Button
            ref={drag}
            id={props.id}
            className={props.className}
            style={{
                width: '15rem',
                opacity: isDragging ? 0 : 1,
                cursor: 'grabbing'}}
        >
            <small>{props.title}</small>

            <small>4MCs</small>
        </Button>
    )
}

export default ModuleCard;