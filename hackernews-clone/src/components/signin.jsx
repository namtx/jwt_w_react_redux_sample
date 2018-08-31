import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  handleSubmit({ email, password }) {
    this.props.signIn({ email, password });
  }

  renderError() {
    const { errorMessage } = this.props;
    if (!errorMessage) return false;
    return (
      <div>
        <string>
          Oops!&nbsp;
          { errorMessage }
        </string>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="login-form" onSubmit={handleSubmit(this.handleSubmit)}>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <Field id="email" type="email" component="input" name="email" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <Field id="password" type="password" component="input" name="password" />
        </fieldset>
        {this.renderError()}
        <button type="submit">Login</button>
      </form>
    );
  }
}

SignIn.propTypes = {
  errorMessage: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
};

const SignInForm = reduxForm({ form: 'login' })(connect(mapStateToProps, { signIn })(SignIn));
export default SignInForm;
