import React from "react"
import { withRouter } from "react-router-dom";
import loginImg from "../../login.svg"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


export class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        errors: {}
      };
    }
    
    componentDidMount() {
      // // If logged in and user navigates to Login page, should redirect them to dashboard
      // if (this.props.auth.isAuthenticated) {
        
      //   this.props.history.push("/dashboard");
      // }
      console.log(this.props.auth)

    }
    
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); // push user to dashboard when they login
      }
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
      e.preventDefault();

  const userData = {
        email: this.state.email,
        password: this.state.password
      };

  this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
  
    render() {
      const { errors } = this.state;

      return (
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Login</div>

          <form noValidate onSubmit={this.onSubmit}>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>

           
              <div className="form">

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}</span>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    className={classnames("", {
                      invalid: errors.email
                    || errors.emailnotfound
                    })}
                     />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                  <input 
                    type="password" 
                    id="password" 
                    placeholder="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    className={classnames("", {
                      invalid: errors.password || errors.passwordincorrect
                    })}
                     />
                  </div>
                </div>
                
          </div>



            <div className="footer">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>

        </div>
      );
    }
  }

  Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(connect(
  mapStateToProps,
  { loginUser }
)(Login));