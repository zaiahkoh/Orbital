import React from "react";
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./planner.scss";
import Board from './Board';
import ModuleCard from './Card';


export class ModulePlannerPage extends React.Component {
  constructor(props) {
      super(props)
      this.generateCards = this.generateCards.bind.this;
  }

  

  generateCards(){
      
  }


  render(){
    return(
      <div>
      <h1 className="display-3">Module Planner</h1>
      
      <div class="horizontal-scroll-wrapper squares">

        <Card className='card-content'>
          <Card.Body>
            <Card.Title>Year 1</Card.Title>
            <Card.Subtitle>2019/2020</Card.Subtitle>
            

            <div className="row">
              <div className="col-6">
                <Card>
                  <Card.Title><strong>CS1101S: </strong> Programming Methodology </Card.Title>
                  <Card.Subtitle>4 MCs</Card.Subtitle>
                  <Button>Add Module</Button>
                </Card>
              </div>

              <div className="col-6">
                <Card>
                  <Card.Title><strong>CS1101S: </strong> Programming Methodology </Card.Title>
                  <Card.Subtitle>4 MCs</Card.Subtitle>
                  <Button>Add Module</Button>
                </Card>
              </div>




            </div>
            
            <Card>

            </Card>




          </Card.Body>
        </Card>


        <Card className='card-content'>
          <Card.Body>
            <Card.Title>Year 1</Card.Title>
            <Card.Subtitle>2019/2020</Card.Subtitle>
            

            <div className="row">
              <div className="col-6">
                <Card>
                  <Card.Title><strong>CS1101S: </strong> Programming Methodology </Card.Title>
                  <Card.Subtitle>4 MCs</Card.Subtitle>
                  
                </Card>
              </div>

              <div className="col-6">
                <Card>
                  <Card.Title><strong>CS1101S: </strong> Programming Methodology </Card.Title>
                  <Card.Subtitle>4 MCs</Card.Subtitle>
                </Card>
              </div>
            </div>
            
            <div className="row">
              <div className="col-6">
              <Button>Add Module</Button>
              </div>
              <div className="col-6">
              <Button>Add Module</Button>
              </div>
            </div>
            <Card>

            </Card>




          </Card.Body>
        </Card>

        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
        <Card className='card-content'>item 1</Card>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <Card style={{width: '16rem'}}>
          <Card.Body>
            <Card.Title>Degree Requirements</Card.Title>
          </Card.Body>
        </Card>
      </div>        

    )
  }
}