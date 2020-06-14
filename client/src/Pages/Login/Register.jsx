import React from "react";
import loginImg from "../../login.svg";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";


export class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault()
    
  const newUser = { 
    username: this.state.username,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
  };

  this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <form noValidate onSubmit={this.onSubmit}>
          <div className="form">

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <span className="red-text">{errors.name}</span>
              <input 
                type="text" 
                id="username" 
                placeholder="username"
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                className={classnames("", {
                  invalid: errors.username
                })} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <span className="red-text">{errors.email}</span>
              <input 
                type="email" 
                id="email" 
                placeholder="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                className={classnames("", {
                  invalid: errors.email
                })} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <span className="red-text">{errors.password}</span>
              <input 
                type="password" 
                id="password" 
                placeholder="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                className={classnames("", {
                  invalid: errors.password
                })} />
            </div>

            <div className="form-group">
              <label htmlFor="password2">Confirm Password</label>
              <span className="red-text">{errors.password2}</span>
              <input 
                type="password" 
                id="password2" 
                placeholder="password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                className={classnames("", {
                  invalid: errors.password2
                })} />
            </div>
            </div>

        <div className="footer">
          <button className="btn" type="submit">
            Register
          </button>
        </div>

          </form>

        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  { registerUser }
)(Register));