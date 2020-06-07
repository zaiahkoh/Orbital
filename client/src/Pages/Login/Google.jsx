import React from 'react';
import GoogleLogin from 'react-google-login'

class Google extends React.Component {
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

   responseGoogle = response => {
       console.log(response);
       this.setState({isLoggedIn: true});
   };

   componentClicked = () => {

   };


    render() {
        let googleContent;

        if(this.state.isLoggedIn) {
           googleContent = <h1>I am logged in</h1>;
        } else {
            googleContent = ( <GoogleLogin
                clientId="927830728167-1r5k5c965jr1ldp9b6humbumouumj6gn.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />);
        }
        return <div>{googleContent}</div>;
    }
}

export default Google;