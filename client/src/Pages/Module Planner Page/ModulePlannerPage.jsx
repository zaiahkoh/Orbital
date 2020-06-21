import React from 'react';
import Board from './Board';
import Rules from './Rules';
import TrashBox from './TrashBox';
import YearDisplay from './YearDisplay';
import './plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'react-redux';
import { callBackendAPI, setCallBackendNow } from '../../actions/modplanActions';
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'


class ModulePlannerPageTemp extends React.Component {
   constructor(props) {
       super(props);
       this.state = {   selectedModules: null,
                        callBackendNow: false,
                        rules: []
        }
        // this.updateSelectedModules = this.updateSelectedModules.bind(this);
        // this.updateModuleLocation = this.updateModuleLocation.bind(this);
        // this.updateCallBackendNow = this.updateCallBackendNow.bind(this);

    }

    componentDidMount() {
        this.props.callBackendAPI('Rules');
        this.props.callBackendAPI('NUSMods');
    }
    
    // updateSelectedModules(object) {
    //     let newSelectedModules = this.state.selectedModules ? this.state.selectedModules : [];
    //     let unique = true;
    //     let indexOfDuplicate;
        
    //     for(let i = 0; i < newSelectedModules.length; i++) {
    //         if(newSelectedModules[i].moduleCode === object.moduleCode) {
    //             unique = false;
    //             indexOfDuplicate = i;
    //         }
    //     }

    //      if (!newSelectedModules.includes(object) && unique) {
    //          if(unique) {
    //             newSelectedModules.push(object);
                
    //          } else {
    //             newSelectedModules.splice(indexOfDuplicate, 1);
    //             newSelectedModules.push(object);           
    //          }
    //          this.setState({selectedModules: newSelectedModules});
    //     }
         
    //      console.log(this.state.selectedModules);
    //  }
    
    //  updateModuleLocation(item, location) {
    //      let changedModule;
    //      if(!location) {
    //          changedModule = this.state.selectedModules.filter((object) => object.moduleCode !== item.id);
    //      } else {
    //         const moduleToChange = this.state.selectedModules.filter((object) => object.moduleCode === item.id);
    //         moduleToChange[0].location =  location;
    //         changedModule = this.state.selectedModules.filter((object) => object.moduleCode !== item.id).concat(moduleToChange[0])
    //      }
    //      this.setState({selectedModules: changedModule});
    //     console.log(changedModule);
    // }
    
    // updateCallBackendNow() {
    //     // this.setState({callBackendNow: false});
    //     this.props.setCallBackendNow(false);
    // }

    handleEvalButtonClick() {
        const modules = this.props.modplan.selectedModules;
        console.log(modules);
        if (isEmpty(modules)) {
            alert('Please add modules before evaluating');
        } else {
            this.props.setCallBackendNow(true);
        }
    }
    
    render () {
        return (
            <DndProvider backend={Backend} >
                <div className="container-module-planner">
                    <YearDisplay
                            year="Year 1"
                            module={this.state.module} />

                    <YearDisplay
                            year="Year 2"
                            module={this.state.module} /> 

                    <YearDisplay
                            year="Year 3"
                            module={this.state.module} />

                    <YearDisplay
                            year="Year 4"
                            module={this.state.module} /> 
                    
                    <TrashBox/>


                    <br/>

                    <Button className="button" id="eval-button" onClick={() => this.handleEvalButtonClick()}>Evaluate</Button>
                    <Button className="button" onClick={() => {}}>Save</Button>
                    <br/>
                    <br/>
                    <Card>
                        <Rules
                            rules={this.state.rules}
                            callBackendNow={this.state.callBackendNow}
                            selectedModules={this.state.selectedModules}
                            updateCallBackendNow={this.updateCallBackendNow}/>
                    </Card>
                    <br/>
                </div>
           </DndProvider>
        )
    }
}

ModulePlannerPageTemp.propTypes = {
    callBackendAPI: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    modplan: state.modplan
});

export default connect(mapStateToProps, { callBackendAPI, setCallBackendNow }) (ModulePlannerPageTemp);
