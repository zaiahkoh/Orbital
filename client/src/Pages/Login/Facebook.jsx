 import React from 'react';
 import FacebookLogin from 'react-facebook-login'

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
            fbContent = <h1>I am logged in</h1>;
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