import React, { useState } from 'react';
import ModuleCard from './Card';

function generateCards(props) {
    console.log('called');
    
    return(
            props.item.map((item, i) => (
        
                    <ModuleCard
                        id={"card_" + i}
                        className="card"
                        title={item}>
                    </ModuleCard>
                )
            ))
    
    )
    
}

export default generateCards;