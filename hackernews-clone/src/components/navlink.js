import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../actions';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandle = this.logoutHandle.bind(this);
  }

  logoutHandle() {
    this.props.signOut(); /* eslint-disable-line react/prop-types, react/destructuring-assignment */
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        { authenticated || localStorage.getItem('token') ? (
          <NavLink to="/logout" onClick={this.logoutHandle}>Log out</NavLink>
        ) : (
          <div>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        )}
      </div>
    );
  }
}

Navigation.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  { authenticated: state.auth.authenticated }
);

const mapDispatchToProps = dispatch => (
  { signOut: () => dispatch(signOut()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
