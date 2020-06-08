 import React from 'react';
 import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router-dom';

 class Facebook extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
            picture: ''
        };
    }

    responseFacebook = response => {
        console.log(response);
        this.setState({isLoggedIn: true});
    };

    componentClicked = () => {

    };
 

     render() {
         let fbContent;

         if(this.state.isLoggedIn) {
            // fbContent = <Redirect to = {{ pathname: 'first-settings'}};
            fbContent = <h3>I am logged in</h3>
         } else {
             fbContent = (<FacebookLogin
                appId="258228452184257"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
         }
         return <div>{fbContent}</div>;
     }
 }
 
 export default Facebook;