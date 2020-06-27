import React, { useEffect } from 'react';
import Board from './Board';
import Rules from './Rules';
import TrashBox from './TrashBox';
import YearDisplay from './YearDisplay';
import './plannertemp.css';
import { Button, Card } from 'react-bootstrap';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'react-redux';
import { callBackendAPI, setCallBackendNow, setSelectedModules } from '../../actions/modplanActions';
import { updateSettings } from "../../actions/settingsActions";
import { handleSaveClick } from "../../utils/commonFunctions";
import PropTypes from 'prop-types';
import isEmpty from 'is-empty'


const ModulePlannerPageTemp = (props) => {

    const module = props.modplan.modules;

    useEffect(() => {
        if(isEmpty(props.modplan.rules)) {
            props.callBackendAPI('Rules');
        }
        
        if(isEmpty(props.modplan.modules)){
            props.callBackendAPI('NUSMods');
        }
    }, [])

    useEffect(() => {
            if(!isEmpty(props.settings.userInfo.modPlan)) {
                props.setSelectedModules(null, props.settings.userInfo.modPlan)
            }
    }, [props.settings.userInfo])

    

    const handleEvalButtonClick = () => {
        const modules = props.modplan.selectedModules;
        if (isEmpty(modules)) {
            alert('Please add modules before evaluating');
        } else {
            this.props.setCallBackendNow(true);
        }
    }
    
    const handleSaveButton = () => {
        const userData = {
            modPlan: props.modplan.selectedModules,
            name: props.settings.userInfo.name,
            residential: props.settings.userInfo.residential,
            major: props.settings.userInfo.major,
            matriculationYear: props.settings.userInfo.matriculationYear,
            targetGradYear: props.settings.userInfo.targetGradYear,
            transcript: props.cap.transcript
        }
    
        props.updateSettings(userData);
    }

    return (
        <DndProvider backend={Backend} >
            <div className="container-module-planner">
                <YearDisplay
                        year="Year 1"
                        AY="2018/2019"
                        module={module} />

                <YearDisplay
                        year="Year 2"
                        AY="2019/2020"
                        module={module}/> 

                <YearDisplay
                        year="Year 3"
                        AY="2020/2021"
                        module={module} />

                <YearDisplay
                        year="Year 4"
                        AY="2022/2023"
                        module={module} /> 
                
                <TrashBox
                        module={props.modplan.selectedModules}/>


                <br/>

                <button className="button" id="eval-button" onClick={() => handleEvalButtonClick()}>Evaluate</button>
                <button className="button" onClick={() => handleSaveClick(props)} >Save</button>
                <br/>
                <br/>
                <Card>
                    <Rules
                        rules={props.modplan.rules}/>
                </Card>
                <br/>
            </div>
        </DndProvider>
    )
}

ModulePlannerPageTemp.propTypes = {
    callBackendAPI: PropTypes.func.isRequired,
    setCallBackendNow: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    modplan: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    cap: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    settings: state.settings,
    cap: state.cap,
    modplan: state.modplan
});

export default connect(mapStateToProps, 
                    { callBackendAPI, setCallBackendNow, updateSettings, setSelectedModules }) 
                    (ModulePlannerPageTemp);
