 import React from 'react';
 import FacebookLogin from 'react-facebook-login'
import { Redirect } from 'react-router-dom';

 class Facebook extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            userID: '',
            name: '',
            email: '',
            picture: ''
        };
    }

    responseFacebook = response => {
        console.log(response);
        //this.props.updateLoginStatus(true);
    };

    componentClicked = () => {

    };
 

     render() {
         let fbContent;

         if(this.props.isLoggedIn) {
            fbContent = <Redirect to= {{ 
                pathname: 'first-setting'}} />


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