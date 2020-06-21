import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { ItemTypes } from './itemType';
import { useDrag } from 'react-dnd';

const ModuleCard = props => {
    const [{ isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.CARD,
            id: props.id,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })
   

    return (
        <Button
            ref={drag}
            id={props.id}
            className="button"
            style={{
                width: '165px',
                opacity: isDragging ? 0 : 1,
                cursor: 'grabbing'}}
        >
            <small>{props.title}</small>
                <br/>
            <small>{props.MCs + ' MCs'}</small>
        </Button>
    )
}

export default ModuleCard;