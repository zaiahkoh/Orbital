import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";

function Subrules(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRuleFulfilled, setIsRuleFulfilled] = useState();
    const [isBackendCalled, setIsBackendCalled] = useState(false);
    const modules = props.selectedModules ? props.selectedModules.map((object) => object.moduleCode) : null;
    const updateCallBackendNow = props.updateCallBackendNow;

    useEffect(() => {
        console.log('updated');
        const callBackendFunc = async (ruleTag) => {
            try{
                const link = "http://172.19.162.53:3000/eval/";
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',
                                'accept': 'application/json'            
                    },
                    body: JSON.stringify({ plan: {modules: modules},
                                           tag: props.ruleTag
                                        })
                };
                setIsLoading(true);
                
                
                const response = await fetch(link, requestOptions);
                const status = await response.json();

                if(!response.ok) {
                    throw new Error("An error has occurred")
                } else {
                    setIsRuleFulfilled(status);
                    setIsLoading(false);
                    setIsBackendCalled(true);
                    
                }

            } catch(error) {
                          setIsLoading(false);
                          console.error('There was an error!', error);
                        };
        };

        if(props.callBackendNow) {
                callBackendFunc(props.ruleTag);
                props.updateCallBackendNow();

        } 
        props.updateCallBackendNow();
        
    }, [props.callBackendNow]);

    return (    
        <div>
            <Card.Title 
                        style={{color: isBackendCalled ? (isRuleFulfilled ? 'green' : 'red') : 'black'}}>{props.ruleName}</Card.Title>
            {isLoading && <Spinner animation="border" variant="success" role="status" as="span">
                <span className="sr-only">Loading...</span>
            </Spinner>}
        </div>
    )

}

export default Subrules;