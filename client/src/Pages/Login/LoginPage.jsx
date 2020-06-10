import React from "react";
import "./style.scss";
import { Login } from "./Login";
import { Register } from "./Register";
import RightSide from "./RightSide";
import "../../App.scss";
import FacebookLogin from "./Facebook";
import Facebook from "./Facebook";
import Google from "./Google";

export class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {    
                        isLogginActive: true 
                     }
        this.changeLoginState = this.changeLoginState.bind(this);
    }

    changeLoginState() {
        const { isLogginActive } = this.state;
  
        if (isLogginActive) {
          this.rightSide.classList.remove("right");
          this.rightSide.classList.add("left");
        } else {
          this.rightSide.classList.remove("left");
          this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
      }

    render() {
      const { isLogginActive } = this.state;
      const current = isLogginActive ? "Register" : "Login";
      const currentActive = isLogginActive ? "login" : "register";
        return (
            <div className="base-container">
           
                <Google 
                  isLoggedIn={this.props.isLoggedIn}
                  updateLoginStatus={this.props.updateLoginStatus}
                  location={this.props.location} />
            <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              {isLogginActive && (
                <Login containerRef={ref => (this.current = ref)} />
               
              )}
              {!isLogginActive && (
                <Register containerRef={ref => (this.current = ref)} />
              )}
            </div>
                <RightSide
                    current={current}
                    currentActive={currentActive}
                    containerRef={ref => (this.rightSide = ref)}
                    onClick={this.changeLoginState.bind(this)}
                />
          </div>
              <Facebook 
                isLoggedIn={this.props.isLoggedIn}
                updateLoginStatus={this.props.updateLoginStatus}
                location={this.props.location}/>
          </div>
        )
    }
}

