import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Facebook from "./Facebook";
import Google from "./Google";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {}
        };
      }
  
    componentWillReceiveProps(nextProps) {

      if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        } 
        
      if(nextProps.auth.firstTimeRegistered) {
        if(!nextProps.auth.isAuthenticated) {
          const userData = {
            email: this.state.email,
            password: this.state.password
          };  
          this.props.loginUser(userData, true)
        } 
         else {
          this.props.history.push('/first-setting');
        }
      
      }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit = e => {
      e.preventDefault();

      const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
          };
  
      this.props.registerUser(newUser, false); 
    };

    render() {
        const { errors } = this.state;
        return (
            <form noValidate onSubmit={this.onSubmit}>
                <h1>Create Account</h1>
                <div className="social-container">
                  <Facebook source="register"/>
                  <Google source="register"/>
                  <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  placeholder="Name"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <span style={{color: "red"}}>{errors.name}</span>
                
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <span style={{color: "red"}}>{errors.email}</span>

                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <span style={{color: "red"}}>{errors.password}</span>

                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span style={{color: "red"}}>{errors.password2}</span>

                <button type="submit" >Sign Up</button>
            </form>
       );
    }
    
}

Register.propTypes = {
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(withRouter(Register));