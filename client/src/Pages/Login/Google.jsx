import React from 'react';
import { GoogleLogout, GoogleLogin } from 'react-google-login'
import { Redirect } from 'react-router-dom';


class Google extends React.Component {
   constructor(props) {
       super(props);
   
       this.state = {
           userID: '',
           name: '',
           email: '',
           picture: '',
       };
   }

   responseGoogle = response => {
       console.log(response);
       //this.props.updateLoginStatus(true);
   };

   errorGoogle = response => { 
        console.error(response)
        }

    render() {
        let googleContent;
        const {from} = this.props.location || { from: { pathname: '/'}}

        if(this.props.isLoggedIn) {
           googleContent = <Redirect to={from} />
        } else {
            googleContent = ( <GoogleLogin
                clientId="927830728167-j7pr2smu9kh840umahsm0smg4j8qcu8a.apps.googleusercontent.com"
                buttonText="Login with Gmail"
                onSuccess={this.responseGoogle}
                onFailure={this.errorGoogle}
                cookiePolicy={'single_host_origin'}
              />);
        }
        return <div>{googleContent}</div>;
    }
}

export default Google;