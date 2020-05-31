import React from 'react';
import { Card } from 'react-bootstrap'

function ModuleCard (props) {

    const dragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('card_id', target.id);

        setTimeout(() => {
            target.style.display = "none"
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    return (
        <Card
            id={props.id}
            className={props.className}
            draggable={props.draggable}
            onDragStart={dragStart}
            onDragOver={dragOver}
            style={{width: '16rem'}}
        >
            <Card.Title>{props.title}</Card.Title>
        </Card>
    )
}

export default ModuleCard;