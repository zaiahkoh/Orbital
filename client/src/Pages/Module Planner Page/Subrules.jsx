import React from "react";
import { Card, Spinner } from "react-bootstrap";

class Subrules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  isLoading: false,
                        
                     }

    }

    async callBackendFunc(ruleTag) {
        const link = "http://localhost:5000/rules/" + ruleTag;
        const requestOptions = {
            method: 'GET',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json',
                        'accept': 'application/json'            
            },
            body: JSON.stringify({modules: this.props.modulesSelected})
        };
        this.setState({isLoading: true});

        await fetch('http://172.31.21.121:3000/rules/r_cs_degree', requestOptions)
            .then(async response => {
                const status = await response.json();

                if(!response.ok) {
                    throw new Error("An error has occurred")
                }

                return status;
            })
            .then (status => {
                this.setState({status: status,
                                isLoading: false});
                alert('success');
            })
            .catch(error => {
                      this.setState({ errorMessage: error.toString(),
                                      isLoading: false
                        });
                      console.error('There was an error!', error);
                  });

    }

    render() {
        return (    <div>
                        <Card.Title>{this.props.ruleName}</Card.Title>
                        {this.state.isLoading && <Spinner animation="border" variant="success" role="status" as="span">
                            <span className="sr-only">Loading...</span>
                        </Spinner>}
                        {this.props.callBackendNow && this.callBackendFunc(this.props.ruleTag)}
                    </div>
                )
        
    }
}

export default Subrules;