import React from 'react';
import { Card, Spinner } from 'react-bootstrap';

class Rules extends React.Component {
    constructor(props) {
        super(props);
        this.generateRules = this.generateRules.bind(this);
    }

    // const request = {
    //     method: 'POST',
    //     mode: 'no-cors',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-type': 'application/json'
    //       },
    //     body: JSON.stringify ({
    //       username: this.props.username,
    //       userCourse: { major: [{name: this.props.major,
    //                               spec: this.props.speialisation}],
    //                     minor: [],
    //                     residence: [this.props.residence]
    //                   }
    //       })
    //   };
      
    //   const response = await fetch('http://172.31.21.121:5000/', request)
    //       .then(async response => {
    //         const data = await response.json();
    //          // check for error response
    //          if (!response.ok) {
    //           // get error message from body or default to response status
    //           throw new Error(data.message)
    //         }
  
    //         return data;
    //       })
    //       .then(data => console.log(data))
  
    //     .catch(error => {
    //       alert('nooope');
    //       console.error('There was an error!', error);
    //   });

    generateRules() {

    }

    render() {
        return (
            <Card>
                <Card.Title>Degree Requirements</Card.Title>
                    <div>
                    <Spinner animation="border" variant="success" role="status" as="span">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                     University Level Requirement
                    </div>
            </Card>
        )
    }
}

export default Rules;
