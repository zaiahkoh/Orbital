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
import { callBackendAPI, setCallBackendNow, setCurrentSemester } from '../../actions/modplanActions';
import { updateSettings } from "../../actions/settingsActions";
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'


class ModulePlannerPageTemp extends React.Component {

    componentDidMount() {
        if(isEmpty(this.props.modplan.rules)) {
            this.props.callBackendAPI('Rules');
        }
        
        if(isEmpty(this.props.modplan.modules)){
            this.props.callBackendAPI('NUSMods');
        }

       
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
        if (isEmpty(modules)) {
            alert('Please add modules before evaluating');
        } else {
            this.props.setCallBackendNow(true);
        }
    }
    
    render () {
        const module = this.props.modplan.modules
        return (
            <DndProvider backend={Backend} >
                <div className="container-module-planner">
                    <YearDisplay
                            year="Year 1"
                            AY="2018/2019"
                            module={this.props.modplan.modules} />

                    <YearDisplay
                            year="Year 2"
                            AY="2019/2020"
                            module={this.props.modplan.modules}/> 

                    <YearDisplay
                            year="Year 3"
                            AY="2020/2021"
                            module={this.props.modplan.modules} />

                    <YearDisplay
                            year="Year 4"
                            AY="2022/2023"
                            module={this.props.modplan.modules} /> 
                    
                    <TrashBox
                            module={this.props.modplan.selectedModules}/>


                    <br/>

                    <Button className="button" id="eval-button" onClick={() => this.handleEvalButtonClick()}>Evaluate</Button>
                    <Button className="button" onClick={() => this.props.updateUserSettings("modplan", this.props.modplan.selectedModules)} >Save</Button>
                    <br/>
                    <br/>
                    <Card>
                        <Rules
                            rules={this.props.modplan.rules}/>
                    </Card>
                    <br/>
                </div>
           </DndProvider>
        )
    }
}

ModulePlannerPageTemp.propTypes = {
    callBackendAPI: PropTypes.func.isRequired,
    setCallBackendNow: PropTypes.func.isRequired,
    setCurrentSemester: PropTypes.func.isRequired,
    updateUserSettings: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    modplan: state.modplan
});

export default connect(mapStateToProps, { callBackendAPI, setCallBackendNow, setCurrentSemester, updateSettings }) (ModulePlannerPageTemp);
