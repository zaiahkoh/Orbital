import React, { useState } from "react";
import AutoCompleteText from './AutocompleteText';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import ModuleCard from './Card';

let newModuleCodeTitle = [];

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTextBoxOpen: false,
            moduleCodeTitle: []};
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.updateModuleCards = this.updateModuleCards.bind(this);
        this.generateModuleCards = this.generateModuleCards.bind(this);
    }
    
    
    drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';

        e.target.appendChild(card);
    }

    dragOver = e => {
        e.preventDefault();
    }

    handleButtonClick() {
        this.setState({isTextBoxOpen: !this.state.isTextBoxOpen});
     }

    updateModuleCards(item) {
        if (!newModuleCodeTitle.includes(item)) {
            newModuleCodeTitle.push(item);
            this.setState({moduleCodeTitle: newModuleCodeTitle});
        }
    }

    generateModuleCards() {
        console.log('called');
        return(
            this.state.moduleCodeTitle.map((item, i) => {
                return (
                    <ModuleCard
                        id={"card_" + i}
                        className="card"
                        draggable="true"
                        title={item}>
                    </ModuleCard>
                )
            })
            
        )
        
    }

    render() {
        return (
            <div   
                id={this.props.id}
                onDrop={this.drop}
                onDragOver={this.dragOver}
            >
                <h3>{this.props.year}</h3>
                {this.generateModuleCards()}
                {this.state.isTextBoxOpen && <AutoCompleteText updateModuleCards={this.updateModuleCards}/>}
                
                <Button onClick={this.handleButtonClick}>Add Module</Button>
            </div>
        )
    }
    
}

export default Board;